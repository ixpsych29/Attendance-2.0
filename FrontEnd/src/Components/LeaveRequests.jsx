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
  const [usersWithLeaveStatus, setUsersWithLeaveStatus] = useState([]);

  useEffect(() => {
    const fetchUsersWithLeaveStatus = async () => {
      try {
        const response = await axios.get(`${Api_EndPoint}/api/users`);
        setUsersWithLeaveStatus(response.data);
      } catch (error) {
        console.error("Error fetching users with leave status:", error);
      }
    };

    fetchUsersWithLeaveStatus();
  }, []);

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
  {usersWithLeaveStatus.map((user) => (
    user.leaveStatus.map((status, index) => (
      <TableRow key={`${user._id}-${index}`}>
        <TableCell>{user.name}</TableCell>
        <TableCell>{status.leaveType}</TableCell>
        <TableCell>{status.startDate}</TableCell>
        <TableCell>{status.endDate}</TableCell>
        <TableCell>{status.status}</TableCell>
      </TableRow>
    ))
  ))}
</TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LeaveRequests;
