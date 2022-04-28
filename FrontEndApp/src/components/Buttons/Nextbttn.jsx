import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 20,
    margin: "6.6px",
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
      endIcon={<NavigateNextIcon />}
      variant="outlined"
      color="primary"
      onClick={props.onClick}
    >
      Next
    </Button>
  );
}
