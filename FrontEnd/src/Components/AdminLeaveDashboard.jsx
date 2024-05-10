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
  Modal,
  TextField,
} from "@mui/material";
import { CheckCircle, Cancel, Visibility, Close } from "@mui/icons-material";
import toast from "react-hot-toast";

const AdminLeaveDashboard = () => {
  const [users, setUsers] = useState([]);
  const [reasonModalOpen, setReasonModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
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
    try {
      await axios.put(
        `http://localhost:3000/api/users/${userName}/updateLeaveRequest`,
        {
          leaveRequestId,
          newStatus,
        },
      );
      fetchUsers();
      toast.success("Leave request updated successfully");
    } catch (error) {
      console.error("Error updating leave request:", error);
      toast.error("Error updating leave request");
    }
  };

  const openReasonModal = (request) => {
    setSelectedRequest(request);
    setReasonModalOpen(true);
    setReason(request.reason || ""); // Set the reason in the state
  };

  const closeReasonModal = () => {
    setSelectedRequest(null);
    setReasonModalOpen(false);
    setReason(""); // Reset the reason
  };

  return (
    <Box
      className=" items-center justify-center space-x-4 mb-4 border border-gray-300 p-24  pl-[-5] rounded-md shadow-2xl  bg-[#DBF3FA] pr-20"
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
        <Table className="bg-[#DBF3FA] ">
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
                    {/* <TableCell>
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
                          <IconButton onClick={() => openReasonModal(request)}>
                            <Visibility />
                          </IconButton>
                        )}
                    </TableCell> */}
                    <TableCell>
                      <IconButton>
                        <Visibility />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              }),
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Reason Modal */}
      <Modal open={reasonModalOpen} onClose={closeReasonModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 4,
          }}>
          <Typography variant="h5" gutterBottom>
            Reason for Leave Request
          </Typography>
          <Typography variant="body1" gutterBottom>
            {selectedRequest && selectedRequest.reason}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <IconButton
              onClick={() =>
                updateLeaveRequest(
                  selectedRequest.user.username,
                  selectedRequest._id,
                  "disapproved",
                )
              }
              color="error">
              <Cancel />
            </IconButton>
            <IconButton
              onClick={() =>
                updateLeaveRequest(
                  selectedRequest.user.username,
                  selectedRequest._id,
                  "approved",
                )
              }
              color="success">
              <CheckCircle />
            </IconButton>
            <IconButton onClick={closeReasonModal}>
              <Close />
            </IconButton>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminLeaveDashboard;
