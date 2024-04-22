import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import UserContext from "./UserContext";
import { FaHome, FaUserCheck, FaSignOutAlt } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa6";
import { FaCog } from "react-icons/fa";

const Sidebar = ({ mode, setMode }) => {
  const { role } = useContext(UserContext);
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false); // State to track dark mode

  const isActiveLink = (to) => {
    return location.pathname === to;
  };

  const toggleDarkMode = () => {
    // Toggle dark mode state
    setDarkMode(!darkMode);

    // Toggle dark mode class on HTML element
    document.documentElement.classList.toggle("dark");

    // Toggle dark mode class on body element
    document.body.classList.toggle("dark");

    // Toggle dark mode class on sidebar element
    const sidebarElement = document.querySelector(".sidebar");
    if (sidebarElement) {
      sidebarElement.classList.toggle("dark");
    }

    // Update mode state in parent component if needed
    if (mode !== undefined && setMode !== undefined) {
      setMode(darkMode ? "light" : "dark");
    }
  };

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r  transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%] mt-0 bg-[#19B0E7]">
      <div>
        <img
          src="/src/assets/Images/sidebarlogo.png"
          alt="Your Logo"
          style={{ marginTop: "20px" }}
        />
        <div className="h-[2px] bg-white opacity-50 my-4" />
        <div className="mx-6 px-6 py-4 mt-50">
          <Link to="/home" title="home"></Link>
        </div>
        <ul className="space-y-2 tracking-wide ">
          <li>
            <Link
              to="/home"
              aria-label="dashboard"
              className={`relative px-4 py-3 flex items-center space-x-4 rounded-lg text-black ${
                isActiveLink("/home")
                  ? "bg-gradient-to-r from-sky-600 to-cyan-400"
                  : ""
              }`}>
              <FaHome
                className={`w-6 h-6 ${
                  isActiveLink("/home") ? "text-white" : "text-white"
                }`}
              />
              <span
                className={`-mr-1 font-medium ${
                  isActiveLink("/home") ? "text-white" : "text-white"
                }`}>
                Home
              </span>
            </Link>
          </li>
          {role === "user" && (
            <li>
              <Link
                to="/home/attendence"
                className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                  isActiveLink("/home/attendence")
                    ? "bg-gradient-to-r from-sky-600 to-cyan-400 text-white"
                    : " "
                }`}>
                <FaUserCheck
                  className={`w-6 h-6 ${
                    isActiveLink("/home/attendence")
                      ? "text-white"
                      : "text-white "
                  }`}
                />
                <span
                  className={`-mr-1 font-medium ${
                    isActiveLink("/home/attendence")
                      ? "text-white"
                      : "text-white "
                  }`}>
                  Attendance
                </span>
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/home/profile"
              className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                isActiveLink("/home/profile")
                  ? "bg-gradient-to-r from-sky-600 to-cyan-400 text-white"
                  : ""
              }`}>
              <CgProfile
                className={`w-6 h-6 ${
                  isActiveLink("/home/profile") ? "text-white" : "text-white"
                }`}
              />
              <span
                className={`-mr-1 font-medium ${
                  isActiveLink("/home/profile") ? "text-white" : "text-white"
                }`}>
                Profile
              </span>
            </Link>
          </li>

          {/* Settings option */}
          <li>
            <Link
              to="/home/update-password" // Directly provide the path to the ChangePassword component
              className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                isActiveLink("/home/update-password")
                  ? "bg-gradient-to-r from-sky-600 to-cyan-400 text-white"
                  : ""
              }`}>
              <FaCog
                className={`w-6 h-6 ${
                  isActiveLink("/home/update-password")
                    ? "text-white"
                    : "text-white"
                }`}
              />
              <span
                className={`-mr-1 font-medium ${
                  isActiveLink("/home/update-password")
                    ? "text-white"
                    : "text-white"
                }`}>
                Settings
              </span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t mb-0.1 ">
        {/* Dark mode toggle button */}
        <button
          onClick={toggleDarkMode}
          className="px-4 py-3 flex flex-col items-center rounded-md text-white group transition duration-300 ease-in-out transform hover:scale-110">
          {/* Adjust the icon based on dark mode state */}
          {darkMode ? (
            <FaMoon className="w-6 h-6 mb-2 space-x-2" />
          ) : (
            <FaSun className="w-6 h-6 mb-2 space-x-2" />
          )}
          <span>Dark Mode</span>
        </button>

        {/* Logout button */}
        <button className="px-4 py-3 flex flex-col items-center rounded-md text-white group transition duration-300 ease-in-out transform hover:scale-110">
          <Link
            to="/"
            onClick={() => {
              login(false);
            }}>
            <FaSignOutAlt className="w-6 h-6 mb-2 space-x-2" />
            <span>Logout</span>
          </Link>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
