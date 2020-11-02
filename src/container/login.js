import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Alert from '@material-ui/lab/Alert';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [redirect, setRedirect] = useState(false);


  useEffect(() => {
    const lastLogin = parseInt(localStorage.getItem('lastLogin')) || null;

    if (!lastLogin) {
      return;
    }

    const validLoginTime = lastLogin + 604800000;

    if (validLoginTime < Date.now()) {
      return;
    }

    setRedirect(true);

  }, [])

  const login = (event) => {
    event.preventDefault();
    setDisableSubmit(true);
    deleteAlert();
    createAlert('info', `Processing...Please Wait`);

    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const data = {
      'username': username,
      'password': password
    }

    axios.post("https://radiant-dawn-27084.herokuapp.com/api/auth/signin", data, axiosConfig)
      .then((res) => {
        console.log(res.data)
        deleteAlert();
        createAlert('success', `Logged in as ${res.data.username}`);
        localStorage.setItem('accessToken', res.data.accessToken)
        localStorage.setItem('avtarUrl', res.data.avtarUrl)
        localStorage.setItem('username', res.data.username)
        localStorage.setItem('email', res.data.email)
        localStorage.setItem('id', res.data.id)
        localStorage.setItem('lastLogin', Date.now());

      })
      .catch((err) => {
        deleteAlert();
        if (err.response.status === 404) {
          createAlert('error', `Username or Password invalid`);
        }
        else {
          createAlert('error', `Something went wrong`);
        }
        setDisableSubmit(false);
      });
  }

  const createAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setAlert(true);
  }

  const deleteAlert = () => {
    setAlert(null);
  }

  const renderRedirect = () => {
    if (redirect) {
      return (<Redirect to='/' />)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      {renderRedirect()}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={username}
            onChange={event => setUsername(event.target.value)}
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
            onChange={event => setPassword(event.target.value)}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            disabled={disableSubmit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={login}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/forget" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
        {alert}
      </div>
      <Box mt={8}>
        {
          (alert) ? <Alert severity={alertType}>{alertMessage}</Alert> : null
        }
      </Box>

    </Container>
  );
}
