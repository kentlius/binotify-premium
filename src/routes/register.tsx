import { Form, redirect } from "react-router-dom";
import { RegisterUser } from "../users";
import { useState } from "react";
import { message } from "antd";
import binotify from "../assets/binotify.png";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../styles/auth.css";

export async function action({ request, params }) {
  const formData = await request.formData();
  let RegisterData = Object.fromEntries(formData);
  const data = await RegisterUser(RegisterData);
  if (data.error) {
    message.error("Register Failed: " + data.error)
  } else {
    message.success("Register Success, Logged In");
    return redirect(`/`);
  }
}

const theme = createTheme();

export default function Register() {

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="logo">
            <img src={binotify} alt="logo" />
            <p>Binotify Premium</p>
          </div>

          <Typography mt={2} component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component={Form} method="post" id="login-form">
            <TextField
              margin="normal"
              required
              fullWidth
              name="name"
              label="Name"
              id="name"
              autoComplete="current-password"
              color="success"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              id="email"
              type="email"
              autoComplete="current-password"
              color="success"
            />
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
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <p>
                  Already have an account?
                  <Link href="/login" variant="body2">
                    Login
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
