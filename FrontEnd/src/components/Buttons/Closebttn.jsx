import React from "react";
import IconButton from "@material-ui/core/IconButton";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Swal from "sweetalert2";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 100,
    margin: "6.6px",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
}));

export default function Closebttn(props) {
  const classes = useStyles();

  function handleClick() {
    console.log("handleClick");
    const swalWithBootstrapButtons = Swal.mixin({
      buttonsStyling: true,
    });
    swalWithBootstrapButtons.fire({
      title: "Instructions",
      html: '<h4>Use "W" to translate <br/> "E" rotate <br/> "R" scale <br/> "+/-" adjust size "Q" toggle world/local space <br/> "Shift" snap to grid "X" toggle X <br/> "Y" toggle Y <br/> "Z" toggle Z <br/> "Spacebar" toggle enabled "C" toggle camera <br/> "V" random zoom. <br/> <b>After that click on "Next" to go to publish your lesson</b></h4>',
      icon: "question",
    });
  }
  return (
    <div>
      <IconButton
        color="primary"
        className={classes.root}
        onClick={() => handleClick()}
        aria-label="help"
      >
        <HelpOutlineIcon />
      </IconButton>
    </div>
  );
}
