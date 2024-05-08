import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Grid,
  Box,
  Typography,
  Select,
  Divider,
} from "@mui/material";
import UserContext from "./UserContext";
import toast from "react-hot-toast";
import axios from "axios"; // Import Axios

const LeaveForm = () => {
  const { username, email } = useContext(UserContext);
  const [leaveData, setLeaveData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [errors, setErrors] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      leaveType: "",
      startDate: "",
      endDate: "",
      reason: "",
    };

    if (!leaveData.leaveType) {
      newErrors.leaveType = "Leave type is required";
      valid = false;
    }
    if (!leaveData.startDate) {
      newErrors.startDate = "Start date is required";
      valid = false;
    }
    if (!leaveData.endDate) {
      newErrors.endDate = "End date is required";
      valid = false;
    }
    if (!leaveData.reason) {
      newErrors.reason = "Reason is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const currentDate = new Date();

    if (!validateForm()) {
      return;
    }

    try {
      // Fetch the user's leave requests to check for pending requests
      const response = await axios.get(
        `http://localhost:3000/api/users/${username}`,
      );
      const userLeaveRequests = response.data.leaveRequests;
      if (userLeaveRequests.length > 0) {
        // Check if there is any pending leave request
        const pendingRequest = userLeaveRequests.find(
          (request) => request.status === "pending",
        );
        if (pendingRequest) {
          toast.error(
            "You have another Leave Request pending. Please wait for approval.",
          );
          return;
        }
      }

      // No pending requests, submit the new leave request
      await axios.post(
        `http://localhost:3000/api/users/${username}/leave-request`,
        leaveData,
      );
      toast.success("Leave submitted successfully");
      console.log("Form Submitted");
      // Clear the form after successful submission
      setLeaveData({
        leaveType: "",
        startDate: "",
        endDate: "",
        reason: "",
      });
    } catch (error) {
      console.error("Error submitting leave request:", error);
      toast.error("Failed to submit leave request");
    }
  };

  return (
    <Box
      bgcolor="white"
      paddingBottom={3}
      boxShadow={3}
      mb={4}
      p={5}
      borderRadius={4}
      ml={70}
      mt={15}
      width={"40%"}>
      <Typography variant="h4" component="h2" gutterBottom textAlign="center">
        Leave Application
      </Typography>
      <Divider
        variant="middle"
        sx={{ mt: 5, mb: 7, borderColor: "primary.main", borderWidth: 2 }}
      />
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="email"
              label="Email"
              value={email}
              disabled
            />
          </Grid>
          <Grid item xs={12} md={6} style={{ height: "16px" }} />
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="leave-type"
              label="Leave Type"
              value={leaveData.leaveType}
              onChange={(e) =>
                setLeaveData({ ...leaveData, leaveType: e.target.value })
              }
              error={!!errors.leaveType}
              helperText={errors.leaveType}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="start-date"
              label="Start Date"
              type="date"
              value={leaveData.startDate}
              onChange={(e) =>
                setLeaveData({ ...leaveData, startDate: e.target.value })
              }
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.startDate}
              helperText={errors.startDate}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="end-date"
              label="End Date"
              type="date"
              value={leaveData.endDate}
              onChange={(e) =>
                setLeaveData({ ...leaveData, endDate: e.target.value })
              }
              InputLabelProps={{
                shrink: true,
              }}
              error={!!errors.endDate}
              helperText={errors.endDate}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="reason"
              label="Reason"
              multiline
              rows={4}
              value={leaveData.reason}
              onChange={(e) =>
                setLeaveData({ ...leaveData, reason: e.target.value })
              }
              error={!!errors.reason}
              helperText={errors.reason}
            />
          </Grid>
          <Grid item xs={12}>
            <Box textAlign="center">
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default LeaveForm;
