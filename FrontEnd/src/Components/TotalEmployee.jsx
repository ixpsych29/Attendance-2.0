import {
  Box,
  Container,
  CssBaseline,
  Typography,
  Divider,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import { DataTable } from "./DataTable"; // Import DataTable component

const TotalEmployee = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newName, setNewName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const { Api_EndPoint } = useContext(UserContext);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${Api_EndPoint}/api/users`);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to handle edit action
  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Function to handle update profile
  const handleUpdateProfile = async () => {
    try {
      await axios.put(
        `${Api_EndPoint}/api/users/${selectedUser.username}/update-profile`,
        {
          name: newName,
          username: newUsername,
          email: newEmail,
          phoneNo: newPhoneNumber,
        }
      );
      toast.success("Profile Updated");

      // Fetch updated user data after successful update
      fetchUsers();
    } catch (err) {
      console.error("Error Updating Profile Data", err);
      toast.error("Failed to update profile. Please try again later.");
    }
    handleCloseModal();
  };

  // Function to handle delete action
  const handleDelete = async (user) => {
    try {
      await axios.delete(`${Api_EndPoint}/api/users/${user.username}`);
      toast.success("User deleted successfully");

      // Fetch updated user data after successful deletion
      fetchUsers();
    } catch (err) {
      console.error("Error Deleting User", err);
      toast.error("Failed to delete user. Please try again later.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <Box paddingTop={2} paddingLeft={0}>
      <CssBaseline />
      <Container>
        <Modal open={isModalOpen} onClose={handleCloseModal}>
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
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Update Profile
            </Typography>
            {selectedUser && (
              <Box>
                <TextField
                  label="Name"
                  defaultValue={selectedUser.name}
                  fullWidth
                  margin="normal"
                  onChange={(e) => setNewName(e.target.value)}
                />
                <TextField
                  label="Username"
                  defaultValue={selectedUser.username}
                  fullWidth
                  margin="normal"
                  onChange={(e) => setNewUsername(e.target.value)}
                />
                <TextField
                  label="Email"
                  defaultValue={selectedUser.email}
                  fullWidth
                  margin="normal"
                  onChange={(e) => setNewEmail(e.target.value)}
                />
                <TextField
                  label="Phone Number"
                  defaultValue={selectedUser.phoneNumber}
                  fullWidth
                  margin="normal"
                  onChange={(e) => setNewPhoneNumber(e.target.value)}
                />
                <Box mt={2} textAlign="right">
                  <Button onClick={handleCloseModal}>Cancel</Button>
                  <Button variant="contained" onClick={handleUpdateProfile}>
                    Update Profile
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Modal>
        <Box
          bgcolor="#DBF3FA"
          paddingBottom={10}
          paddingTop={5}
          boxShadow={3}
          mb={4}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            textAlign="center"
            sx={{ mb: 3, color: "text.primary" }}
          >
            Total Employees
          </Typography>
          <Divider
            variant="middle"
            sx={{
              mt: 7,
              mb: 7,
              borderColor: "primary.main",
              borderWidth: 2,
            }}
          />
          <DataTable
            rows={users}
            columns={[
              { field: "id", headerName: "ID", width: 90 },
              { field: "name", headerName: "Name", width: 150 },
              { field: "username", headerName: "Username", width: 150 },
              { field: "email", headerName: "Email", width: 250 },
              { field: "phoneNumber", headerName: "Phone Number", width: 150 },
              {
                field: "actions",
                headerName: "Actions",
                width: 150,
                renderCell: (params) => (
                  <>
                    <Button
                      variant="outlined"
                      color="primary"
                      size="small"
                      onClick={() => handleEdit(params.row)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleDelete(params.row)}
                      style={{ marginLeft: 8 }}
                    >
                      Delete
                    </Button>
                  </>
                ),
              },
            ]}
            handleEdit={handleEdit}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default TotalEmployee;
