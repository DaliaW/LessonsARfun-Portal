import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";

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
      startIcon={<AccessibilityNewIcon />}
      variant="outlined"
      color="primary"
      onClick={props.onClick}
    >
      3D Models
    </Button>
  );
}
