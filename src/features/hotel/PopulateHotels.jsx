import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import renderTextField from "../../app/common/form/TextInput";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

const actions = {
};

const mapState = state => ({

});

const styles = theme => ({
    root: {
      flexGrow: 1
    },
    paper: {
      paddingTop: 30,
      paddingLeft: 20,
      paddingRight: 20,
      paddingBottom: 30,
      margin: 30
    }
  });

const PopulateHotels = ({classes}) => {
      return (
        <form size="large">

          <Grid 
            container
            className={classes.root}
            justify="center"
            spacing={16}>
            <Grid item xs="6">
                <h1>Populate Hotels</h1>
                <Paper className={classes.paper}>
                    <Field
                        name="city"
                        component={renderTextField}
                        label="city"
                    />
                    <Field
                        name="name"
                        component={renderTextField}
                        label="hotel name"
                    />
                    <Field
                        name="photoURL"
                        component={renderTextField}
                        label="photo url"
                    /> 
                    <Field
                        name="rating"
                        component={renderTextField}
                        label="rating"
                    />
                    <Field
                        name="price"
                        component={renderTextField}
                        label="room price"
                    />
                    <Field
                        name="state"
                        component={renderTextField}
                        label="state"
                    />
                    <Field
                        name="street"
                        component={renderTextField}
                        label="street"
                    />
                    <Field
                        name="type"
                        component={renderTextField}
                        label="type"
                    />
                    <Field
                        name="zip"
                        component={renderTextField}
                        label="zip"
                    />
                    <Typography>Bar</Typography>
                    <Select
                        value=""
                        onChange=""
                        displayEmpty
                        name=""
                        //className={classes.selectEmpty}
                      >
                        <MenuItem value={true}>true</MenuItem>
                        <MenuItem value={false}>false</MenuItem>
                    </Select>
                    <Typography>Gym</Typography>
                    <Select
                        value=""
                        onChange=""
                        displayEmpty
                        name=""
                        //className={classes.selectEmpty}
                      >
                        <MenuItem value={true}>true</MenuItem>
                        <MenuItem value={false}>false</MenuItem>
                    </Select>
                    <Typography>Swimming Pool</Typography>
                    <Select
                        value=""
                        onChange=""
                        displayEmpty
                        name=""
                        //className={classes.selectEmpty}
                      >
                        <MenuItem value={true}>true</MenuItem>
                        <MenuItem value={false}>false</MenuItem>
                    </Select>

                </Paper> 
            </Grid>      
          </Grid>


        </form>
      );

};
export default withStyles(styles)(
  withRouter(
    connect(
      mapState,
      actions
    )(reduxForm({ form: "populateHotels" })(PopulateHotels))
  )
)