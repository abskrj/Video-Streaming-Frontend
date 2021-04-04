import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import axios from "axios";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup() {
  const classes = useStyles();

  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);
  const [alert, setAlert] = useState(false);
  const [alertType, setAlertType] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const history = useHistory();

  const toggleTnc = () => {
    if (disableSubmit) {
      setDisableSubmit(false);
    }
    else {
      setDisableSubmit(true);
    }
  }

  const signUp = (event) => {
    event.preventDefault();
    deleteAlert();
    createAlert('info', `Processing...Please Wait`);
    setDisableSubmit(true);

    if (!displayName.trim().length) {
      deleteAlert();
      createAlert('warning', `Please enter your name.`);
      setDisableSubmit(false);
      return;
    }

    if (!username.trim().length) {
      deleteAlert();
      createAlert('warning', `Please enter your username.`);
      setDisableSubmit(false);
      return;
    }

    if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
      deleteAlert();
      createAlert('warning', `Please enter a valid email.`);
      setDisableSubmit(false);
      return;
    }

    if (password.length < 8) {
      deleteAlert();
      createAlert('warning', `Password should be atleast 8 characters long.`);
      setDisableSubmit(false);
      return;
    }

    const axiosConfig = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const data = {
      'name': displayName,
      'username': username,
      'email': email,
      'password': password
    }

    axios.post("https://api.firestreamz.co/api/auth/signup", data, axiosConfig)
      .then((res) => {
        console.log(res);
        deleteAlert();
        createAlert('success', res.data.message);
        history.push("/login");
      })
      .catch((err) => {
        deleteAlert();
        // console.log(err.response)
        createAlert('error', err.response.data.message);
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

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="name"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                autoFocus
                onChange={event => setDisplayName(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={event => setUsername(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={event => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={event => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox color="primary" onClick={toggleTnc} />}
                label="I agree to the Terms  and Condition of this website."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={disableSubmit}
            onClick={signUp}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        {
          (alert) ? <Alert severity={alertType}>{alertMessage}</Alert> : null
        }
      </Box>
    </Container>
  );
}
