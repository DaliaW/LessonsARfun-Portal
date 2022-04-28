import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import PhotoIcon from "@material-ui/icons/Photo";

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
      startIcon={<PhotoIcon />}
      variant="outlined"
      onClick={props.onClick}
    >
      Photos
    </Button>
  );
}
