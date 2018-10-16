import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  mainpaper: {
    width: "100%",
    marginLeft: "10px",
    marginRight: "10px"
  },
  budgetRange1: {
    width: "90%",
    paddingLeft: "15px",
    paddingTop: "10px",
    paddingRight: "15px",
    flexWrap: "wrap",
    display: "flex"
  },
  budgetRange2: {
    width: "90%",
    marginTop: "10px",
    marginRight: "15px",
    flexWrap: "wrap",
    display: "flex"
  },
  hyphen: {
    marginTop: "20px",
    marginLeft: "20px"
  },
  droppedDownType: {
    width: "100%"
  },
  droppedDownContainer: {
    display: "flex",
    flexWrap: "wrap",
    marginLeft: "15px",
    marginRight: "15px",
    marginBottom: "15px"
  },
  typeContainer: {
    marginTop: "15px",
    marginLeft: "15px"
  },
  budgetContainer: {
    marginLeft: "15px"
  },
  typeTitle: {
    fontFamily: "Times",
    fontSize: "20px"
  }
});

class filterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [0],
      amount: null
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} xs={12} md={12} lg={12}>
        <Paper className={classes.mainpaper}>
          <Grid container>
            <Grid xs={12} md={12} lg={12} className={classes.typeContainer}>
              <Typography className={classes.typeTitle}>Room Type</Typography>
            </Grid>
            <Grid
              xs={12}
              md={12}
              lg={12}
              className={classes.droppedDownContainer}
            >
              <FormControl className={classes.droppedDownType}>
                <Select
                  value={this.state.roomSize}
                  displayEmpty
                  name="roomSize"
                  className={classes.selectEmpty}
                >
                  <MenuItem value="">#</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} md={12} lg={12} className={classes.budgetContainer}>
              <Typography className={classes.typeTitle}>Budget</Typography>
            </Grid>
            <Grid xs={4}>
              <FormControl className={classes.budgetRange1}>
                <Input
                  value={this.state.amount}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid xs={1} className={classes.hyphen}>
              <Typography>-</Typography>
            </Grid>
            <Grid xs={4}>
              <FormControl className={classes.budgetRange2}>
                <Input
                  value={this.state.amount}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid xs={12} md={12} lg={12}>
              <Checkbox />
              bar
            </Grid>
            <Grid xs={12} md={12} lg={12}>
              <Checkbox />
              gym
            </Grid>
            <Grid xs={12} md={12} lg={12}>
              <Checkbox />
              swimmingPool
            </Grid>
            <Grid xs={12} md={12} lg={12}>
              <Checkbox />
              Free twinkies
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(filterBox);
