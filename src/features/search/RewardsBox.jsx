import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  mainpaper: {
    width: "100%",
    marginRight: "10px",
    padding: "15px"
  },
  label: {
    fontFamily: "Times",
    fontSize: "18px"
  },
  typeHeading: {
    backgroundColor: "#409BE6",
    color: "#ffffff",
    fontFamily: "Times",
    fontSize: "25px",
    paddingLeft: "10px"
  }
});

class Rewards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: [0],
      amount: null,
      roomSize: "Hotel"
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} xs={12} md={12} lg={12}>
        <Paper className={classes.mainpaper}>
          <Grid container spacing={16}>
            <Grid
              item
              className={classes.label}
              xs={12}
              md={12}
              lg={12}
              style={{
                color: "#409BE6"
              }}
            >
              Rewards : 0 points
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Rewards);
