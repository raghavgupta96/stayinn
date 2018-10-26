import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import blackstar from "./blackstar.png";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  mainpaper: {
    width: "100%",
    marginBottom: "10px"
  },
  stars: {
    paddingLeft: "10px"
  },
  hotelTitle: {
    fontFamily: "Times",
    fontSize: "30px",
    display: "inline",
    marginLeft: "10px"
  },
  subTypography: {
    fontFamily: "Times",
    fontSize: "25px",
    marginLeft: "10px"
  },
  searchButton: {
    backgroundColor: "#409BE6",
    height: "47px",
    color: "#ffffff",
    marginLeft: "15px",
    marginRight: "15px",
    width: "150px",
    marginBottom: "5px",
    minWidth: "30px"
  },
  photo: {
    width: "100%"
  },
  photoContainer: {
    marginTop: "5px"
  },
  hotelInfo: {
    marginTop: "10px",
    marginLeft: "10px"
  },
  price: {
    paddingTop: "10px",
    fontSize: "30px",
    marginLeft: "35px"
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
                <Grid container xs={7} md={7} lg={7}>
                  <Grid item xs>
                    <Grid xs={12} md={12} lg={12} container>
                      <Grid
                        xs={8}
                        md={8}
                        lg={8}
                        style={{
                          paddingTop: "10px"
                        }}
                      >
                        <Link
                          to={"/hotel/" + hotel.hID}
                          style={{
                            textDecoration: "none"
                          }}
                        >
                          <Typography
                            gutterBottom
                            variant="title"
                            className={classes.hotelTitle}
                          >
                            {hotel.name}
                          </Typography>
                        </Link>
                      </Grid>
                      <Grid xs={3} md={3} lg={3} item className={classes.price}>
                        <Typography variant="subtitle1">$103.00</Typography>
                      </Grid>
                      <Grid
                        item
                        xs={10}
                        md={10}
                        lg={10}
                        className={classes.stars}
                      >
                        <img
                          src={blackstar}
                          alt="logo"
                          style={{
                            height: "15px",
                            width: "15px"
                          }}
                        />
                        <img
                          src={blackstar}
                          alt="logo"
                          style={{
                            height: "15px",
                            width: "15px"
                          }}
                        />
                        <img
                          src={blackstar}
                          alt="logo"
                          style={{
                            height: "15px",
                            width: "15px"
                          }}
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={8}
                      md={8}
                      lg={8}
                      className={classes.hotelInfo}
                    >
                      An intimate and charming atmosphere, high quality comfort
                      and traditional Bay Area hospitality. Includes
                      complimentary breakfast, from 6:30 - 10:30AM. We will
                      offer you the best service that the Bay Area has to offer.
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={12}
                    container
                    direction="column"
                  >
                    <Grid item xs />
                    <Grid item>
                      <Button
                        variant="contained"
                        onClick={this.submit}
                        className={classes.searchButton}
                        href={"/payment/" + hotel.hID}
                        color="primary"
                      >
                        Book
                      </Button>
                      <Button
                        variant="contained"
                        onClick={this.submit}
                        className={classes.searchButton}
                        color="primary"
                      >
                        More Details
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid xs={5} md={5} lg={5} className={classes.photoContainer}>
                  <img
                    src={hotel.photoUrl}
                    className={classes.photo}
                    alt="hotel pic"
                  />
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
