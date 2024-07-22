import React, { useContext, useState } from "react";
import axios from "axios";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import toast from "react-hot-toast";
import UserContext from "./UserContext";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { Api_EndPoint } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${Api_EndPoint}/api/users/forgot-password`,
        { email }
      );
      setMessage(response.data.message);
      toast.success("Reset link sent to your email");
    } catch (error) {
      setMessage("Error sending email. Please try again.");
      toast.error("Error sending email. Please try again.");
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{ marginTop: 23, marginLeft: "auto" }}
    >
      <CssBaseline />
      <Box
        sx={{
          marginTop: 30,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 2,
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(219, 243, 250)",
          padding: "20px",
          margin: "12px",
          boxShadow: "14px 12px 20px rgba(0, 0, 0, 0.6)",
        }}
      >
        <Typography component="h1" variant="h5" color={"black"}>
          Forget Password
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 4, width: "100%" }}
        >
          <div className="mb-6 text-center text-black">
            <label
              htmlFor="email"
              className="block mb-2 text-lg font-semibold text-white-900 dark:text-black-900"
            >
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              className={`bg-gray-50 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-white-700 dark:border-black dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`}
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            className="btn-style"
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 4,
              mb: 2,
            }}
          >
            Send Reset Link
          </Button>
        </Box>
        {message && (
          <Typography component="p" color={"red"}>
            {message}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default ForgetPassword;
