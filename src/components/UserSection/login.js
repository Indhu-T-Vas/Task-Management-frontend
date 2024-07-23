import {
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Link,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const defaultTheme = createTheme();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(e);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          { headers: { Authorization: `Bearer${response.access_token}` } }
        );
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleClick = async (e) => {
    console.log(e);
    e.preventDefault();
    try {
      const loginApi = await axios.post(
        "https://task-management-backend-btge.onrender.com/api/user/login",
        {
          email: email,
          password: password,
        }
      );

      console.log(12, loginApi);

      if (loginApi.data.success === true) {
        localStorage.setItem("userInfo", JSON.stringify(loginApi.data.data));
        localStorage.setItem("loggedIn", true);
        navigate("/dashboard");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      alert("Invalid Username/Password!   Please try again!!");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          height={400}
          width={500}
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "2px solid blue",
            borderRadius: 2,
            p: 3,
          }}
        >
          <Typography component="h1" variant="h5" fontWeight="bold">
            Login
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClick}
            >
              Login
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                Don't have an account?
                <Link href="/" variant="body2">
                  {" "}
                  Sign Up
                </Link>
              </Grid>
            </Grid>
            {/* <Button
              onClick={googleLogin}
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
              }}
            >
              Login with Google
            </Button> */}

            <Grid container justifyContent="center" marginTop={2}>
              <Grid item>
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const credentialResponseDecoded = jwtDecode(
                      credentialResponse.credential
                    );
                    console.log(credentialResponseDecoded);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
