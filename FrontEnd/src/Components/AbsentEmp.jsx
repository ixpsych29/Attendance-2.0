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

const AbsentEmp = () => {
  const [absentUsers, setAbsentUsers] = useState([]);
  const { Api_EndPoint } = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const fetchAbsentUsers = async () => {
    try {
      const response = await axios.get(
        `${Api_EndPoint}/api/attendance/absent-users`
      ); // Correct endpoint
      console.log("Absent Users Response: ", response.data); // Log for debugging
      setAbsentUsers(response.data || []); // Ensure response.data is an array
    } catch (error) {
      console.error("Error fetching absent users: ", error);
      setAbsentUsers([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbsentUsers();
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
            Absent Employees
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
          {absentUsers.length === 0 ? (
            <Typography variant="h6" textAlign="center">
              No one is absent
            </Typography>
          ) : (
            <TotalEmployeeRecord users={absentUsers} />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default AbsentEmp;
