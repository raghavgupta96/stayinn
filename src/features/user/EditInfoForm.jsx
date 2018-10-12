import React from "react";
import { Field , reduxForm} from 'redux-form';
import { connect } from 'react-redux';

//Material UI components
<<<<<<< HEAD
=======
import { isLoaded } from 'react-redux-firebase'
import CircularProgress from '@material-ui/core/CircularProgress';
>>>>>>> cbc72cbb378fcd7d1fcbb1a678f69a58550717c7
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper';
import FileInput from '../../app/common/form/FileInput'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { updateUser } from '../auth/authActions';


const actions = {
  updateUser
}

<<<<<<< HEAD
=======
const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
});


function CircularIndeterminate() {
  return (
    <div>
      <CircularProgress/>    
    </div>
  );
}

>>>>>>> cbc72cbb378fcd7d1fcbb1a678f69a58550717c7

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  input: {
    paddingRight: 20,
<<<<<<< HEAD
  }
=======
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
>>>>>>> cbc72cbb378fcd7d1fcbb1a678f69a58550717c7
})

//rendering the UI components
const renderTextField = ({
    input, label, meta: { touched, error }, ...custom
  }) => (
    <TextField
     
     label={label}
     floatingLabelText={label}
     errorText={touched && error}
     {...input}
     {...custom}
     margin="normal"
     fullWidth
     />
  )

  const renderButton = ({
    ...custom
  }) => (
    <Button 
    variant="contained" 
    justify="right" 
    color="primary" 
    type="submit"
    {...custom}
    />
  )

<<<<<<< HEAD
const EditInfoForm = ({classes, handleSubmit, updateUser, error, invalid, submitting}) => {
    return (
      <div>
      <form size="large" onSubmit={handleSubmit(updateUser)}>
            <div>
              <Grid container className={classes.root} justify="center" spacing={16}>
                <Grid item xs={2}></Grid>
                <Grid item xs={6}></Grid>
                  <Paper className={classes.paper}>
                  <Typography variant="display1" >Update Information</Typography>
                    <Grid container className={classes.root} spacing={8}>
                      <Grid item xs={6}>
                        <Field
                          name="displayName"
                          label="Name"
                          component={renderTextField}
                        />
                        <Button component={renderButton}>
                          Update 
                        </Button>
                        <Button component={renderButton}>
                          Cancel 
                        </Button>  
                      </Grid>
                      <Grid item xs={6}>
                        {/* <Field
                          name="email"
                          label="Email"
                          component={renderTextField}
                        /> */}
                        <Field
                          name="phoneNumber"
                          label="Phone Number"
                          component={renderTextField}
                        />
                        <Field
                          name="photoFile"
                          component={FileInput}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
                <Grid item xs={2}></Grid>
            </div>            
        </form>
      </div>
    );
  };
  
  export default withStyles(styles)(
    connect(null, actions)(
=======
const EditInfoForm = ({classes, handleSubmit, updateUser, error, invalid, submitting, auth}) => {
    
  // redner after auth is loaded 
  if(isLoaded(auth))
    {
      // if auth is not empty
      // when user logs in
      if(!auth.isEmpty)
      {
        return (
          <div>
          <form size="large" onSubmit={handleSubmit(updateUser)}>
                <div>
                  <Grid container className={classes.root} justify="center" spacing={16}>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={6}></Grid>
                      <Paper className={classes.paper}>
                      <Typography variant="display1" >Update Information</Typography>
                        <Grid container className={classes.root} spacing={8}>
                          <Grid item xs={6}>
                            <Field
                              name="displayName"
                              label="Name"
                              component={renderTextField}
                            />
                            <Button component={renderButton}>
                              Update 
                            </Button>
                            <Button  component={renderButton}>
                              Cancel 
                            </Button>  
                          </Grid>
                          <Grid item xs={6}>
                          {/* Don't know yet if we are updating email */}
                            {/* <Field
                              name="email"
                              label="Email"
                              component={renderTextField}
                            /> */}
                            <Field
                              name="phoneNumber"
                              label="Phone Number"
                              component={renderTextField}
                            />
                            <Field
                              name="photoFile"
                              component={FileInput}
                            />
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                    <Grid item xs={2}></Grid>
                </div>            
            </form>
          </div>
        );
      }
      else
      {
        // bring users to login page if they do not login
        return (window.location.replace("/login"))
      }
    }

    else
    {
      // show circular loading figure if info is not ready yet
      return (
        <CircularIndeterminate></CircularIndeterminate>
      )
    }  
  };
  
  export default withStyles(styles)(
    connect(mapState, actions)(
>>>>>>> cbc72cbb378fcd7d1fcbb1a678f69a58550717c7
      reduxForm({form: 'editInfoForm'})(
        EditInfoForm
      )
    )
  );
<<<<<<< HEAD
=======
  
>>>>>>> cbc72cbb378fcd7d1fcbb1a678f69a58550717c7
  