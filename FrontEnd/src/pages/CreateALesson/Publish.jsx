import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import TogetherJS from "../../components/Together";
import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import { link } from "../../helpers/constants";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import Prevbttn from "../../components/Buttons/Prevbttn";

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
    marginTop: "50px",
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
}));

export default function Publish() {
  const classes = useStyles();

  // defining the variables and states
  const [lessonName, setLessonName] = useState("");
  const [description, setDescription] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [modelLink, setModelLink] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [trans, setTrans] = useState({});
  const [allModels, setAllModels] = useState({});
  const [allImages, setAllImages] = useState({});
  const [Text, setAllTxt] = useState({});

  const [state, setState] = useState({
    public: true,
  });
  const { addToast } = useToasts();
  const routeChange = (path) => {
    document.location.href = window.location.origin + `/${path}`;
  };
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

    const allModels = JSON.parse(localStorage.getItem("Models"));
    const getModels = { models: allModels };
    setAllModels(getModels);
    console.log(getModels);

    const allImages = JSON.parse(localStorage.getItem("allImages"));
    const getImages = { images: allImages };
    setAllImages(getImages);

    const allTxt = JSON.parse(localStorage.getItem("allTxt"));
    const getTxt = { Txt: allTxt };

    console.log(allTxt);

    console.log("all", JSON.parse(localStorage.getItem("Models")));

    setAllTxt(getTxt);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    const isPublic = state.public;
    const lesson = {
      lessonName,
      description,
      isPublic,
      imageLink,
      modelLink,
      thumbnail,
      videoLink,
      trans,
      allModels,
      allImages,
      Text,
    };
    console.log(lesson);
    if (lessonName === "") {
      addToast("Please enter a name for the lesson!", {
        appearance: "error",
        autoDismiss: true,
      });
    } else if (imageLink === "" || modelLink === "" || videoLink === "") {
      addToast("Please select at least one asset!", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      try {
        const response = await axios.post(`${link}/lessons`, lesson);
        console.log(response);
        localStorage.removeItem("video");
        localStorage.removeItem("pic");
        localStorage.removeItem("modelThumbnail");
        localStorage.removeItem("modelUrl");
        localStorage.removeItem("attributes");
        localStorage.removeItem("allEntries");
        localStorage.removeItem("allImages");
        localStorage.removeItem("Models");
        localStorage.removeItem("allTxt");

        addToast("Lesson created successfully", {
          appearance: "success",
          autoDismiss: true,
        });

        document.location.href = window.location.origin + `/home`;
      } catch (err) {
        addToast(err + "", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleClear = () => {
    console.log("Cle");
    localStorage.removeItem("video");
    localStorage.removeItem("pic");
    localStorage.removeItem("modelThumbnail");
    localStorage.removeItem("modelUrl");
    localStorage.removeItem("attributes");
    localStorage.removeItem("allEntries");
    localStorage.removeItem("allImages");
    localStorage.removeItem("allTxt");

    window.location.reload();
  };

  return (
    <div>
      <TogetherJS />
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  className={classes.text}
                  component="h2"
                  variant="h5"
                  align="center"
                  color="Primary"
                  gutterBottom
                >
                  Selected lesson assets:
                </Typography>
                <div className="UnsplashSearch__card-list">
                  <div className="UnsplashSearch__card">
                    {allImages.images
                      ? allImages.images.map((image) => (
                          <img
                            className="UnsplashSearch__card--image"
                            alt="img"
                            src={image.picture}
                            width="50%"
                            height="50%"
                          ></img>
                        ))
                      : null}{" "}
                    ➡
                    {allModels.models
                      ? allModels.models.map((model) => (
                          <img
                            className="UnsplashSearch__card--image"
                            alt="img"
                            src={model.img}
                            width="50%"
                            height="50%"
                          ></img>
                        ))
                      : null}
                    ➡
                    {videoLink ? (
                      <img
                        className="UnsplashSearch__card--image"
                        alt="img"
                        src="https://static.thenounproject.com/png/1813969-200.png"
                        width="50%"
                        height="50%"
                      ></img>
                    ) : null}
                  </div>
                </div>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="lessonName"
                  name="lessonName"
                  variant="outlined"
                  required
                  fullWidth
                  id="lessonName"
                  label="lesson name"
                  autoFocus
                  value={lessonName}
                  onChange={({ target }) => setLessonName(target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="description"
                  value={description}
                  onChange={({ target }) => setDescription(target.value)}
                />
              </Grid>
            </Grid>
            <FormGroup row>
              <FormControlLabel
                control={
                  <Switch
                    checked={state.public}
                    onChange={handleChange}
                    name="public"
                  />
                }
                label="Public"
              />
            </FormGroup>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Publish
            </Button>

            <Button
              onClick={handleClear}
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.cancel}
            >
              clear all selected
            </Button>
          </form>
        </div>
      </Container>
      <div className={classes.paper}>
        <Grid item xs={12}>
          <Prevbttn onClick={() => routeChange("CreateLesson/preview")} />
        </Grid>
      </div>
    </div>
  );
}
