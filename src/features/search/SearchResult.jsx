import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import StarRatings from 'react-star-ratings';

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
    marginLeft: "40px"
  }
});

const SearchResult = ({ hotels, classes, disabled }) => {
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
                        <Typography variant="subtitle1">
                          ${hotel.roomType === 1 && hotel.rate1}
                          {hotel.roomType === 2 && hotel.rate2}
                          {hotel.roomType === 3 && hotel.rate3}
                          {hotel.roomType === 4 && hotel.rate4}
                          <div style={{ fontSize: "15px", color:"gray" }}>
                            for {hotel.roomType} people
                          </div>
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={10}
                        md={10}
                        lg={10}
                        className={classes.stars}
                      >
                        <StarRatings
                          rating={parseFloat(hotel.rating)}
                          starRatedColor="red"
                          starDimension='20px'
                          starSpacing='3px'
                          numberOfStars={5}
                          name='rating'
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
                      <p>Available facility:</p>
                      <span style={{ fontSize: "15px", color:"blue" }}>
                        {hotel.gym && <span>Gym,  </span>}
                        {hotel.bar && <span>Bar,  </span>}
                        {hotel.swimmingPool && <span>Swimming Pool</span>}
                        {!hotel.bar && !hotel.gym && !hotel.swimmingPool && <span>None.</span>}

                      </span>
                      <p>Address:</p>
                      <p style={{ fontSize: "15px", color:"gray" }}>{hotel.address}</p>
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
                      {!disabled ? (
                        <Link
                          to={{
                            pathname: "/payment/" + hotel.hID,
                            state: {
                              startDate: hotel.startDate,
                              endDate: hotel.endDate,
                              roomType: hotel.roomType,
                              rooms: hotel.rooms
                            }
                          }}
                          style={{
                            color: "#ffffff",
                            textDecoration: "none"
                          }}
                        >
                          <Button
                            variant="contained"
                            className={classes.searchButton}
                            // href={"/payment/" + hotel.hID}
                            color="primary"
                          >
                              Book
                          </Button>
                        </Link> )
                        : (
                          <div>
                            <Button
                              variant="contained"
                              className={classes.searchButton}
                              // href={"/payment/" + hotel.hID}
                              color="primary"
                              disabled
                            >
                                Book
                            </Button>
                          </div>)
                      }
                      <Button
                        variant="contained"
                        onClick={this.submit}
                        className={classes.searchButton}
                        color="primary"
                        href={"/hotel/" + hotel.hID}
                      >
                        More Details
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid xs={5} md={5} lg={5} className={classes.photoContainer}>
                  <Link to={"/hotel/" + hotel.hID}>
                    <img
                      src={hotel.photoUrl}
                      className={classes.photo}
                      alt="hotel pic"
                    />
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
