// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import UserContext from "./UserContext";
// import sidebarlogo from "../assets/Images/sidebarlogo.png";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast"; // Import toast for displaying notifications

// export default function LoginForm({ login, role }) {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({ username: "", password: "" });
//   const [errors, setErrors] = useState({});
//   const { setUserName, setUserRole, Api_EndPoint } = useContext(UserContext);
//   const navigate = useNavigate();

//   const validateForm = () => {
//     let isValid = true;
//     const newErrors = {};

//     if (!formData.username) {
//       newErrors.username = "Please enter username";
//       isValid = false;
//     }

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

//         console.log(response);
//         // Store JWT token in a cookie
//         const token = response.data.token;
//         document.cookie = `authToken=${token}; max-age=${60 * 60}; path=/`;

//         setUserName(formData.username);
//         login(true);
//         role(response.data.role);
//         setUserRole(response.data.role);
//         navigate("/home");
//       } catch (error) {
//         if (error.response.data.userStatus === "disapproved") {
//           toast.error(
//             "Your account is currently on hold. Please contact support for further assistance."
//           );
//         } else {
//           setErrors({
//             username: "Invalid username or password",
//             password: "Invalid username or password",
//           });
//         }
//       }
//     } else {
//       console.log("Invalid Form");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const logoutUser = () => {
//     // Clear JWT token from cookie
//     document.cookie = "authToken=; max-age=0; path=/";

//     // Update logged-in state to false
//     login(false);
//     // Additional logic to clear user data or redirect to login page if needed
//   };

//   useEffect(() => {
//     const token = document.cookie.replace(
//       /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
//       "$1"
//     );

//     if (!token) {
//       // Token does not exist, log out the user
//       logoutUser();
//     } else {
//       // Token exists, set user as logged in
//       // You can also validate the token here if needed
//       login(true);
//     }
//   }, []);

//   return (
//     <div className="min-h-screen flex flex-col lg:flex-row">
//       <div className="w-full lg:w-1/2 login_img_section justify-around items-center bg-gradient-to-r from-sky-600 to-cyan-400 text-white p-4 lg:p-0 hidden lg:flex">
//         <div className="bg-black opacity-20 inset-0 z-0"></div>
//         <div className="w-full mx-auto px-4 lg:px-20 flex-col items-center space-y-6">
//           <p className="text-8xl lg:text-7xl 3xl:text-6xl 2xl:text-8xl text-white mt-1">
//             Attendance
//           </p>
//           <img className="max-w-48 ml-auto" src={sidebarlogo} alt="logo" />
//           <p className="text-2xl lg:text-4xl text-white mt-1">
//             Welcome to Daily TimeSheet
//           </p>
//         </div>
//       </div>
//       <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8 p-4 lg:p-0 lg:mt-10">
//         <div className="w-full px-4 md:px-32 lg:px-24">
//           <form
//             className="bg-[#DBF3FA] rounded-md shadow-2xl p-5 mb-10"
//             onSubmit={handleSubmit}
//           >
//             <h1 className="text-gray-800 font-bold text-2xl mb-10 flex flex-col justify-center  ">
//               Login
//             </h1>
//             <div className="flex items-center mb-8 py-2 px-3 rounded-2xl">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 text-black-400"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
//                 />
//               </svg>
//               &nbsp;
//               <input
//                 id="username"
//                 className={`pl-2 w-full outline-none border border-gray-300 rounded-md py-2 ${
//                   errors.username ? "border-red-500" : ""
//                 }`}
//                 type="text"
//                 name="username"
//                 placeholder="Username"
//                 value={formData.username}
//                 onChange={handleChange}
//               />
//             </div>
//             {errors.username && (
//               <p className="text-red-500 text-xs">{errors.username}</p>
//             )}
//             <div className="flex items-center mb-12 py-2 px-3 rounded-2xl">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 text-gray-400"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               &nbsp;
//               <input
//                 className={`pl-2 w-full outline-none border border-gray-300 rounded-md py-2 ${
//                   errors.password ? "border-red-500" : ""
//                 }`}
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 id="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//               />
//               &nbsp;
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//               >
//                 {showPassword ? (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 text-gray-400 cursor-pointer"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 ) : (
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5 text-gray-400 cursor-pointer"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth="2"
//                       d="M7 7a3 3 0 00-3 3v2a3 3 0 003 3h10a3 3 0 003-3v-2a3 3 0 00-3-3"
//                     />
//                   </svg>
//                 )}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="text-red-500 text-xs">{errors.password}</p>
//             )}
//             <div className="flex justify-center">
//               <button
//                 type="submit"
//                 className="mx-auto hover:bg-gradient-to-r from-cyan-400 to-sky-600 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-cyan-700 mt-4 px-28 py-2 rounded-2xl font-bold mb-2"
//               >
//                 Login
//               </button>
//             </div>
//             <div className="flex flex-col sm:flex-row justify-between mt-4">
//               <RouterLink
//                 to="/ForgetPassword"
//                 className="text-sm ml-2 hover:text-cyan-600 cursor-pointer hover:-translate-y-1 duration-500 transition-all "
//                 title="Available Soon"
//               >
//                 Forgot Password?
//               </RouterLink>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import sidebarlogo from "../assets/Images/sidebarlogo.png";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function LoginForm({ login, role }) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const { setUserName, setUserRole, Api_EndPoint } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
      const parsedData = JSON.parse(rememberedUser);
      setFormData({
        ...formData,
        username: parsedData.username,
        password: parsedData.password,
        rememberMe: true,
      });
    }
  }, []);

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

        console.log(response);
        const token = response.data.token;
        document.cookie = `authToken=${token}; max-age=${60 * 60}; path=/`;

        setUserName(formData.username);
        login(true);
        role(response.data.role);
        setUserRole(response.data.role);

        if (formData.rememberMe) {
          localStorage.setItem(
            "rememberedUser",
            JSON.stringify({
              username: formData.username,
              password: formData.password,
            })
          );
        } else {
          localStorage.removeItem("rememberedUser");
        }

        navigate("/home");
      } catch (error) {
        if (
          error.response &&
          error.response.data.userStatus === "disapproved"
        ) {
          toast.error(
            "Your account is currently on hold. Please contact support for further assistance."
          );
        } else {
          setErrors({
            username: "Invalid username or password",
            password: "Invalid username or password",
          });
        }
      }
    } else {
      console.log("Invalid Form");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const logoutUser = () => {
    document.cookie = "authToken=; max-age=0; path=/";
    login(false);
  };

  useEffect(() => {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)authToken\s*=\s*([^;]*).*$)|^.*$/,
      "$1"
    );

    if (!token) {
      logoutUser();
    } else {
      login(true);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/2 login_img_section justify-around items-center bg-gradient-to-r from-sky-600 to-cyan-400 text-white p-4 lg:p-0 hidden lg:flex">
        <div className="bg-black opacity-20 inset-0 z-0"></div>
        <div className="w-full mx-auto px-4 lg:px-20 flex-col items-center space-y-6">
          <p className="text-8xl lg:text-7xl 3xl:text-6xl 2xl:text-8xl text-white mt-1">
            Attendance
          </p>
          <img className="max-w-48 ml-auto" src={sidebarlogo} alt="logo" />
          <p className="text-2xl lg:text-4xl text-white mt-1">
            Welcome to Daily TimeSheet
          </p>
        </div>
      </div>
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8 p-4 lg:p-0 lg:mt-10">
        <div className="w-full px-4 md:px-32 lg:px-24">
          <form
            className="bg-[#DBF3FA] rounded-md shadow-2xl p-5 mb-10"
            onSubmit={handleSubmit}
          >
            <h1 className="text-gray-800 font-bold text-2xl mb-10 flex flex-col justify-center">
              Login
            </h1>
            <div className="flex items-center mb-8 py-2 px-3 rounded-2xl">
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
            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-gray-800 text-sm">
                Remember Me
              </label>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="mx-auto hover:bg-gradient-to-r from-cyan-400 to-sky-600 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-cyan-700 mt-4 px-28 py-2 rounded-2xl font-bold mb-2"
              >
                Login
              </button>
            </div>
            <div className="flex flex-col sm:flex-row justify-between mt-4">
              <RouterLink
                to="/ForgetPassword"
                className="text-sm ml-2 hover:text-cyan-600 cursor-pointer hover:-translate-y-1 duration-500 transition-all "
                title="Available Soon"
              >
                Forgot Password?
              </RouterLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
