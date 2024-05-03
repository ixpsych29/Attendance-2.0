import {
  Box,
  Container,
  CssBaseline,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";

const TotalEmployee = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Function to handle closing modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  // Function to handle updating user profile
  const handleUpdateProfile = () => {
    // Implement update logic here
    // After updating, close the modal
    handleCloseModal();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users"); // Update URL
        setUsers(response.data.users); // Assuming response.data has the structure { totalEmployees: ..., users: [...] }
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };
    console.log("user", fetchUsers);

    fetchUsers();
  }, []);

  return (
    <Box paddingTop={10} paddingLeft={35}>
      <CssBaseline />
      <Container>
        {/* Modal for updating user profile */}
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
            }}>
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
                />
                <TextField
                  label="Username"
                  defaultValue={selectedUser.username}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Email"
                  defaultValue={selectedUser.email}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  label="Phone Number"
                  defaultValue={selectedUser.phoneNumber}
                  fullWidth
                  margin="normal"
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
          bgcolor="white"
          paddingBottom={50}
          paddingTop={5}
          boxShadow={3}
          mb={4}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            textAlign="center"
            sx={{ mb: 3, color: "text.primary" }}>
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
          <Table
            stickyHeader
            sx={{
              minWidth: 650,
              mt: 3,
            }}
            size="small"
            aria-label="a dense table"
            className="w-full border-collapse">
            <TableHead className="bg-gray-200">
              <TableRow>
                <TableCell align="center" className="px-4 py-2">
                  Name
                </TableCell>
                <TableCell align="center" className="px-4 py-2">
                  User Name
                </TableCell>
                <TableCell align="center" className="px-4 py-2">
                  Email
                </TableCell>
                <TableCell align="center" className="px-4 py-2">
                  Phone Number
                </TableCell>
                <TableCell align="center" className="px-4 py-2">
                  Edit
                </TableCell>
                <TableCell align="center" className="px-4 py-2">
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell align="center" className="px-4 py-2">
                    {user.name}
                  </TableCell>
                  <TableCell align="center" className="px-4 py-2">
                    {user.username}
                  </TableCell>
                  <TableCell align="center" className="px-4 py-2">
                    {user.email}
                  </TableCell>
                  <TableCell align="center" className="px-4 py-2">
                    {user.phoneNumber}
                  </TableCell>
                  <TableCell align="center" className="px-4 py-2">
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(user)}>
                      {" "}
                      {/* Pass user object to handleEdit */}
                      <Edit />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center" className="px-4 py-2">
                    <IconButton aria-label="delete">
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Container>
    </Box>
  );
};

export default TotalEmployee;
