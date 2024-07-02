import { Link, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import UserContext from "./UserContext";
import {
  FaHome,
  FaUserCheck,
  FaSignOutAlt,
  FaMoon,
  FaSun,
  FaCog,
  FaChartBar,
  FaPenSquare,
} from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { FaPeopleGroup } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { MdManageAccounts } from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import Cookies from "js-cookie";

const Sidebar = ({ mode, setMode }) => {
  const { role } = useContext(UserContext);
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showLeavesSubMenu, setShowLeavesSubMenu] = useState(false);

  const isAdmin = role === "admin";
  const isUser = role === "user";

  const isActiveLink = (to) => location.pathname === to;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
    document.body.classList.toggle("dark");
    const sidebarElement = document.querySelector(".sidebar");
    if (sidebarElement) {
      sidebarElement.classList.toggle("dark");
    }
    if (mode !== undefined && setMode !== undefined) {
      setMode(darkMode ? "light" : "dark");
    }
  };

  const logout = () => {
    // Clear the cookie named 'yourCookieName'
    Cookies.remove("authToken");
    // Perform any additional logout logic
    login(false);
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const toggleLeavesSubMenu = () => setShowLeavesSubMenu(!showLeavesSubMenu);

  useEffect(() => {
    if (
      ![
        "/home/leave",
        "/home/userleavedashboard",
        "/home/adminleavedashboard",
      ].includes(location.pathname)
    ) {
      setShowLeavesSubMenu(false);
    }
  }, [location]);

  return (
    <div>
      {/* {showSidebar ? (
        <RiArrowLeftDoubleLine
          onClick={toggleSidebar}
          className="fixed z-50 ml-72 mt-80 text-[#19B0E7] text-3xl focus:outline-none transform cursor-pointer"
          title="Close Sidebar"
        />
      ) : (
        <RiArrowLeftDoubleLine
          onClick={toggleSidebar}
          className="fixed z-50 ml-2 mt-80 rotate-180 text-[#19B0E7] text-3xl focus:outline-none transform cursor-pointer"
          title="Open Sidebar"
        />
      )} */}
      {showSidebar && (
        <aside className="sidebar fixed z-10 top-0 pb-14 px-6 w-full flex flex-col justify-between h-screen border-r transition duration-300  bg-[#19b0e7]">
          <div>
            {/* <img
              src="/src/assets/Images/sidebarlogo.png"
              alt="Your Logo"
              style={{ marginTop: "20px" }}
            /> */}
            <div className="h-[2px] bg-white opacity-50 my-2" />
            <ul className="space-y-2 tracking-wide">
              <li>
                <Link
                  to="/home"
                  className={`relative px-4 py-3 flex items-center space-x-4 rounded-lg text-black ${
                    isActiveLink("/home")
                      ? "btn-style text-white"
                      : "text-white"
                  }`}
                >
                  <FaHome className="w-6 h-6" />
                  <span className="-mr-1 font-medium">Home</span>
                </Link>
              </li>
              {isUser && (
                <li>
                  <Link
                    to="/home/attendence"
                    className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                      isActiveLink("/home/attendence")
                        ? "btn-style text-white"
                        : "text-white"
                    }`}
                  >
                    <FaUserCheck className="w-6 h-6" />
                    <span className="-mr-1 font-medium">Attendance</span>
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/home/profile"
                  className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                    isActiveLink("/home/profile")
                      ? "btn-style text-white"
                      : "text-white"
                  }`}
                >
                  <CgProfile className="w-6 h-6" />
                  <span className="-mr-1 font-medium">Profile</span>
                </Link>
              </li>
              {isAdmin && (
                <>
                  <li>
                    <Link
                      to="/home/signup"
                      className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                        isActiveLink("/home/signup")
                          ? "btn-style text-white"
                          : "text-white"
                      }`}
                    >
                      <MdManageAccounts className="w-6 h-6" />
                      <span className="-mr-1 font-medium">Create Account</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/home/totalemployee"
                      className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                        isActiveLink("/home/totalemployee")
                          ? "btn-style text-white"
                          : "text-white"
                      }`}
                    >
                      <FaPeopleGroup className="w-6 h-6" />
                      <span className="-mr-1 font-medium">Employees</span>
                    </Link>
                    <Link
                      to="/home/totalemployee"
                      className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                        isActiveLink("/home/totalemployee")
                          ? "btn-style text-white"
                          : "text-white"
                      }`}
                    >
                      <TbReportSearch className="w-6 h-6" />
                      <span className="-mr-1 font-medium">Reports</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/home/reports"
                      className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                        isActiveLink("/home/reports")
                          ? "btn-style text-white"
                          : "text-white"
                      }`}
                    >
                      <FaPeopleGroup className="w-6 h-6" />
                      <span className="-mr-1 font-medium">Reports</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/home/reports"
                      className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                        isActiveLink("/home/reports")
                          ? "btn-style text-white"
                          : "text-white"
                      }`}
                    >
                      <FaPeopleGroup className="w-6 h-6" />
                      <span className="-mr-1 font-medium">Reports</span>
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      to="/home/signupapproval"
                      className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                        isActiveLink("/home/signupapproval")
                          ? "btn-style text-white"
                          : "text-white"
                      }`}>
                      <FaChartBar className="w-6 h-6" />
                      <span className="-mr-1 font-medium">Signup Approval</span>
                    </Link>
                  </li> */}
                </>
              )}
              <li>
                <Link
                  to="/home/update-password"
                  className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                    isActiveLink("/home/update-password")
                      ? "btn-style text-white"
                      : "text-white"
                  }`}
                >
                  <FaCog className="w-6 h-6" />
                  <span className="-mr-1 font-medium">Settings</span>
                </Link>
              </li>
              <li>
                <div
                  className={`px-4 py-3 flex items-center space-x-4 rounded-md cursor-pointer ${
                    showLeavesSubMenu ? "btn-style text-white" : "text-white"
                  }`}
                  onClick={toggleLeavesSubMenu}
                >
                  <CiCalendarDate className="w-6 h-6" />
                  <span className="-mr-1 font-medium">Leaves</span>
                  <RiArrowRightSLine
                    className={`text-white ${
                      showLeavesSubMenu ? "rotate-90" : ""
                    }`}
                  />
                </div>
                {showLeavesSubMenu && (
                  <ul className="space-y-2 tracking-wide">
                    <li>
                      <Link
                        to="/home/leave"
                        className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                          isActiveLink("/home/leave")
                            ? "btn-style text-white"
                            : "text-white"
                        }`}
                      >
                        <FaPenSquare className="w-6 h-6" />
                        <span className="-mr-1 font-medium">Leave Form</span>
                      </Link>
                    </li>
                    {isUser && (
                      <li>
                        <Link
                          to="/home/userleavedashboard"
                          className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                            isActiveLink("/home/userleavedashboard")
                              ? "btn-style text-white"
                              : "text-white"
                          }`}
                        >
                          <FaChartBar className="w-6 h-6" />
                          <span className="-mr-1 font-medium">
                            Leave Request
                          </span>
                        </Link>
                      </li>
                    )}
                    {isAdmin && (
                      <li>
                        <Link
                          to="/home/adminleavedashboard"
                          className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                            isActiveLink("/home/adminleavedashboard")
                              ? "btn-style text-white"
                              : "text-white"
                          }`}
                        >
                          <FaChartBar className="w-6 h-6" />
                          <span className="-mr-1 font-medium">
                            Leave Request
                          </span>
                        </Link>
                      </li>
                    )}
                  </ul>
                )}
              </li>
            </ul>
          </div>
          <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t mb-0.1">
            <button
              onClick={toggleDarkMode}
              className="px-4 py-3 flex flex-col items-center rounded-md text-white group transition duration-300 ease-in-out transform hover:scale-110"
            >
              {darkMode ? (
                <FaMoon className="w-6 h-6 mb-2 space-x-2" />
              ) : (
                <FaSun className="w-6 h-6 mb-2 space-x-2" />
              )}
              <span>Dark Mode</span>
            </button>
            <button className="px-4 py-3 flex flex-col items-center rounded-md text-white group transition duration-300 ease-in-out transform hover:scale-110">
              <Link to="/" onClick={logout}>
                <FaSignOutAlt className="w-6 h-6 mb-2 space-x-2" />
                <span>Logout</span>
              </Link>
            </button>
          </div>
        </aside>
      )}
    </div>
  );
};

export default Sidebar;
