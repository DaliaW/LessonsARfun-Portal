import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import axios from "axios";
import { link } from "../helpers/constants";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © LessonsARfun by "}
      <Link color="inherit" href="https://daliawalid.netlify.app/">
        Dalia Walid
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 3),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    boxShadow: "0px 0px 15px 0px #002f68",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  button: {
    boxShadow: "0px 0px 15px 0px #2672cf",
  },
}));

export default function Classes() {
  const classes = useStyles();
  const [classroom, setClassroom] = useState([]);

  const routeChange = (path) => {
    document.location.href = window.location.origin + `/${path}`;
  };

  useEffect(() => {
    async function fetchData() {
      const user = localStorage.getItem("user");
      console.log(user);
      let response = await axios.get(`${link}/teachers/me`, {
        headers: { Authorization: `Bearer ${user}` },
      });
      console.log(response.data[0]);
      setClassroom(response.data[0].classrooms);
    }
    fetchData();
  }, []);
  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
      <main>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Typography
            component="h2"
            variant="h5"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            My Classes ✨
          </Typography>
          <br />
          <Grid container spacing={4}>
            {classroom.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  onClick={() => routeChange(`lessons/${card.id}`)}
                  boxShadow={3}
                  className={classes.card}
                >
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.classThumbnail}
                    title={card.className}
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.className}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      onClick={() => routeChange(`lessons/${card.id}`)}
                      size="small"
                      color="primary"
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}
