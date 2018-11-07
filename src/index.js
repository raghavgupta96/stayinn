import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { configureStore } from './app/store/configureStore';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import ScrollToTop from './app/common/util/ScrollToTop'
import ReduxToastr from 'react-redux-toastr'


const store = configureStore();

const rootEl = document.getElementById('root');

// added browserRouter to the App
let render = () => {
    ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
        <ScrollToTop>
        <ReduxToastr
          sleep={7000}
          position="top-center"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
            <App/>
            </ScrollToTop>
        </BrowserRouter>
    </Provider>,
     rootEl)
}

if(module.hot){
     module.hot.accept('./App', () => {
         setTimeout(render)
     })
}

render();

registerServiceWorker();
