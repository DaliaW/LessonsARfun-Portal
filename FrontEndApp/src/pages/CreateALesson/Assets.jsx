import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import TogetherJS from "../../components/Together";
import { makeStyles } from "@material-ui/core/styles";
import Unsplashbtton from "../../components/Buttons/Unsplashbttn";
import Polybttn from "../../components/Buttons/Polybttn";
import ReactTooltip from "react-tooltip";
import Youtubebttn from "../../components/Buttons/Youtubebttn";
import PolyDashboard from "../../components/PolyDashboard/PolyDashboard";
import Unsplash from "../../components/UnsplashSearch";
import Youtube from "../../components/YoutubeDashboard";
import Grid from "@material-ui/core/Grid";

import Nextbttn from "../../components/Buttons/Nextbttn";
import Txtbttn from "../../components/Buttons/Txtbttn";
import Txt from "../../components/TxtDashboard";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    minWidth: "300px",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "44px",

    "& > *": {
      margin: theme.spacing(0.2),
    },
  },
  text: {
    paddingTop: "4%",
    marginBottom: "1%",
  },
  paper: {
    margin: "50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    boxShadow: "0px 0px 15px 0px #F173A2",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  select: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    boxShadow: "0px 0px 15px 0px #2672cf",
  },
  cancel: {
    margin: theme.spacing(0, 0, 2),
    boxShadow: "0px 0px 15px 0px #F173A2",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 380,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  media: {
    height: 140,
  },
  button: {
    margin: "1.6px",
  },
}));

export default function Assets() {
  const classes = useStyles();
  const [Bttns, setBttns] = useState({
    unsplash: false,
    poly: true,
    youtube: false,
    Txt: false,
  });
  const routeChange = (path) => {
    document.location.href = window.location.origin + `/${path}`;
  };
  // defining the variables and states
  const [imageLink, setImageLink] = useState("");
  const [modelLink, setModelLink] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [trans, setTrans] = useState({});
  const [allModels, setAllModels] = useState({});
  const [allImages, setAllImages] = useState({});
  const [allTxt, setAllTxt] = useState({});

  useEffect(() => {
    console.log("pic", localStorage.getItem("pic"));
    console.log("video", localStorage.getItem("video"));
    console.log("thumbnail", localStorage.getItem("modelThumbnail"));
    console.log("model", localStorage.getItem("modelUrl"));
    console.log("attributes", JSON.parse(localStorage.getItem("attributes")));

    const img = localStorage.getItem("pic");
    setImageLink(img);

    const vid = localStorage.getItem("video");
    setVideoLink(vid);

    const thumbnail = localStorage.getItem("modelThumbnail");
    setThumbnail(thumbnail);

    const model = localStorage.getItem("modelUrl");
    setModelLink(model);

    const attributes = JSON.parse(localStorage.getItem("attributes"));
    setTrans(attributes);

    const allModels = JSON.parse(localStorage.getItem("allEntries"));
    const getModels = { models: allModels };
    setAllModels(getModels);

    const allImages = JSON.parse(localStorage.getItem("allImages"));
    const getImages = { images: allImages };
    setAllImages(getImages);

    const allTxt = JSON.parse(localStorage.getItem("allTxt"));
    const getTxt = { Text: allTxt };
    setAllTxt(getTxt);

    Swal.fire({
      title: "Hey 😄",
      html: "<div> You can start by choosing any of the lesson assets by switching between Images, 3D models, youTube video or adding your own Text.<br/> Then click next to proceed to lesson preview! </div>",
      icon: "question",
      confirmButtonText: '<i className="fa fa-thumbs-up"></i> OK!',
      confirmButtonAriaLabel: "Thumbs up, OK!",
    });
  }, []);

  return (
    <div>
      <TogetherJS />

      <Typography
        className={classes.text}
        component="h2"
        variant="h5"
        align="center"
        color="Primary"
        gutterBottom
      >
        Select lesson assets from below:
      </Typography>

      <div className={classes.root}>
        <Unsplashbtton
          onClick={() =>
            setBttns({
              unsplash: true,
              poly: false,
              youtube: false,
              Txt: false,
            })
          }
        />
        <Polybttn
          onClick={() =>
            setBttns({
              unsplash: false,
              poly: true,
              youtube: false,
              Txt: false,
            })
          }
        />
        <Youtubebttn
          onClick={() =>
            setBttns({
              unsplash: false,
              poly: false,
              youtube: true,
              Txt: false,
            })
          }
        />
        <Txtbttn
          onClick={() =>
            setBttns({
              unsplash: false,
              poly: false,
              youtube: false,
              Txt: true,
            })
          }
        />
      </div>

      {Bttns.unsplash ? (
        <Unsplash />
      ) : Bttns.poly ? (
        <PolyDashboard />
      ) : Bttns.youtube ? (
        <Youtube />
      ) : Bttns.Txt ? (
        <Txt />
      ) : null}

      <ReactTooltip />
      <div className={classes.paper}>
        <Grid item xs={12}>
          <Nextbttn onClick={() => routeChange("CreateLesson/preview")} />
        </Grid>
      </div>
    </div>
  );
}
