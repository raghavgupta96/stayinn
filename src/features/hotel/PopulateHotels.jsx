import React, { Component } from "react";
import { reduxForm } from "redux-form";
import firebase from "../../app/config/firebase";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography"
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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
    },
    pad: {
        padding: 25
    }
});



class PopulateHotels extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            city: "",
            description: "",
            name: "",
            photoURL: "",
            photoURL2: "",
            rating: 0,
            price: 0,
            state: "",
            street: "",
            type: "",
            zip: "",
            bar: false,
            gym: false,
            swimmingPool: false
        };
        this.state = this.state
    }

    handleChange(e) {
        console.log(e.target.value);
        console.log(e.target.id)
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleIntChange(e) {
        this.setState({
            [e.target.id]: Number(e.target.value)
        })
    }

    handleGymChange(e) {
        this.setState({ gym: e.target.value });
    }

    handleBarChange(e) {
        console.log(e.target.value)
        this.setState({ bar: e.target.value });
    }

    handleSwimmingPoolChange(e) {
        this.setState({ swimmingPool: e.target.value });
    }

    populate = () => {
        const db = firebase.firestore();
        db.collection("testingHotels").add({
            city: this.state.city,
            description: this.state.description,
            name: this.state.name,
            photoURL: this.state.photoURL,
            photoURL2: this.state.photoURL2,
            rating: this.state.rating,
            price: this.state.price,
            state: this.state.state,
            street: this.state.street,
            type: this.state.type,
            zip: this.state.zip,
            bar: this.state.bar,
            gym: this.state.gym,
            swimmingPool: this.state.swimmingPool
        }).then(() => {
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        })
    
    }

    render() {
        const { classes } = this.props;
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
                        <div className={classes.pad}>  
                            <TextField
                                id="city"
                                label="city"
                                fullWidth
                                onChange={this.handleChange.bind(this)}
                            />
                        </div>
                        <div className={classes.pad}>
                            <TextField
                                id="description"
                                label="description of hotel"
                                multiline={true}
                                rowsMax={4}
                                fullWidth
                                onChange={this.handleChange.bind(this)}
                            />
                        </div>
                        <div className={classes.pad}>
                            <TextField
                                id="name"
                                label="hotel name"
                                fullWidth
                                onChange={this.handleChange.bind(this)}
                            />
                        </div>
                        <div className={classes.pad}>
                            <TextField
                                id="photoURL"
                                label="photoURL"
                                fullWidth
                                onChange={this.handleChange.bind(this)}
                            /> 
                        </div>
                        <div className={classes.pad}>
                            <TextField
                                id="photoURL2"
                                label="photoURL2"
                                fullWidth
                                onChange={this.handleChange.bind(this)}
                            />
                        </div>
                        <div className={classes.pad}>
                            <TextField
                                id="rating"
                                label="rating (out of 5)"
                                fullWidth
                                onChange={this.handleIntChange.bind(this)}
                            />
                        </div>
                        <div className={classes.pad}>
                            <TextField
                                id="price"
                                label="room price"
                                fullWidth
                                onChange={this.handleIntChange.bind(this)}
                            />
                        </div>
                        <div className={classes.pad}>
                            <TextField
                                id="state"
                                label="state (spell out and capitalize first letter)"
                                fullWidth
                                onChange={this.handleChange.bind(this)}
                            />
                        </div>
                        <div className={classes.pad}>
                            <TextField
                                id="street"    
                                label="street"
                                fullWidth
                                onChange={this.handleChange.bind(this)}
                            />
                        </div>
                        <div className={classes.pad}>
                            <TextField
                                id="type"
                                label="type (only motel or hotel....lowercase)"
                                fullWidth
                                onChange={this.handleChange.bind(this)}
                            />
                        </div>
                        <div className={classes.pad}>
                            <TextField
                                id="zip"                           
                                label="zip"
                                fullWidth
                                onChange={this.handleChange.bind(this)}
                            />
                        </div>
                        <div className={classes.pad}>
                            <Typography>Bar</Typography>
                            <Select
                                value={this.state.bar}
                                displayEmpty
                                onChange={this.handleBarChange.bind(this)}
                            >
                                <MenuItem value={true}>true</MenuItem>
                                <MenuItem value={false}>false</MenuItem>
                            </Select>
                        </div>
                        <div className={classes.pad}>
                            <Typography>Gym</Typography>
                            <Select
                                value={this.state.gym}
                                displayEmpty
                                onChange={this.handleGymChange.bind(this)}
                            >
                                <MenuItem value={true}>true</MenuItem>
                                <MenuItem value={false}>false</MenuItem>
                            </Select>                          
                        </div>                     
                        <div className={classes.pad}>
                            <Typography>Swimming Pool</Typography>
                            <Select
                                value={this.state.swimmingPool}
                                displayEmpty
                                onChange={this.handleSwimmingPoolChange.bind(this)}
                            >
                                <MenuItem value={true}>true</MenuItem>
                                <MenuItem value={false}>false</MenuItem>
                            </Select>                       
                        </div>
                        <div className={classes.pad}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                onClick={this.populate}
                                className={classes.button}
                            >
                                Confirm
                            </Button>
                        </div>
                    </Paper> 
                </Grid>      
              </Grid> 
            </form>
          );
    }
};
export default withStyles(styles)(
  withRouter(
    connect(
      mapState
    )(reduxForm({ form: "populateHotels" })(PopulateHotels))
  )
)