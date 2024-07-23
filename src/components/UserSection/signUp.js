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
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const defaultTheme = createTheme();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    console.log(e);
  };
  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    console.log(e);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(e);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleClick = async (e) => {
    console.log(e);
    e.preventDefault();
    try {
      const signupApi = await axios.post("http://localhost:4500/api/user/", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
      });

      console.log(14, signupApi);

      if (signupApi.data.success === true) {
        navigate("/login");
      } else {
        console.log("Login failed");
      }
    } catch (error) {
      alert("Please do fill all the fields");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          height={650}
          width={500}
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "2px solid blue",
            borderRadius: 2,
            p: 3,
          }}
        >
          <Typography component="h1" variant="h5" fontWeight="bold">
            SignUp
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
              autoComplete="firstName"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              value={lastName}
              onChange={handleLastNameChange}
              autoComplete="lastName"
              autoFocus
            />
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
              id="password"
              value={password}
              onChange={handlePasswordChange}
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleClick}
            >
              SignUp
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                Already have an account?
                <Link href="/login"> Login</Link>
              </Grid>
            </Grid>
            {/* <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
              }}
            >
              SignUp with Google
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

export default SignUp;
