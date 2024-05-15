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
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { CheckCircle, Cancel, Visibility } from "@mui/icons-material";
import toast from "react-hot-toast";
import CommentsModal from "./CommentsModal"; // Importing the CommentsModal component

const AdminLeaveDashboard = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [approveComments, setApproveComments] = useState("");
  const [disapproveModalOpen, setDisapproveModalOpen] = useState(false);
  const [disapproveReason, setDisapproveReason] = useState("");
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);

  const handleApproveModalOpen = () => {
    setApproveModalOpen(true);
  };

  const handleCloseApproveModal = () => {
    setApproveModalOpen(false);
    setApproveComments("");
  };

  const handleDisapproveModalOpen = () => {
    setDisapproveModalOpen(true);
  };

  const handleCloseDisapproveModal = () => {
    setDisapproveModalOpen(false);
    setDisapproveReason("");
  };

  const handleCloseAllModals = () => {
    setApproveModalOpen(false);
    setDisapproveModalOpen(false);
    setModalOpen(false);
    setCommentsModalOpen(false);
    setApproveComments("");
    setDisapproveReason("");
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/users");
      console.log("API Response:", response.data);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateLeaveRequest = async (
    userName,
    leaveRequestId,
    newStatus,
    approveComments,
    disapprovalReason,
  ) => {
    try {
      await axios.put(
        `http://localhost:3000/api/users/${userName}/updateLeaveRequest`,
        {
          leaveRequestId,
          newStatus,
          disapprovalReason: disapprovalReason,
          approvalComments: approveComments,
        },
      );
      fetchUsers();
      toast.success("Leave request updated successfully");
      handleCloseAllModals();
    } catch (error) {
      console.error("Error updating leave request:", error);
      toast.error("Error updating leave request");
    }
  };

  const handleOpenModal = (request) => {
    const user = users.find((user) =>
      user.leaveRequests.some((req) => req._id === request._id),
    );
    setSelectedUser(user);
    setSelectedRequest(request);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
    setModalOpen(false);
  };

  const handleOpenCommentsModal = (request) => {
    const user = users.find((user) =>
      user.leaveRequests.some((req) => req._id === request._id),
    );
    setSelectedUser(user);
    setSelectedRequest(request);
    setCommentsModalOpen(true);
  };

  return (
    <>
      {/* Approve Modal */}
      <Modal open={approveModalOpen} onClose={handleCloseApproveModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            p: 4,
            borderRadius: 4,
          }}>
          <IconButton
            sx={{
              position: "absolute",
              top: 3,
              left: 3,
              zIndex: 1,
            }}
            onClick={handleCloseApproveModal}>
            <ArrowBackIcon />
          </IconButton>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: "center", marginBottom: 4 }}>
            Approve Modal Content
          </Typography>
          <TextField
            fullWidth
            label="Approve Reason"
            variant="outlined"
            multiline
            rows={4}
            value={approveComments}
            onChange={(e) => setApproveComments(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <IconButton
            onClick={() =>
              updateLeaveRequest(
                selectedUser.username,
                selectedRequest._id,
                "approved",
                approveComments,
                "",
              )
            }
            color="success"
            sx={{ display: "block", margin: "auto" }}>
            <CheckCircle />
          </IconButton>
        </Box>
      </Modal>
      {/* Disapprove Modal */}
      <Modal open={disapproveModalOpen} onClose={handleCloseDisapproveModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            p: 4,
            borderRadius: 4,
          }}>
          <IconButton
            sx={{
              position: "absolute",
              top: 3,
              left: 3,
              zIndex: 1,
            }}
            onClick={handleCloseDisapproveModal}>
            <ArrowBackIcon />
          </IconButton>

          <Typography
            variant="h5"
            gutterBottom
            sx={{ textAlign: "center", marginBottom: 4 }}>
            Disapprove Modal Content
          </Typography>
          <TextField
            fullWidth
            label="Disapprove Reason"
            variant="outlined"
            multiline
            rows={4}
            value={disapproveReason}
            onChange={(e) => setDisapproveReason(e.target.value)}
            sx={{ marginBottom: 2 }}
          />

          <IconButton
            onClick={() =>
              updateLeaveRequest(
                selectedUser.username,
                selectedRequest._id,
                "disapproved",
                "",
                disapproveReason,
              )
            }
            color="error"
            sx={{ display: "block", margin: "auto" }}>
            <Cancel />
          </IconButton>
        </Box>
      </Modal>
      {/* Reason Modal */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "white",
            p: 4,
            borderRadius: 4,
          }}>
          <IconButton
            sx={{
              position: "absolute",
              top: 3,
              right: 18,
            }}
            onClick={handleCloseModal}>
            <CloseIcon />
          </IconButton>

          {selectedRequest && selectedUser && (
            <>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ textAlign: "center", marginBottom: 4 }}>
                Leave Request Details
              </Typography>
              <TextField
                fullWidth
                label="Reason"
                variant="outlined"
                multiline
                rows={4}
                value={selectedRequest ? selectedRequest.reason : ""}
                disabled={!selectedRequest}
              />
              <Box sx={{ textAlign: "center", marginTop: 2 }}>
                <IconButton onClick={handleDisapproveModalOpen} color="error">
                  <Cancel />
                </IconButton>
                <IconButton onClick={handleApproveModalOpen} color="success">
                  <CheckCircle />
                </IconButton>
              </Box>
            </>
          )}
        </Box>
      </Modal>
      {/* Comments Modal */}
      <CommentsModal
        isOpen={commentsModalOpen}
        handleClose={() => setCommentsModalOpen(false)}
        request={selectedRequest}
      />

      <Box
        className="items-center justify-center space-x-4 mb-4 border border-gray-300 p-24 pl-[-5] rounded-md shadow-2xl bg-[#DBF3FA] pr-20"
        paddingBottom={3}
        boxShadow={3}
        mb={4}
        p={5}
        borderRadius={4}
        ml={40}
        mt={2}
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
                    <b>Leaves</b>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">
                    <b>Reason</b>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">
                    <b>Status</b>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">
                    <b>Comments</b>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) =>
                user.leaveRequests.map((request) => {
                  console.log("Request:", request);
                  console.log("Request ID:", request._id);
                  return (
                    <TableRow key={request._id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{request.leaveType}</TableCell>
                      <TableCell>{request.leaveSubject}</TableCell>
                      <TableCell>{request.startDate}</TableCell>
                      <TableCell>{request.endDate}</TableCell>
                      <TableCell>
                        <div className="ml-5">{request.leaveDays}</div>
                      </TableCell>
                      <TableCell>
                        <div className="ml-3">
                          <IconButton onClick={() => handleOpenModal(request)}>
                            <Visibility />
                          </IconButton>
                        </div>
                      </TableCell>
                      <TableCell>
                        {request.status === "approved" && (
                          <IconButton color="success">
                            <CheckCircle />
                          </IconButton>
                        )}
                        {request.status === "disapproved" && (
                          <IconButton color="error">
                            <Cancel />
                          </IconButton>
                        )}
                        {request.status !== "approved" &&
                          request.status !== "disapproved" && (
                            <div>Pending</div>
                          )}
                      </TableCell>
                      <TableCell>
                        <div className="ml-3">
                          <IconButton
                            onClick={() => handleOpenCommentsModal(request)}>
                            <Visibility />
                          </IconButton>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                }),
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default AdminLeaveDashboard;
