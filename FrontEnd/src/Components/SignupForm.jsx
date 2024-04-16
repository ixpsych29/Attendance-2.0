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
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import toast from "react-hot-toast";
import UserContext from "./UserContext";

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

export default function SignupForm() {
  const { Api_EndPoint } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChanges = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=-{}|:;\\'\\",<.>/?\\`~]).{8,}$/;

    if (!formData.name) {
      newErrors.name = "Enter Name";
      isValid = false;
    }
    if (!formData.userName) {
      newErrors.name = "Enter a unique user Name";
      isValid = false;
    }
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
      isValid = false;
    }

    // Validate password
    if (
      formData.password.length < 7 ||
      formData.password.length > 15 ||
      !passwordRegex.test(formData.password)
    ) {
      newErrors.password = "Enter a valid password between 7 and 15 letters";
      toast.error(
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
      );
      isValid = false;
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        // Check if the username already exists
        const usernameExists = await axios.get(
          `${Api_EndPoint}/api/users/exists/${formData.userName}`
        );
        if (usernameExists.data.exists) {
          // Username already exists, display an error
          toast.error(
            "Username already exists. Please choose a different username."
          );
          return;
        }
        const apiEndpoint = "/api/users";
        await axios.post(`${Api_EndPoint}${apiEndpoint}`, {
          name: formData.name,
          username: formData.userName,
          email: formData.email,
          password: formData.password,
        });
        toast.success("Registered Successfully");
        navigate("/");
        // Optionally, you can redirect the user or perform other actions after successful registration
      } catch (error) {
        // Handle errors from the server
        console.error("Error registering user:", error);
      }
    } else {
      // Form is not valid, handle accordingly
      toast.error("Form is not valid");
    }
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
        <Avatar sx={{ m: 1, bgcolor: "white" }}>
          <img src="/src/assets/logo.png" width="28px" height="auto" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="text"
            autoFocus
            error={errors.name}
            value={formData.name}
            onChange={handleChanges}
            inputProps={{
              maxLength: 30, // Limiting to 30 characters
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="User Name"
            name="userName"
            autoComplete="text"
            error={errors.userName}
            value={formData.userName}
            onChange={handleChanges}
            inputProps={{
              maxLength: 25, // Limiting to 25 characters
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChanges}
            error={!!errors.email}
            helperText={errors.email}
            inputProps={{
              maxLength: 35, // Limiting to 35 characters
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
            onChange={handleChanges}
            error={errors.password}
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
              maxLength: 20, // Limiting to 20 characters
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm-Password"
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            autoComplete="confirm-password"
            value={formData.confirmPassword}
            onChange={handleChanges}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
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
              maxLength: 20, // Limiting to 20 characters
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
            Sign up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item></Grid>
            <Grid item>
              <Link component={RouterLink} to="/" variant="body2">
                {"Already have an account? login"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
