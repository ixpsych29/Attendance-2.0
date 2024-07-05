import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  Divider,
} from "@mui/material";
import UserContext from "./UserContext";
import Loader from "../Loader/Loader";

const PresentEmp = () => {
  const { Api_EndPoint } = useContext(UserContext);

  const [presentEmployees, setPresentEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPresentEmployees = async () => {
      try {
        const response = await axios.get(
          `${Api_EndPoint}/api/attendance/present-users/`
        );
        setPresentEmployees(response.data || []); // Ensure response.data is an array
      } catch (error) {
        console.error("Error fetching present employees:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchPresentEmployees();
  }, [Api_EndPoint]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Typography variant="h6" textAlign="center">
        {error}
      </Typography>
    );
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
          {presentEmployees.length === 0 ? (
            <Typography variant="h6" textAlign="center">
              No employees are present
            </Typography>
          ) : (
            <ul>
              {presentEmployees.map((employee) => (
                <li key={employee._id}>
                  {employee.name} - {employee.username}
                </li>
              ))}
            </ul>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default PresentEmp;
