import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {
  Box,
  Container,
  CssBaseline,
  Typography,
  Divider,
} from "@mui/material";
import UserContext from "./UserContext";
import TotalEmployeeRecord from "./TotalEmployeeRecord"; // Assuming you have this component
import Loader from "../Loader/Loader";

const PresentEmp = () => {
  const { Api_EndPoint } = useContext(UserContext);

  const [presentEmployees, setPresentEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPresentEmployees = async () => {
    try {
      const response = await axios.get(
        `${Api_EndPoint}/api/attendance/present-users`
      );
      console.log("Present Employees Response: ", response.data); // Log for debugging
      setPresentEmployees(response.data || []); // Ensure response.data is an array
    } catch (error) {
      console.error("Error fetching present employees:", error);
      setPresentEmployees([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPresentEmployees();
  }, []);

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
            Present Employeess
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
            <TotalEmployeeRecord users={presentEmployees} />
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default PresentEmp;
