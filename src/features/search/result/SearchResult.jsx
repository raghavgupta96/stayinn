import React from "react";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import StarRatings from "react-star-ratings";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  divider: {
    width: "90%",
    marginTop: "10px",
    marginLeft: "10px"
  },
  mainpaper: {
    width: "100%",
    marginTop: "10px"
  },
  stars: {
    paddingLeft: "10px"
  },
  hotelDetails: {
    marginTop: "10px",
    marginBottom: "10px",
    paddingLeft: "10px"
  },
  hotelTitle: {
    fontFamily: "Times",
    fontSize: "32px",
    display: "inline",
    marginLeft: "10px"
  },
  subTypography: {
    fontFamily: "Times",
    fontSize: "25px",
    marginLeft: "10px"
  },
  searchButton: {
    backgroundColor: "primary",
    height: "47px",
    color: "#ffffff",
    marginLeft: "15px",
    marginRight: "15px",
    width: "150px",
    marginBottom: "5px",
    minWidth: "30px"
  },
  photo: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  photoContainer: {
    marginTop: "0px"
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
      const pictures = [
        {
          photo1: hotel.photoUrl,
          photo2: hotel.photoUrl2
        }
        ];
    


      //filter goes here
      return (
        // this is for for an individual hotel card below
        <Grid container className={classes.root} xs={12} md={12} lg={12}>
          <Grid item xs={12} md={11} lg={11}>
            <Paper className={classes.mainpaper}>
              <Grid container key={hotel.id}>
                <Grid
                  container
                  xs={7}
                  md={7}
                  lg={7}
                  className={classes.hotelDetails}
                >
                  <Grid item xs>
                    <Grid xs={12} md={12} lg={12} container>
                      <Grid
                        item
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
                      <Grid xs={2} md={2} lg={2} item className={classes.price}>
                        <Typography variant="subtitle1">
                          ${hotel.price}
                          <div style={{ fontSize: "15px", color: "gray" }}>
                            per night
                          </div>
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        lg={12}
                        className={classes.stars}
                      >
                        <StarRatings
                          rating={parseFloat(hotel.rating)}
                          starRatedColor="red"
                          starDimension="20px"
                          starSpacing="3px"
                          numberOfStars={5}
                          name="rating"
                        />
                      </Grid>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid
                      item
                      xs={8}
                      md={8}
                      lg={8}
                      className={classes.hotelInfo}
                    >
                      <p>Facilities:</p>
                      <span style={{ fontSize: "15px", color: "gray" }}>
                        {hotel.gym && <span>Gym, </span>}
                        {hotel.bar && <span>Bar, </span>}
                        {hotel.swimmingPool && <span>Swimming Pool</span>}
                        {!hotel.bar && !hotel.gym && !hotel.swimmingPool && (
                          <span>None</span>
                        )}
                      </span>
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid
                      item
                      xs={8}
                      md={8}
                      lg={8}
                      className={classes.hotelInfo}
                    >
                      <p>Address:</p>
                      <p style={{ fontSize: "15px", color: "gray" }}>
                        {hotel.address}
                      </p>
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
                            pathname: "/payment/" + hotel.hID
                            // state: {
                            //   startDate: hotel.startDate,
                            //   endDate: hotel.endDate,
                            //   roomType: hotel.roomType,
                            //   rooms: hotel.rooms
                            // }
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
                        </Link>
                      ) : (
                        <span>
                          <Button
                            variant="contained"
                            className={classes.searchButton}
                            // href={"/payment/" + hotel.hID}
                            color="primary"
                            disabled
                          >
                            Book
                          </Button>
                        </span>
                      )}
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
        </Grid>
      );
    })
  ) : (
    // <p> There is no hotel match your searching.</p>
    <div>Loading</div>
  );

  return <div>{hotelList}</div>;
};

export default withStyles(styles)(SearchResult);
