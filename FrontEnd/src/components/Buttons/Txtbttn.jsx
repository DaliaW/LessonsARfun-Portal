import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TranslateIcon from "@material-ui/icons/Translate";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Txtbttn(props) {
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      startIcon={<TranslateIcon />}
      variant="outlined"
      color="primary"
      onClick={props.onClick}
    >
      Text
    </Button>
  );
}
