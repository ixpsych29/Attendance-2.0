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

const AdminLeaveDashboard = () => {
  const [users, setUsers] = useState([]);

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
  useEffect(() => {
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
      fetchUsers();
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
              <TableCell>
                <Typography variant="subtitle1">
                  <b>User</b>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">
                  <b>Leave Type</b>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">
                  <b>Leave Subject</b>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">
                  <b>Start Date</b>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">
                  <b>End Date</b>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">
                  <b>Unpaid Leaves</b>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">
                  <b>Status</b>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle1">
                  <b>Action</b>
                </Typography>
              </TableCell>
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
                    <TableCell>{request.leaveSubject}</TableCell>
                    <TableCell>{request.startDate}</TableCell>
                    <TableCell>{request.endDate}</TableCell>
                    <TableCell>
                      <div className="ml-14">{user.unpaidLeaves}</div>
                    </TableCell>

                    <TableCell>{request.status}</TableCell>
                    {/* // Inside TableCell component where icons are rendered */}
                    <TableCell>
                      {request.status !== "approved" && (
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
                      {request.status !== "disapproved" && (
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
                      {request.status !== "approved" &&
                        request.status !== "disapproved" && (
                          <div>
                            {/* Render nothing when status is neither approved nor disapproved */}
                          </div>
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

export default AdminLeaveDashboard;
