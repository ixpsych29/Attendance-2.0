import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { useContext, useState } from "react";
import UserContext from "./UserContext";
import MuiPhoneNumber from "material-ui-phone-number-2";
import ProfilePictureUpload from "./ProfilePictureUpload";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { nameUser, username, Api_EndPoint, email, phNumber } =
    useContext(UserContext);

  const [formData, setFormData] = useState({
    name: nameUser,
    email: email,
    username: username,
    phoneNo: phNumber,
  });

  //handling Form Data
  const handleValueChange = (event) => {
    const inputValue = event.target.value;

    // Allow only letters and spaces
    const filteredValue = inputValue.replace(/[^A-Za-z\s]/g, "");
    setFormData({ ...formData, name: filteredValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //making an APi call

      await axios.put(`${Api_EndPoint}/api/users/${username}/update-profile`, {
        phoneNo: formData.phoneNo,
      });
      toast.success("Profile Updated");
    } catch (err) {
      console.log("Error Updating Profile Data", err);
    }
  };

  return (
    <>
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
          <Typography component="h1" variant="h5" fontWeight="bold">
            Profile Information
          </Typography>
          <ProfilePictureUpload />
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm>
                <TextField
                  autoComplete="given-name"
                  disabled
                  name="name"
                  fullWidth
                  id="name"
                  label="Name"
                  helperText="You can't change your name"
                  // autoFocus
                  inputProps={{ maxLength: 30 }}
                  value={nameUser}
                  onChange={handleValueChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled
                  fullWidth
                  helperText="You can't change your email"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled
                  helperText="You can't change your username"
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  value={username}
                />
              </Grid>

              <Grid item xs={12}>
                <MuiPhoneNumber
                  defaultCountry="pk"
                  fullWidth
                  label="Phone Number"
                  value={formData.phoneNo}
                  onChange={(value) =>
                    setFormData({ ...formData, phoneNo: value })
                  }
                  id="phoneNo"
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={!(formData.name && formData.phoneNo)}
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "#1db0e6",
                "&:hover": { bgcolor: "#1b1d72" },
              }}
            >
              Update Profile
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
