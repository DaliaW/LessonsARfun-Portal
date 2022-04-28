import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 20,
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function Polybttn(props) {
  const classes = useStyles();

  return (
    <Button
      size="medium"
      className={classes.root}
      startIcon={<NavigateBeforeIcon />}
      variant="outlined"
      onClick={props.onClick}
    >
      Prev
    </Button>
  );
}
