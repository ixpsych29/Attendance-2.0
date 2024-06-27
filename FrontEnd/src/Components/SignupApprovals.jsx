import { useState, useEffect, useContext } from "react";
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
  Modal,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CheckCircle, Cancel, QueryBuilder } from "@mui/icons-material";
import UserContext from "./UserContext";
import toast from "react-hot-toast";

const SignupApprovals = () => {
  const { Api_EndPoint } = useContext(UserContext);
  const [requests, setRequests] = useState([]);
  const [reasonModalOpen, setReasonModalOpen] = useState(false);
  const [selectedReasonRequest, setSelectedReasonRequest] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${Api_EndPoint}/api/users`);
        setRequests(response.data.users); // Assuming the response contains an array of users with a field 'users'
      } catch (error) {
        console.error("Error fetching signup requests:", error);
        toast.error("Error fetching signup requests");
      }
    };

    fetchRequests();
  }, []);

  const handleReasonOpenModal = (request) => {
    setSelectedReasonRequest(request);
    setReasonModalOpen(true);
  };

  const handleReasonCloseModal = () => {
    setSelectedReasonRequest(null);
    setReasonModalOpen(false);
  };

  const handleStatusUpdate = async (userName, newStatus) => {
    try {
      await axios.put(`${Api_EndPoint}/api/users/${userName}/update-profile`, {
        status: newStatus,
      });
      // Update the local state to reflect the change
      setRequests((prevRequests) =>
        prevRequests.map((user) =>
          user.username === userName ? { ...user, status: newStatus } : user
        )
      );
      toast.success("User status updated successfully");
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("Error updating user status");
    }
  };

  return (
    <>
      <Modal open={reasonModalOpen} onClose={handleReasonCloseModal}>
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
          }}
        >
          <IconButton
            sx={{
              position: "absolute",
              top: 3,
              right: 18,
            }}
            onClick={handleReasonCloseModal}
          >
            <CloseIcon />
          </IconButton>
          {selectedReasonRequest && (
            <>
              <Typography
                variant="h5"
                gutterBottom
                sx={{ textAlign: "center", marginBottom: 4 }}
              >
                Leave Request Details
              </Typography>
              <Typography variant="body1">
                {selectedReasonRequest.reason}
              </Typography>
            </>
          )}
        </Box>
      </Modal>

      <Box
        className=" items-center justify-center space-x-4 mb-4 border border-gray-300 p-24  pl-[-5] rounded-md shadow-2xl  bg-[#DBF3FA] pr-20"
        paddingBottom={3}
        boxShadow={3}
        mb={4}
        p={5}
        borderRadius={4}
        ml={20.3}
        mt={2}
        width={"80%"}
      >
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          Signup Requests
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
          <Table className="bg-[#DBF3FA]">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}
                  >
                    Username
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}
                  >
                    Email
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}
                  >
                    Status
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: "bold" }}
                  >
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request._id}>
                  <TableCell>{request.username}</TableCell>
                  <TableCell>{request.email}</TableCell>
                  <TableCell>
                    {request.status === "approved" && (
                      <CheckCircle color="success" />
                    )}
                    {request.status === "disapproved" && (
                      <Cancel color="error" />
                    )}
                    {request.status === "pending" && (
                      <QueryBuilder color="warning" />
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() =>
                        handleStatusUpdate(request.username, "approved")
                      }
                    >
                      <CheckCircle color="success" />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleStatusUpdate(request.username, "disapproved")
                      }
                    >
                      <Cancel color="error" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default SignupApprovals;
