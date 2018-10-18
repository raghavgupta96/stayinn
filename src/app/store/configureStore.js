import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/rootReducer";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import { reduxFirestore, getFirestore } from "redux-firestore";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import firebase from '../config/firebase'

const rrfConfig = {
  userProfile: "users",
  attachAuthIsReady: true,
  usefirestoreForProfile: true
};

export const configureStore = preloadedState => {
  const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const storeEnhancers = [middlewareEnhancer];

  const composedEnhancer = composeWithDevTools(
    ...storeEnhancers,
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
  );

  const store = createStore(rootReducer, preloadedState, composedEnhancer);

  // webpage won't reload when the data is changed
  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("../reducers/rootReducer", () => {
        const newRootReducer = require("../reducers/rootReducer").default;
        store.replaceReducer(newRootReducer);
      });
    }
  }

  return store;
};
