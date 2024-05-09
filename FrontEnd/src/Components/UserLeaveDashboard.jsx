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
import toast from "react-hot-toast";
import UserContext from "./UserContext";
import DisplayCard from "./DisplayCard";

const UserLeaveDashboard = () => {
  const { username } = useContext(UserContext);
  const [user, setUser] = useState([]);
  const [leave, setLeave] = useState(0);

  const fetchUser = async () => {
    try {
      // http://localhost:3000/api/users
      // http://localhost:3000/api/users/${username}
      const response = await axios.get(
        ` http://localhost:3000/api/users/${username}`,
      );
      console.log("API Response:", response); // Log the response data
      setUser(response.data.leaveRequests);
      setLeave({
        leaveCount: response.data.leaveCount,
        unpaidLeaves: response.data.unpaidLeaves,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <div className="flex justify-between">
        <div className="container ml-96  cursor-pointer">
          <div className="relative shadow-md transform hover:scale-105 transition duration-300 ease-in-out rounded-lg overflow-hidden flex justify-center btn-style ">
            <div className="p-7">
              <h5 className="text-white text-lg font-bold mb-2 flex justify-center">
                Your Remaining Leaves
              </h5>
              <h4 className="text-white text-3xl font-bold flex justify-center">
                {leave.leaveCount}
              </h4>
            </div>
          </div>
        </div>
        <div className="container ml-36  cursor-pointer">
          <div className="relative shadow-md transform hover:scale-105 transition duration-300 ease-in-out rounded-lg overflow-hidden flex justify-center btn-style ">
            <div className="p-7">
              <h5 className="text-white text-lg font-bold mb-2 flex justify-center">
                Your Unpaid Leaves
              </h5>
              <h4 className="text-white text-3xl font-bold flex justify-center">
                {leave.unpaidLeaves}
              </h4>
            </div>
          </div>
        </div>
      </div>
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
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}>
                    Leave Type
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}>
                    Start Date
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}>
                    End Date
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}>
                    Status
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}>
                    Reason
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}>
                    Leaves
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {user.map((user) => {
                return (
                  <TableRow>
                    <TableCell>{user.leaveType}</TableCell>
                    <TableCell>{user.startDate}</TableCell>
                    <TableCell>{user.endDate}</TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>{user.reason}</TableCell>
                    <TableCell>{user.leaveDays}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default UserLeaveDashboard;
