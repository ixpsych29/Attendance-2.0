import {
  Box,
  Button,
  Container,
  CssBaseline,
  Link,
  Typography,
} from "@mui/material";
import ChangePassword from "./ChangePassword";
import ProfilePage from "./ProfilePage";
import { useState } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ color: "text.primary" }}
      {...props}>
      {"Copyright © "}
      <Link color="inherit" href="#">
        SandyApps
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const ProfileParent = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setShowPassword(false);
  };
  const togglePassword = () => {
    setShowPassword(!showPassword);
    setShowProfile(false);
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
          // gap: "10px",
        }}>
        {/* <Button
          variant="outlined"
          fullWidth
          sx={{
            background: showProfile && "#1b1d72",
            color: showProfile && "#fff",
            mt: 3,
            mb: 2,
            "&:hover": { bgcolor: "#1b1d72", color: "#fff" },
          }}
          onClick={toggleProfile}>
          Update Profile
        </Button> */}
        {/* {showProfile && <ProfilePage />} */}
        <ProfilePage />
        <Button
          variant="outlined"
          fullWidth
          sx={{
            background: showPassword && "#1b1d72",
            color: showPassword && "#fff",
            mt: 3,
            mb: 2,
            // bgcolor: "#1db0e6",
            "&:hover": { bgcolor: "#1b1d72", color: "#fff" },
          }}
          onClick={togglePassword}>
          Update Password
        </Button>
        {/* {showPassword && <ChangePassword />} */}
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
};

export default ProfileParent;
