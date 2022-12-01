import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { message }  from 'antd';
import { Form, redirect } from "react-router-dom";
import { JWTAuth } from "../func/users";
import binotify from '../assets/binotify.png'

export async function action({ request, params }) {
  const formData = await request.formData();
  let loginData = Object.fromEntries(formData);
  const Response = await JWTAuth(loginData);
  if (Response.isadmin) {
    message.success('Login Success');
    return redirect(`/admin`);
  }else if(!Response.isadmin){
    message.success("Login Success");
    return redirect(`/`);
  }
  else {
    message.error('Login Failed' + ": " + Response.msg);
  }
}


const theme = createTheme();

export default function Login() {

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="logo">
            <img src={binotify} alt="logo" />
            <p>Binotify Premium</p>
          </div>

          <Typography component="h1" variant="h5" mt={2}>
            Login to Continue
          </Typography>
          <Box component={Form} method="post" id="login-form">
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              color="success"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              color="success"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <p>
                  Don't have an account?
                  <Link href="/register" variant="body2">
                    SignUp
                  </Link>
                </p>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}