import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Divider,
  IconButton,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import toast from "react-hot-toast";

const LeaveRequests = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        console.log("API Response:", response.data); // Log the response data
        setUsers(response.data.users);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Error fetching users");
      }
    };

    fetchUsers();
  }, []);

  const updateLeaveRequest = async (userName, leaveRequestId, newStatus) => {
    console.log("User Name:", userName);
    console.log("Leave Request ID:", leaveRequestId);
    console.log("New Status:", newStatus);

    try {
      await axios.put(
        `http://localhost:3000/api/users/${userName}/updateLeaveRequest`,
        {
          leaveRequestId,
          newStatus,
        },
      );
      // Fetch users again to update the UI with the latest data
      // fetchUsers();
      toast.success("Leave request updated successfully");
    } catch (error) {
      console.error("Error updating leave request:", error);
      toast.error("Error updating leave request");
    }
    console.log("Leave request ID:", leaveRequestId); // Log leaveRequestId
  };

  return (
    <Box
      bgcolor="white"
      paddingBottom={3}
      boxShadow={3}
      mb={4}
      p={5}
      borderRadius={4}
      ml={40}
      mt={15}
      width={"80%"}>
      <Typography variant="h4" component="h2" gutterBottom textAlign="center">
        Leave Requests
      </Typography>
      <Divider
        variant="middle"
        sx={{
          mt: 5,
          mb: 7,
          borderColor: "primary.main",
          borderWidth: 2,
        }}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) =>
              user.leaveRequests.map((request) => {
                console.log("Request:", request); // Log the request object
                console.log("Request ID:", request._id); // Log the _id field
                return (
                  <TableRow key={request._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{request.leaveType}</TableCell>
                    <TableCell>{request.startDate}</TableCell>
                    <TableCell>{request.endDate}</TableCell>
                    <TableCell>{request.status}</TableCell>
                    <TableCell>
                      {request.status !== "approved" && (
                        <IconButton
                          onClick={() =>
                            updateLeaveRequest(
                              user.username,
                              request._id,
                              "approved",
                            )
                          }
                          color="success">
                          <CheckCircle />
                        </IconButton>
                      )}
                      {request.status !== "disapproved" && (
                        <IconButton
                          onClick={() =>
                            updateLeaveRequest(
                              user.username,
                              request._id,
                              "disapproved",
                            )
                          }
                          color="error">
                          <Cancel />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                );
              }),
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LeaveRequests;
