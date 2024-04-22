// --------ORIGINAL CODE----------

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
// import { IconButton, InputAdornment } from "@mui/material";
// import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import toast from "react-hot-toast";
// import UserContext from "./UserContext";

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

// export default function SignupForm() {
//   const { Api_EndPoint } = useContext(UserContext);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     userName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState({});

//   const handleChanges = (event) => {
//     setFormData({ ...formData, [event.target.name]: event.target.value });
//   };

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {};

//     // Validate email
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const passwordRegex =
//       /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=-{}|:;\\'\\",<.>/?\\`~]).{8,}$/;

//     if (!formData.name) {
//       newErrors.name = "Enter Name";
//       isValid = false;
//     }
//     if (!formData.userName) {
//       newErrors.name = "Enter a unique user Name";
//       isValid = false;
//     }
//     if (!formData.email || !emailRegex.test(formData.email)) {
//       newErrors.email = "Enter a valid email address";
//       isValid = false;
//     }

//     // Validate password
//     if (
//       formData.password.length < 7 ||
//       formData.password.length > 15 ||
//       !passwordRegex.test(formData.password)
//     ) {
//       newErrors.password = "Enter a valid password between 7 and 15 letters";
//       toast.error(
//         "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
//       );
//       isValid = false;
//     }

//     // Validate confirm password
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//       isValid = false;
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (validateForm()) {
//       try {
//         // Check if the username already exists
//         const usernameExists = await axios.get(
//           `${Api_EndPoint}/api/users/exists/${formData.userName}`
//         );
//         if (usernameExists.data.exists) {
//           // Username already exists, display an error
//           toast.error(
//             "Username already exists. Please choose a different username."
//           );
//           return;
//         }
//         const apiEndpoint = "/api/users";
//         await axios.post(`${Api_EndPoint}${apiEndpoint}`, {
//           name: formData.name,
//           username: formData.userName,
//           email: formData.email,
//           password: formData.password,
//         });
//         toast.success("Registered Successfully");
//         navigate("/");
//         // Optionally, you can redirect the user or perform other actions after successful registration
//       } catch (error) {
//         // Handle errors from the server
//         console.error("Error registering user:", error);
//       }
//     } else {
//       // Form is not valid, handle accordingly
//       toast.error("Form is not valid");
//     }
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
//         <Avatar sx={{ m: 1, bgcolor: "white" }}>
//           <img src="/src/assets/logo.png" width="28px" height="auto" />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Sign Up
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="name"
//             label="Name"
//             name="name"
//             autoComplete="text"
//             autoFocus
//             error={errors.name}
//             value={formData.name}
//             onChange={handleChanges}
//             inputProps={{
//               maxLength: 30, // Limiting to 30 characters
//             }}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="userName"
//             label="User Name"
//             name="userName"
//             autoComplete="text"
//             error={errors.userName}
//             value={formData.userName}
//             onChange={handleChanges}
//             inputProps={{
//               maxLength: 25, // Limiting to 25 characters
//             }}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email Address"
//             name="email"
//             autoComplete="email"
//             value={formData.email}
//             onChange={handleChanges}
//             error={!!errors.email}
//             helperText={errors.email}
//             inputProps={{
//               maxLength: 35, // Limiting to 35 characters
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
//             onChange={handleChanges}
//             error={errors.password}
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
//               maxLength: 20, // Limiting to 20 characters
//             }}
//           />
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             name="confirmPassword"
//             label="Confirm-Password"
//             type={showPassword ? "text" : "password"}
//             id="confirmPassword"
//             autoComplete="confirm-password"
//             value={formData.confirmPassword}
//             onChange={handleChanges}
//             error={!!errors.confirmPassword}
//             helperText={errors.confirmPassword}
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
//               maxLength: 20, // Limiting to 20 characters
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
//             Sign up
//           </Button>
//           <Grid container justifyContent="flex-end">
//             <Grid item></Grid>
//             <Grid item>
//               <Link component={RouterLink} to="/" variant="body2">
//                 {"Already have an account? login"}
//               </Link>
//             </Grid>
//           </Grid>
//         </Box>
//       </Box>
//       <Copyright sx={{ mt: 8, mb: 4 }} />
//     </Container>
//   );
// }

// -------TESTING CODE--------------//
import { useState, useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import sidebarlogo from "../assets/Images/sidebarlogo.png";
import axios from "axios";
import toast from "react-hot-toast";
import UserContext from "./UserContext";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const { Api_EndPoint } = useContext(UserContext);
  const navigate = useNavigate();

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name) {
      newErrors.name = "Please enter a name";
      isValid = false;
    }
    if (!formData.userName) {
      newErrors.userName = "Please enter a unique username";
      isValid = false;
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    if (
      formData.password.length < 7 ||
      formData.password.length > 15 ||
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+=\-{}|:;\\'\\",<.>/?\\`~]).{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Please enter a valid password between 7 and 15 characters";
      isValid = false;
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const usernameExists = await axios.get(
          `${Api_EndPoint}/api/users/exists/${formData.userName}`
        );
        if (usernameExists.data.exists) {
          toast.error(
            "Username already exists. Please choose a different username."
          );
          return;
        }
        const apiEndpoint = "/api/users";
        await axios.post(`${Api_EndPoint}${apiEndpoint}`, {
          name: formData.name,
          username: formData.userName,
          email: formData.email,
          password: formData.password,
        });
        toast.success("Registered Successfully");
        navigate("/");
      } catch (error) {
        console.error("Error registering user:", error);
      }
    } else {
      toast.error("Form is not valid");
    }
  };

  const handleChanges = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-full lg:w-1/2 login_img_section justify-around items-center bg-gradient-to-r from-sky-600 to-cyan-400 text-white">
        <div className="bg-black opacity-20 inset-0 z-0"></div>
        <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
          <p className="text-9xl text-white mt-1">Attendance</p>
          <img className="max-w-48 ml-auto" src={sidebarlogo} alt="logo" />
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
              Signup
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
                id="name"
                className={`pl-2 w-full outline-none border border-gray-300 rounded-md py-2 ${
                  errors.name ? "border-red-500" : ""
                }`}
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChanges}
                maxLength="30"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name}</p>
            )}
            <div className="flex items-center mb-8 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-black-400"
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
                id="userName"
                className={`pl-2 w-full outline-none border border-gray-300 rounded-md py-2 ${
                  errors.userName ? "border-red-500" : ""
                }`}
                type="text"
                name="userName"
                placeholder="User Name"
                value={formData.userName}
                onChange={handleChanges}
                maxLength="25"
              />
            </div>
            {errors.userName && (
              <p className="text-red-500 text-xs">{errors.userName}</p>
            )}
            <div className="flex items-center mb-8 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-black-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M2 5a2 2 0 012-2h12a2 2 0 012 2v5a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2-2a1 1 0 00-1 1v5a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H4z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M8 11a1 1 0 100-2 1 1 0 000 2zM4 15a1 1 0 100-2 1 1 0 000 2zM16 15a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              &nbsp;
              <input
                id="email"
                className={`pl-2 w-full outline-none border border-gray-300 rounded-md py-2 ${
                  errors.email ? "border-red-500" : ""
                }`}
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChanges}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
            <div className="flex items-center mb-8 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-black-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm4-2a1 1 0 00-1-1h2a1 1 0 000-2H6a1 1 0 00-1 1v2zM5 16a1 1 0 100-2h10a1 1 0 100 2H5z"
                  clipRule="evenodd"
                />
              </svg>
              &nbsp;
              <input
                id="password"
                className={`pl-2 w-full outline-none border border-gray-300 rounded-md py-2 ${
                  errors.password ? "border-red-500" : ""
                }`}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChanges}
              />
              <button
                type="button"
                className="focus:outline-none ml-auto"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-black-400 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.071 12.543C17.23 14.859 14.311 16 12 16c-1.243 0-2.478-.282-3.623-.834m-1.426-.852C6.718 14.16 5.031 13 3 13c-1.419 0-2.604.737-3 1.776m3.966-7.327c1.662-1.907 3.887-3.16 6.334-3.522M21 12c-.276 0-.526-.112-.707-.293-.267-.267-.267-.701 0-.968C21.474 10.112 22 9.075 22 8c0-2.21-3.581-4-8-4s-8 1.79-8 4c0 1.075.526 2.112 1.707 2.739.267.267.267.701 0 .968-.267.267-.701.267-.968 0C2.526 12.112 2 11.075 2 10c0-3.158 5.373-6 10-6s10 2.842 10 6c0 1.075-.526 2.112-1.707 2.739-.267.267-.267.701 0 .968.181.181.431.293.707.293z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-black-400 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
            <div className="flex items-center mb-8 py-2 px-3 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-black-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3 8a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm4-2a1 1 0 00-1-1h2a1 1 0 000-2H6a1 1 0 00-1 1v2zM5 16a1 1 0 100-2h10a1 1 0 100 2H5z"
                  clipRule="evenodd"
                />
              </svg>
              &nbsp;
              <input
                id="confirmPassword"
                className={`pl-2 w-full outline-none border border-gray-300 rounded-md py-2 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChanges}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
            )}
            <div className="flex justify-between items-center mb-8">
              <button
                type="submit"
                className="focus:outline-none bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-2 px-8 rounded-2xl"
              >
                Register
              </button>
              <RouterLink
                to="/"
                className="text-sm text-gray-600 hover:underline"
              >
                Already have an account? Login
              </RouterLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
