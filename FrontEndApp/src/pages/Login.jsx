import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useState, useEffect } from "react";
import axios from "axios";
import setAuthToken from "../helpers/setAuthToken";
import { link } from "../helpers/constants";
import { useToasts } from "react-toast-notifications";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(10, 5),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    backgroundImage:
      "url(https://miro.medium.com/max/1400/1*ox0moUEme-K-xX7TjMWdWg.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
    boxShadow: "0px 0px 15px 0px #2672cf",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(10),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    boxShadow: "0px 0px 15px 0px #2672cf",
  },
}));

export default function SignIn() {
  // defining the variables and states
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const { addToast } = useToasts();

  const routeChange = (path) => {
    document.location.href = window.location.origin + `/${path}`;
  };

  const classes = useStyles();

  // => used in the header to greet the user <=
  var date = new Date();
  var hrs = date.getHours();
  var greet;

  if (hrs < 12) greet = "Good Morning";
  else if (hrs >= 12 && hrs <= 16) greet = "Good Afternoon";
  else if (hrs >= 17 && hrs <= 24) greet = "Good Evening";
  //-------------------------------------------

  // get the token of the user to be used later
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      document.location.href = window.location.origin + "/home";
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { identifier, password };
    if (identifier === "" || password === "") {
      addToast("Please enter your Email and Password", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      try {
        const response = await axios.post(`${link}/auth/local`, user);
        console.log(response);
        if (response.error) {
          addToast(response.message[0].messages[0].message, {
            appearance: "error",
            autoDismiss: true,
          });
          console.log(response.data.err);
        } else {
          // store the user in the localStorage
          const token = response.data.jwt;
          localStorage.setItem("user", token);
          setAuthToken(token);
          localStorage.setItem("username", response.data.user.username);
          console.log(response.data.user.username);
          // go to the home page after login is successful
          document.location.href = window.location.origin + "/home";
        }
      } catch (err) {
        addToast("wrong username or password", {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  };

  return (
    <Grid container component="main" className={classes.root}>
      <Grid item xs={true} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={9} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircle />
          </Avatar>
          <Typography component="h1" variant="h">
            {greet}😊
          </Typography>

          <form onSubmit={handleSubmit} className={classes.form} Validate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={identifier}
              onChange={({ target }) => setIdentifier(target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => routeChange("forgetPassword")}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => routeChange("signup")}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}></Box>
      </Grid>
    </Grid>
  );
}
