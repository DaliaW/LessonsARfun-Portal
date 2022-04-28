import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import YouTubeIcon from "@material-ui/icons/YouTube";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Polybttn(props) {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      startIcon={<YouTubeIcon />}
      variant="outlined"
      color="secondary"
      onClick={props.onClick}
    >
      Youtube
    </Button>
  );
}
