import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import rewards from "./rewards.png";
import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  mainpaper: {
    width: "100%",
    padding: "15px",
    marginTop: "10px",
    marginRight: "10px"
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
  }
});

class Rewards extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} xs={12} md={12} lg={12}>
        <Paper className={classes.mainpaper}>
          <Grid container spacing={16}>
            <Grid
              container
              className={classes.label}
              xs={12}
              md={12}
              lg={12}
              style={{
                color: "#409BE6",
                display: "flex"
              }}
            >
              <Avatar alt="Billiards" src={rewards} />
              <div style={{
                paddingTop: "5px"
              }}>Rewards :{this.props.reward} </div>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(Rewards);
