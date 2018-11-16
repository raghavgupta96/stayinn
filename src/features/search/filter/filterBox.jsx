import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
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
    backgroundColor: "#E6F6FF",
    marginTop: "10px"
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
  typeTitle: {
    fontSize: "20px",
    marginTop: "10px",
    marginLeft: "10px"
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
      swimmingPoolChecked: ""
    };
  }

  _handleGymCheckedChange(ev) {
    this.setState({ gymChecked: ev.target.checked });
    this.props.setGymChecked(ev.target.checked);
  }

  _handleBarCheckedChange = ev => {
    this.setState({ barChecked: ev.target.checked });
    this.props.setBarChecked(ev.target.checked);
  };

  _handleSwimmingPoolCheckedChange = ev => {
    this.setState({ swimmingPoolChecked: ev.target.checked });
    this.props.setSwimmingPoolChecked(ev.target.checked);
  };

  _handleHotelTypeChange = ev => {
    this.setState({ hotelType: ev.target.value });
    this.props.setHotelType(ev.target.value);
  };

  _handleSortOrder = ev => {
    this.setState({ sortOrder: ev.target.value });
    this.props.setSortOrder(ev.target.value);
  };

  _handleMinChange = e => {
    const minPrice = e.target.value;
    // Check if valid
    if (minPrice > this.state.maxPrice) {
      window.alert("MinPrice must be less than MaxPrice");
      this.setState({ minPrice: 0, maxPrice: 0 });
      this.props.setMinPrice(0);
    } else {
      this.setState({ minPrice });
      this.props.setMinPrice(minPrice);
    }
  };
  _handleMaxChange = e => {
    const maxPrice = e.target.value;
    // Check if valid
    if (maxPrice < this.state.minPrice) {
      window.alert("MaxPrice must be greater than MinPrice");
      this.setState({ minPrice: 0, maxPrice: 0 });
      this.props.setMaxPrice(0);
    } else {
      this.setState({ maxPrice });
      this.props.setMaxPrice(maxPrice);
    }
  };

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
                  <MenuItem value={"up"}>Price: low to high</MenuItem>
                  <MenuItem value={"down"}>Price: high to low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={12} md={12} lg={12} className={classes.budgetContainer}>
              <Typography className={classes.typeTitle}>Budget</Typography>
            </Grid>
            <Grid xs={5}>
              <FormControl className={classes.budgetRange1}>
                <Input
                  value={this.state.minPrice}
                  onChange={this._handleMinChange}
                  type="number"
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
                  value={this.state.maxPrice}
                  onChange={this._handleMaxChange}
                  type="number"
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
    }
  };
};

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(filterBox)
);
