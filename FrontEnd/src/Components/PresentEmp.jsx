import {
  Box,
  Container,
  CssBaseline,
  Typography,
  Divider,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import TotalEmployeeRecord from "./TotalEmployeeRecord";
import Loader from "../Loader/Loader";

const PresentEmp = () => {
  const [presentUsers, setPresentUsers] = useState([]);
  const { Api_EndPoint } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const fetchPresentUsers = async () => {
    try {
      const response = await axios.get(
        `${Api_EndPoint}/api/attendance/present-users?type=daily`
      ); // Added query parameter type=daily
      console.log("Present Users Response: ", response.data); // Log for debugging
      setPresentUsers(response.data || []); // Ensure response.data is an array
    } catch (error) {
      console.error("Error fetching present users: ", error);
      setPresentUsers([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPresentUsers();
  }, [Api_EndPoint]);

  if (loading) {
    return <Loader />;
  }

  return (
    <Box paddingTop={2} paddingLeft={0}>
      <CssBaseline />
      <Container>
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
            Present Employees
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
          {presentUsers.length === 0 ? (
            <Typography variant="h6" textAlign="center">
              No one is present
            </Typography>
          ) : (
            <TotalEmployeeRecord users={presentUsers} />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default PresentEmp;
