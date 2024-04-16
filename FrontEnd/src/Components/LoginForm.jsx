// import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import UserContext from "./UserContext";
// eslint-disable-next-line no-unused-vars
import toast, { Toaster } from "react-hot-toast";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Made with 💖 by "}
      <Link color="inherit" href="http://sandyapps.co">
        SandyApps
      </Link>
      {" ©️ "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function LoginForm({ login, role }) {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const { setUserName, setUserRole, Api_EndPoint } = useContext(UserContext);
  const navigate = useNavigate();

  /* *********** Form Validation ************ */
  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    /* *********** validating email ************ */
    if (!formData.username) {
      newErrors.username = "Please enter username";
      isValid = false;
    }

    /* *********** Validating password ************ */
    if (formData.password.length < 7) {
      newErrors.password = "Password must be at least 7 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(`${Api_EndPoint}/api/users/login`, {
          username: formData.username,
          password: formData.password,
        });
        // console.log(response.data);

        //accessing username
        setUserName(formData.username);
        login(true);
        toast.success(response.data.message);
        role(response.data.role);
        setUserRole(response.data.role);
        navigate("/home");
      } catch (error) {
        console.log(error);
        toast.error("Login failed. Please check your credentials.");
      }
    } else {
      console.log("Invalid Form");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ color: "text.primary" }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#fff" }}>
          <img src="/src/assets/logo.png" width="28px" height="auto" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
            value={formData.username}
            onChange={handleChange}
            error={Boolean(errors.username)}
            helperText={errors.username}
            inputProps={{
              maxLength: 25, // Limiting to 15 characters
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            error={Boolean(errors.password)}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            inputProps={{
              maxLength: 20, // Limiting to 15 characters
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "#1db0e6",
              "&:hover": { bgcolor: "#1b1d72" },
            }}
          >
            LogIn
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" sx={{ textDecoration: "none" }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                component={RouterLink}
                to="/signup"
                variant="body2"
                sx={{ textDecoration: "none" }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
