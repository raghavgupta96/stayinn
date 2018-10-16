import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  mainpaper: {
    width: "100%"
  },
  typography: {
    fontFamily: "Times",
    fontSize: "50px",
    marginLeft: "10px",
    textDecoration: "none"
  },
  subTypography: {
    fontFamily: "Times",
    fontSize: "25px",
    marginLeft: "10px"
  }
});

const SearchResult = ({ hotels, classes }) => {
  //check if the search result is empty
  const hotelList = hotels.length ? (
    hotels.map(hotel => {
      //filter goes here
      return hotel.room_cap >= 2 ? (
        // this is for for an individual hotel card below
        <Grid container className={classes.root} xs={12} md={12} lg={12}>
          <Grid item xs={11} md={11} lg={11}>
            <Paper className={classes.mainpaper}>
              <Grid container key={hotel.id}>
                <Grid xs={12} md={12} lg={12}>
                  <img
                    src={hotel.photoUrl}
                    alt="hotel phote"
                    height="400px"
                    width="100%"
                  />
                </Grid>
                <Grid xs={12} md={12} lg={12}>
                  <Link to={"/hotel/" + hotel.hID}>
                    <Typography
                      gutterBottom
                      variant="title"
                      className={classes.typography}
                    >
                      {hotel.name}
                    </Typography>
                  </Link>
                </Grid>
                <Grid xs={2} md={2} lg={2} direction="row">
                  <Link to={"/payment" + hotel.hID}>
                    <Typography
                      gutterBottom
                      variant="title"
                      className={classes.subTypography}
                    >
                      Book Now!
                    </Typography>
                  </Link>
                </Grid>
                <Grid xs={2} md={2} lg={2} direction="row">
                  <Link to={"/hotel/" + hotel.hID}>
                    <Typography
                      gutterBottom
                      variant="title"
                      className={classes.subTypography}
                    >
                      More Details
                    </Typography>
                  </Link>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={1} md={1} lg={1} />
        </Grid>
      ) : // <div key={hotel.id}>
      //     <img src={hotel.photoUrl} alt="hotel phote" height="50" width="80"/>
      //     <Link to={'/hotel/' + hotel.hID}>
      //       <div>Hotel name: {hotel.name}</div>
      //     </Link>
      //     <div>Hotel ID: {hotel.hID}</div>
      //     <div>Hotel room max capacity: {hotel.room_cap}</div>
      //     <div>________________</div>

      // </div>
      null;
    })
  ) : (
    <p> There is no hotel match your searching.</p>
  );

  return <div>{hotelList}</div>;
};

export default withStyles(styles)(SearchResult);
