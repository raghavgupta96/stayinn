import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  mainpaper: {
    width: "100%",
    marginLeft: "10px",
    marginRight: "10px"
  }
});

class filterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [0]
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} xs={12} md={12} lg={12}>
        <Paper className={classes.mainpaper}>
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
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(filterBox);
