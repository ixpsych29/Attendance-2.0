// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import {
//   Box,
//   Container,
//   CssBaseline,
//   Typography,
//   Divider,
// } from "@mui/material";
// import UserContext from "./UserContext";
// import Loader from "../Loader/Loader";

// const PresentEmp = () => {
//   const { Api_EndPoint } = useContext(UserContext);

//   const [presentEmployees, setPresentEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchPresentEmployees = async () => {
//     try {
//       const response = await axios.get(
//         `${Api_EndPoint}/api/attendance/present-users`
//       );
//       console.log("Present Employees Response: ", response.data); // Debug log
//       setPresentEmployees(response.data || []); // Ensure response.data is an array
//     } catch (error) {
//       console.error("Error fetching present employees:", error);
//       setPresentEmployees([]); // Set empty array on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPresentEmployees();
//   }, [Api_EndPoint]);

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <Box paddingTop={2} paddingLeft={0}>
//       <CssBaseline />
//       <Container>
//         <Box
//           bgcolor="#DBF3FA"
//           paddingBottom={10}
//           paddingTop={5}
//           boxShadow={3}
//           mb={4}
//         >
//           <Typography
//             variant="h4"
//             component="h2"
//             gutterBottom
//             textAlign="center"
//             sx={{ mb: 3, color: "text.primary" }}
//           >
//             Present Employees
//           </Typography>
//           <Divider
//             variant="middle"
//             sx={{
//               mt: 7,
//               mb: 7,
//               borderColor: "primary.main",
//               borderWidth: 2,
//             }}
//           />
//           {presentEmployees.length === 0 ? (
//             <Typography variant="h6" textAlign="center">
//               No employees are present
//             </Typography>
//           ) : (
//             // Assuming you have a component to display employee records
//             // Ensure this component is correctly imported and functional
//             <TotalEmployeeRecord users={presentEmployees} />
//           )}
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default PresentEmp;

// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import {
//   Box,
//   Container,
//   CssBaseline,
//   Typography,
//   Divider,
// } from "@mui/material";
// import UserContext from "./UserContext";
// import TotalEmployeeRecord from "./TotalEmployeeRecord"; // Assuming you have this component
// import Loader from "../Loader/Loader";

// const PresentEmp = () => {
//   const { Api_EndPoint } = useContext(UserContext);

//   const [presentEmployees, setPresentEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchPresentEmployees = async () => {
//     try {
//       const response = await axios.get(
//         `${Api_EndPoint}/api/attendance/present-users`
//       );
//       console.log("Present Employees Response: ", response.data); // Log for debugging
//       setPresentEmployees(response.data || []); // Ensure response.data is an array
//     } catch (error) {
//       console.error("Error fetching present employees:", error);
//       setPresentEmployees([]); // Set empty array on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPresentEmployees();
//   }, [Api_EndPoint]);

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <Box paddingTop={2} paddingLeft={0}>
//       <CssBaseline />
//       <Container>
//         <Box
//           bgcolor="#DBF3FA"
//           paddingBottom={10}
//           paddingTop={5}
//           boxShadow={3}
//           mb={4}
//         >
//           <Typography
//             variant="h4"
//             component="h2"
//             gutterBottom
//             textAlign="center"
//             sx={{ mb: 3, color: "text.primary" }}
//           >
//             Present Employees
//           </Typography>
//           <Divider
//             variant="middle"
//             sx={{
//               mt: 7,
//               mb: 7,
//               borderColor: "primary.main",
//               borderWidth: 2,
//             }}
//           />
//           <Box>
//             {presentEmployees.length === 0 ? (
//               <Typography variant="h6" textAlign="center">
//                 No employees are present
//               </Typography>
//             ) : (
//               <TotalEmployeeRecord users={presentEmployees} />
//             )}
//           </Box>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default PresentEmp;

// import React, { useState, useEffect, useContext } from "react";
// import axios from "axios";
// import {
//   Box,
//   Container,
//   CssBaseline,
//   Typography,
//   Divider,
// } from "@mui/material";
// import UserContext from "./UserContext";
// import TotalEmployeeRecord from "./TotalEmployeeRecord"; // Assuming you have this component
// import Loader from "../Loader/Loader";

// const PresentEmp = () => {
//   const { Api_EndPoint } = useContext(UserContext);

//   const [presentEmployees, setPresentEmployees] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchPresentEmployees = async () => {
//     try {
//       // Adjust the API call to match the backend endpoint
//       const response = await axios.get(
//         `${Api_EndPoint}/api/attendance/present-users`,
//         {
//           params: { entranceTime: new Date().toISOString().split("T")[0] }, // Adjust the entranceTime parameter as needed
//         }
//       );
//       console.log("Present Employees Response: ", response.data); // Log for debugging
//       setPresentEmployees(response.data || []); // Ensure response.data is an array
//     } catch (error) {
//       console.error("Error fetching present employees:", error);
//       setPresentEmployees([]); // Set empty array on error
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPresentEmployees();
//   }, [Api_EndPoint]);

//   if (loading) {
//     return <Loader />;
//   }

//   return (
//     <Box paddingTop={2} paddingLeft={0}>
//       <CssBaseline />
//       <Container>
//         <Box
//           bgcolor="#DBF3FA"
//           paddingBottom={10}
//           paddingTop={5}
//           boxShadow={3}
//           mb={4}
//         >
//           <Typography
//             variant="h4"
//             component="h2"
//             gutterBottom
//             textAlign="center"
//             sx={{ mb: 3, color: "text.primary" }}
//           >
//             Present Employees
//           </Typography>
//           <Divider
//             variant="middle"
//             sx={{
//               mt: 7,
//               mb: 7,
//               borderColor: "primary.main",
//               borderWidth: 2,
//             }}
//           />
//           <Box>
//             {presentEmployees.length === 0 ? (
//               <Typography variant="h6" textAlign="center">
//                 No employees are present
//               </Typography>
//             ) : (
//               <TotalEmployeeRecord users={presentEmployees} />
//             )}
//           </Box>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default PresentEmp;

// PresentEmp.js

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
        `${Api_EndPoint}/api/attendance/present-users`
      ); // Correct endpoint
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
