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
import ReactTooltip from "react-tooltip";
import axios from "axios";
import { link } from "../helpers/constants";
import { ARlink } from "../helpers/constants";
import QRCode from "react-qr-code";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright ©  LessonsARfun by "}
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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  box: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: "194px",
    left: "-252px",
  },
  boxOverlay: {
    zIndex: 9,
    margin: "30px",
  },
}));

export default function Home() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [cardId, setCardId] = useState("");

  console.log(ARlink);
  const routeChange = (path) => {
    document.location.href = window.location.origin + `/${path}`;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ARrouteChange = (path) => {
    document.location.href = `${ARlink}/${path}`;
  };

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(`${link}/lessons`);
      console.log(response);
      setData(response.data);
    }
    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">
              Scan QR code below to view it on mobile
            </h2>
            <p id="transition-modal-description">
              Keep the phone pointed to the target image
            </p>
            <div className={classes.box}>
              <QRCode size={140} value={`${ARlink}/lesson/${cardId}`} />
            </div>
            <div className={classes.boxOverlay}>
              <img
                alt="targetImage"
                id="card"
                src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@0.4.2/examples/assets/card-example/card.png"
              />
            </div>
            <p id="transition-modal-description">
              Or by clicking the button below
            </p>
            <Button
              onClick={() => ARrouteChange(`lesson/${cardId}`)}
              className={classes.button}
              boxShadow={3}
              variant="contained"
              align="center"
              color="primary"
            >
              View it in desktop
            </Button>
          </div>
        </Fade>
      </Modal>
      {/* <CssBaseline /> */}
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h2"
              variant="h5"
              align="center"
              color="Primary"
              gutterBottom
            >
              Welcome to "LessonsARfun" 🎉
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color="textPrimary"
              paragraph
            >
              A collaborative platform for teachers 👩‍🏫👨‍🏫
              <br />
              to create Augmented Reality lessons for their students. 👩‍💻 ⬅
              Discover more by hovering over the sidebar
              <br /> OR
              <h4> Start by creating a lesson below ⬇ </h4>
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    onClick={() => routeChange("CreateLesson/assets")}
                    className={classes.button}
                    boxShadow={3}
                    variant="contained"
                    align="center"
                    color="primary"
                  >
                    Create a Lesson
                  </Button>
                  <ReactTooltip />
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Typography
            component="h2"
            variant="h5"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            Discover AR Lessons ✨
          </Typography>
          <br />
          <Grid container spacing={4}>
            {data
              .slice(0)
              .reverse()
              .map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  {card.isPublic ? (
                    <Card boxShadow={3} className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={card.thumbnail ? card.thumbnail : card.imageLink}
                        title={card.lessonName}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {card.lessonName}
                        </Typography>
                        <Typography>{card.description}</Typography>
                        {/* <Typography>
                      by: Dalia Walid
                    </Typography> */}
                      </CardContent>
                      <CardActions>
                        <Button
                          onMouseEnter={() => setCardId(card.id)}
                          onClick={handleOpen}
                          size="small"
                          color="primary"
                        >
                          View
                        </Button>
                      </CardActions>
                    </Card>
                  ) : null}
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
