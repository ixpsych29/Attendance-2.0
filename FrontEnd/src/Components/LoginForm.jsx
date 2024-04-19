// // import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { useContext, useState } from "react";
// import axios from "axios";
// import UserContext from "./UserContext";
// // eslint-disable-next-line no-unused-vars
// import toast, { Toaster } from "react-hot-toast";
// import { IconButton, InputAdornment } from "@mui/material";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import VisibilityIcon from "@mui/icons-material/Visibility";

// function Copyright(props) {
//   return (
//     <Typography
//       variant="body2"
//       color="text.secondary"
//       align="center"
//       {...props}
//     >
//       {"Made with 💖 by "}
//       <Link color="inherit" href="http://sandyapps.co">
//         SandyApps
//       </Link>
//       {" ©️ "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// // TODO remove, this demo shouldn't need to reset the theme.

// export default function LoginForm({ login, role }) {
//   const [showPassword, setShowPassword] = useState(false);

//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const { setUserName, setUserRole, Api_EndPoint } = useContext(UserContext);
//   const navigate = useNavigate();

//   /* *********** Form Validation ************ */
//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {};

//     /* *********** validating email ************ */
//     if (!formData.username) {
//       newErrors.username = "Please enter username";
//       isValid = false;
//     }

//     /* *********** Validating password ************ */
//     if (formData.password.length < 7) {
//       newErrors.password = "Password must be at least 7 characters";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       try {
//         const response = await axios.post(`${Api_EndPoint}/api/users/login`, {
//           username: formData.username,
//           password: formData.password,
//         });
//         // console.log(response.data);

//         //accessing username
//         setUserName(formData.username);
//         login(true);
//         toast.success(response.data.message);
//         role(response.data.role);
//         setUserRole(response.data.role);
//         navigate("/home");
//       } catch (error) {
//         console.log(error);
//         toast.error("Login failed. Please check your credentials.");
//       }
//     } else {
//       console.log("Invalid Form");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   return (
//     <Container component="main" maxWidth="xs" sx={{ color: "text.primary" }}>
//       <CssBaseline />
//       <Box
//         sx={{
//           marginTop: 8,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Avatar sx={{ m: 1, bgcolor: "#fff" }}>
//           <img src="/src/assets/logo.png" width="28px" height="auto" />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Login
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="username"
//             label="User Name"
//             name="username"
//             autoComplete="username"
//             autoFocus
//             value={formData.username}
//             onChange={handleChange}
//             error={Boolean(errors.username)}
//             helperText={errors.username}
//             inputProps={{
//               maxLength: 25, // Limiting to 15 characters
//             }}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="password"
//             label="Password"
//             type={showPassword ? "text" : "password"}
//             id="password"
//             autoComplete="current-password"
//             value={formData.password}
//             onChange={handleChange}
//             error={Boolean(errors.password)}
//             helperText={errors.password}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton
//                     aria-label="toggle password visibility"
//                     onClick={() => setShowPassword(!showPassword)}
//                     edge="end"
//                   >
//                     {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//             inputProps={{
//               maxLength: 20, // Limiting to 15 characters
//             }}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             sx={{
//               mt: 3,
//               mb: 2,
//               bgcolor: "#1db0e6",
//               "&:hover": { bgcolor: "#1b1d72" },
//             }}
//           >
//             LogIn
//           </Button>
//           <Grid container>
//             <Grid item xs>
//               <Link href="#" variant="body2" sx={{ textDecoration: "none" }}>
//                 Forgot password?
//               </Link>
//             </Grid>
//             <Grid item>
//               <Link
//                 component={RouterLink}
//                 to="/signup"
//                 variant="body2"
//                 sx={{ textDecoration: "none" }}
//               >
//                 {"Don't have an account? Sign Up"}
//               </Link>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//       <Copyright sx={{ mt: 8, mb: 4 }} />
//     </Container>
//   );
// }
import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import sidebarlogo from "../assets/Images/sidebarlogo.png";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function LoginForm({ login, role }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const { setUserName, setUserRole, Api_EndPoint } = useContext(UserContext);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Please enter username";
      isValid = false;
    }

    if (formData.password.length < 7) {
      newErrors.password = "Password must be at least 7 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(`${Api_EndPoint}/api/users/login`, {
          username: formData.username,
          password: formData.password,
        });

        setUserName(formData.username);
        login(true);
        role(response.data.role);
        setUserRole(response.data.role);
        navigate("/home");
      } catch (error) {
        console.error("Login failed:", error);
        // Handle login error here
        setErrors({
          username: "Invalid username or password",
          password: "Invalid username or password",
        });
      }
    } else {
      console.log("Invalid Form");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-full lg:w-1/2 login_img_section justify-around items-center bg-gradient-to-r from-sky-600 to-cyan-400 text-white">
        <div className="bg-black opacity-20 inset-0 z-0"></div>
        <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
          <p className="text-9xl text-white mt-1">Attendance</p>
          <img
            className="max-w-48 ml-auto"
            src={sidebarlogo}
            alt="logo"
            // Adjust the height, width, and color as needed
          />
          <p className="text-4xl text-white mt-1">Welcome to Daily TimeSheet</p>
          <div className="flex justify-end  mt-6">
            <a
              href="#"
              className="hover:bg-gradient-to-r from-cyan-400 to-sky-600 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-cyan-700 mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8 mt-10 p-5">
        <div className="w-full px-8 md:px-32 lg:px-24">
          <form
            className="bg-[#DBF3FA] rounded-md shadow-2xl p-5 mb-10"
            onSubmit={handleSubmit}
          >
            <h1 className="text-gray-800 font-bold text-2xl mb-10 flex flex-col justify-center  ">
              Login
            </h1>
            <div className="flex items-center  mb-8 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-black-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
              &nbsp;
              <input
                id="username"
                className={`pl-2 w-full outline-none border border-gray-300 rounded-md py-2 ${
                  errors.username ? "border-red-500" : ""
                }`}
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username}</p>
            )}
            <div className="flex items-center mb-12 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              &nbsp;
              <input
                className={`pl-2 w-full outline-none border border-gray-300 rounded-md py-2 ${
                  errors.password ? "border-red-500" : ""
                }`}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              &nbsp;
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 cursor-pointer"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400 cursor-pointer"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 7a3 3 0 00-3 3v2a3 3 0 003 3h10a3 3 0 003-3v-2a3 3 0 00-3-3"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                className="mx-auto hover:bg-gradient-to-r from-cyan-400 to-sky-600 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-cyan-700 mt-4 px-28 py-2 rounded-2xl font-bold mb-2"
              >
                Login
              </button>
            </div>
            <div className="flex justify-between mt-4">
              <RouterLink
                to="#"
                className="text-sm ml-2 hover:text-cyan-600 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
              >
                Forgot Password?
              </RouterLink>
              <RouterLink
                to="/signup"
                className="text-sm ml-2 hover:text-cyan-600 cursor-pointer hover:-translate-y-1 duration-500 transition-all"
              >
                Don't have an account yet?
              </RouterLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
