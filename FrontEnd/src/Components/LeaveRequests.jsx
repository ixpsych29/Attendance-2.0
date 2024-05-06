import React, { useState, useEffect, useContext } from "react";
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
} from "@mui/material";
import UserContext from "./UserContext";
import toast from "react-hot-toast";

const LeaveRequests = () => {
  const { Api_EndPoint, username } = useContext(UserContext);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // Initialize selectedUser state

  useEffect(() => {
    // Fetch leave requests data from the backend API
    const fetchLeaveRequests = async () => {
      try {
        // Check if selectedUser is not null
        if (selectedUser) {
          const response = await axios.put(
            `${Api_EndPoint}/api/users/${selectedUser.username}/leave-requests`,
          );
          setLeaveRequests(response.data.leaveRequests);
        }
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, [selectedUser]); // Fetch leave requests when selectedUser changes
  // Fetch leave requests when selectedUser changes

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
        sx={{ mt: 5, mb: 7, borderColor: "primary.main", borderWidth: 2 }}
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
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveRequests.map((request) => (
              <TableRow key={request._id}>
                <TableCell>{request.user.name}</TableCell>
                <TableCell>{request.leaveType}</TableCell>
                <TableCell>{request.startDate}</TableCell>
                <TableCell>{request.endDate}</TableCell>
                <TableCell>{request.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LeaveRequests;
