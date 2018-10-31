import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Avatar from "@material-ui/core/Avatar";
import barIcon from "./bar.png";
import billiardsIcon from "./billiards.png";
import swimmingPool from "./swimmingPool.png";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  mainpaper: {
    width: "100%",
    marginRight: "10px",
    backgroundColor: "#E6F6FF"
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
  typeTitle: {
    fontFamily: "Times",
    fontSize: "20px",
    marginTop: "10px",
    marginLeft: "10px"
  },
  typeHeading: {
    backgroundColor: "#409BE6",
    color: "#ffffff",
    fontFamily: "Times",
    fontSize: "25px",
    paddingLeft: "10px"
  },
  checkboxTitle: {
    paddingTop: "12px"
  }
});

class filterBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: null,
      minPrice: 0,
      maxPrice: 100000,
      hotelType: "nonspecific",
      sortOrder: "nonspecific",
      gymChecked: "",
      barChecked: "",
      swimmingPoolChecked: "",
    };
  }

  _handleGymCheckedChange(ev) {
    this.setState({gymChecked: ev.target.checked});
    this.props.setGymChecked(ev.target.checked);
  }

  _handleBarCheckedChange = ev => {
    this.setState({barChecked: ev.target.checked});
    this.props.setBarChecked(ev.target.checked);
  }

  _handleSwimmingPoolCheckedChange = ev => {
    this.setState({swimmingPoolChecked: ev.target.checked});
    this.props.setSwimmingPoolChecked(ev.target.checked);
  }

  _handleHotelTypeChange = ev =>  {
    this.setState({ hotelType: ev.target.value });
    this.props.setHotelType(ev.target.value);
  }

  _handleSortOrder = ev => {
    this.setState({ sortOrder: ev.target.value });
    this.props.setSortOrder(ev.target.value);
  }

  _handleMinChange = e => {
    this.setState({ minPrice: e.target.value });
    this.props.setMinPrice(e.target.value);
  }
  _handleMaxChange = e => {
    this.setState({ maxPrice: e.target.value });
    this.props.setMaxPrice(e.target.value);
  }


  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.root} xs={12} md={12} lg={12}>
        <Paper className={classes.mainpaper}>
          <Grid container>
            <Grid xs={12} md={12} lg={12}>
              <Typography className={classes.typeTitle} xs={12} md={12} lg={12}>
                Hotel Type
              </Typography>
            </Grid>
            <Grid
              xs={12}
              md={12}
              lg={12}
              className={classes.droppedDownContainer}
            >
              <FormControl className={classes.droppedDownType}>
                <Select
                  value={this.state.hotelType}
                  displayEmpty
                  name="hotelType"
                  onChange={this._handleHotelTypeChange}
                  className={classes.selectEmpty}
                >
                  <MenuItem value={"nonspecific"}>Nonspecific</MenuItem>
                  <MenuItem value={"hotel"}>Hotel</MenuItem>
                  <MenuItem value={"motel"}>Motel</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} md={12} lg={12}>
              <Typography className={classes.typeTitle} xs={12} md={12} lg={12}>
                Sort
              </Typography>
            </Grid>
            <Grid
              xs={12}
              md={12}
              lg={12}
              className={classes.droppedDownContainer}
            >
              <FormControl className={classes.droppedDownType}>
                <Select
                  value={this.state.sortOrder}
                  displayEmpty
                  name="sorting"
                  onChange={this._handleSortOrder}
                  className={classes.selectEmpty}
                >
                  <MenuItem value={"nonspecific"}>Nonspecific</MenuItem>
                  <MenuItem value={"up"}>Low to high</MenuItem>
                  <MenuItem value={"down"}>High to low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} md={12} lg={12} className={classes.budgetContainer}>
              <Typography className={classes.typeTitle}>Budget</Typography>
            </Grid>
            <Grid xs={5}>
              <FormControl className={classes.budgetRange1}>
                <Input
                  value={this.state.amount}
                  onChange= {this._handleMinChange}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid xs={1} className={classes.hyphen}>
              <Typography>-</Typography>
            </Grid>
            <Grid xs={5}>
              <FormControl className={classes.budgetRange2}>
                <Input
                  value={this.state.amount}
                  onChange= {this._handleMaxChange}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              container
              style={{
                display: "flex",
                marginTop: "10px"
              }}
            >
              <Grid
                item
                xs={10}
                md={10}
                lg={10}
                style={{
                  display: "flex"
                }}
                container
              >
                <Avatar alt="Billiards" src={billiardsIcon} />

                <Typography gutterBottom className={classes.checkboxTitle}>
                  Gym
                </Typography>
              </Grid>
              <Grid item xs={2} md={2} lg={2} container>
                <Checkbox
                  color="primary"
                  onChange={this._handleGymCheckedChange.bind(this)}
                />
              </Grid>
              <Grid
                item
                xs={10}
                md={10}
                lg={10}
                style={{
                  display: "flex"
                }}
                container
              >
                <Avatar alt="Bar" src={barIcon} />

                <Typography gutterBottom className={classes.checkboxTitle}>
                  Bar
                </Typography>
              </Grid>
              <Grid item xs={2} md={2} lg={2} container>
                <Checkbox
                  color="primary"
                  onChange={this._handleBarCheckedChange.bind(this)}
                />
              </Grid>
              <Grid
                item
                xs={10}
                md={10}
                lg={10}
                style={{
                  display: "flex"
                }}
                container
              >
                <Avatar alt="Swimming Pool" src={swimmingPool} />

                <Typography gutterBottom className={classes.checkboxTitle}>
                  Swimming Pool
                </Typography>
              </Grid>
              <Grid item xs={2} md={2} lg={2} container>
                <Checkbox
                  color="primary"
                  onChange={this._handleSwimmingPoolCheckedChange.bind(this)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}

const mapStateToProps = state => {
  return {
    filter: state.filter
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setMinPrice: price => {
      dispatch({
        type: "SET_MINPRICE",
        payload: price
      });
    },
    setMaxPrice: price => {
      dispatch({
        type: "SET_MAXPRICE",
        payload: price
      });
    },
    setHotelType: hType => {
      dispatch({
        type: "SET_HOTELTYPE",
        payload: hType
      });
    },
    setGymChecked: isChecked => {
      dispatch({
        type: "SET_GYMCHECKED",
        payload: isChecked
      });
    },
    setBarChecked: isChecked => {
      dispatch({
        type: "SET_BARCHECKED",
        payload: isChecked
      });
    },
    setSwimmingPoolChecked: isChecked => {
      dispatch({
        type: "SET_SWIMMINGPOOLCHECKED",
        payload: isChecked
      });
    },
    setSortOrder: order => {
      dispatch({
        type: "SET_SORTORDER",
        payload: order
      });
    },
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(filterBox)
);
