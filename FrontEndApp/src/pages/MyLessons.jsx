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
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
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
  root: {
    maxWidth: 345,
    boxShadow: "0px 0px 15px 0px #002f68",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },

  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
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
  avatar: {
    backgroundColor: red[500],
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

export default function Classes() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [cardId, setCardId] = useState("");

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
      setData(response.data[0]);
      setLessons(response.data[0].lessons);
    }
    fetchData();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ARrouteChange = (path) => {
    document.location.href = `${ARlink}/${path}`;
  };

  return (
    <React.Fragment>
      {/* <CssBaseline /> */}
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
            My Lessons ✨
          </Typography>
          <br />
          <Grid container spacing={4}>
            {lessons
              .slice(0)
              .reverse()
              .map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card className={classes.root}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="avatar" className={classes.avatar}>
                          {data.user.username.charAt(0).toUpperCase()}
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title={card.lessonName}
                      subheader={new Date(card.created_at).toLocaleString()}
                    />
                    <CardMedia
                      className={classes.media}
                      image={card.thumbnail}
                      title={card.lessonName}
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {card.description}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <Button
                        onMouseEnter={() => setCardId(card.id)}
                        onClick={handleOpen}
                        size="small"
                        color="primary"
                      >
                        View
                      </Button>
                      <Button size="small" color="secondary">
                        Delete
                      </Button>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
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
