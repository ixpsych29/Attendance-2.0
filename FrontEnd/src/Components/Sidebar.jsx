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
import { BiSolidReport } from "react-icons/bi";

import {
  MdCalendarMonth,
  MdManageAccounts,
  MdOutlineWatchLater,
} from "react-icons/md";
import { RiArrowRightSLine } from "react-icons/ri";
import { TbReport, TbReportSearch } from "react-icons/tb";
import Cookies from "js-cookie";

const Sidebar = ({ mode, setMode }) => {
  const { role } = useContext(UserContext);
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [openSubMenu, setOpenSubMenu] = useState(null);

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
    Cookies.remove("authToken");
    login(false);
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  const toggleSubMenu = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  useEffect(() => {
    if (
      ![
        "/home/leave",
        "/home/userleavedashboard",
        "/home/adminleavedashboard",
      ].includes(location.pathname)
    ) {
      setOpenSubMenu(null);
    }
  }, [location]);

  return (
    <div>
      {showSidebar && (
        <aside className="sidebar fixed z-10 top-0 pb-14 px-6 w-full flex flex-col justify-between h-screen border-r transition duration-300 bg-[#19b0e7]">
          <div>
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
                    <div
                      className={`px-4 py-3 flex items-center space-x-4 rounded-md cursor-pointer ${
                        openSubMenu === "employees"
                          ? "btn-style text-white"
                          : "text-white"
                      }`}
                      onClick={() => toggleSubMenu("employees")}
                    >
                      <FaPeopleGroup className="w-6 h-6" />
                      <span className="-mr-1 font-medium">Employees</span>
                      <RiArrowRightSLine
                        className={`text-white ${
                          openSubMenu === "employees" ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                    {openSubMenu === "employees" && (
                      <ul className="space-y-2 tracking-wide">
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
                            <span className="-mr-1 font-medium">
                              Total Employees
                            </span>
                          </Link>
                        </li>
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
                            <span className="-mr-1 font-medium">
                              Create Account
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/home/signupapproval"
                            className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                              isActiveLink("/home/signupapproval")
                                ? "btn-style text-white"
                                : "text-white"
                            }`}
                          >
                            <FaChartBar className="w-6 h-6" />
                            <span className="-mr-1 font-medium">
                              Signup Approval
                            </span>
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li>
                    <div
                      className={`px-4 py-3 flex items-center space-x-4 rounded-md cursor-pointer ${
                        openSubMenu === "reports"
                          ? "btn-style text-white"
                          : "text-white"
                      }`}
                      onClick={() => toggleSubMenu("reports")}
                    >
                      <TbReportSearch className="w-6 h-6" />
                      <span className="-mr-1 font-medium">Reports</span>
                      <RiArrowRightSLine
                        className={`text-white ${
                          openSubMenu === "reports" ? "rotate-90" : ""
                        }`}
                      />
                    </div>
                    {openSubMenu === "reports" && (
                      <ul className="space-y-2 tracking-wide">
                        <li>
                          <Link
                            to="/home/LateComingReport"
                            className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                              isActiveLink("/home/LateComingReport")
                                ? "btn-style text-white"
                                : "text-white"
                            }`}
                          >
                            <MdOutlineWatchLater className="w-6 h-6" />
                            <span className="-mr-1 font-medium">
                              Late Coming
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/home/RemainingLeavesReport"
                            className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                              isActiveLink("/home/RemainingLeavesReport")
                                ? "btn-style text-white"
                                : "text-white"
                            }`}
                          >
                            <MdCalendarMonth className="w-6 h-6" />
                            <span className="-mr-1 font-medium">
                              Leaves Count
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/home/ThreeMonthAttendanceReport"
                            className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                              isActiveLink("/home/ThreeMonthAttendanceReport")
                                ? "btn-style text-white"
                                : "text-white"
                            }`}
                          >
                            <TbReport className="w-6 h-6" />
                            <span className="-mr-1 font-medium">
                              3 Month Report
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/home/MonthlyReportOfOneEmp"
                            className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                              isActiveLink("/home/MonthlyReportOfOneEmp")
                                ? "btn-style text-white"
                                : "text-white"
                            }`}
                          >
                            <BiSolidReport className="w-6 h-6" />
                            <span className="-mr-1 font-medium">
                              Monthly Report
                            </span>
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>

                  {/* New Record List Menu Item */}
                  <li>
                    <Link
                      to="/home/DailyAttendance"
                      className={`px-4 py-3 flex items-center space-x-4 rounded-md ${
                        isActiveLink("/home/DailyAttendance")
                          ? "btn-style text-white"
                          : "text-white"
                      }`}
                    >
                      <FaChartBar className="w-6 h-6" />
                      <span className="-mr-1 font-medium">
                        Daily Attendance
                      </span>
                    </Link>
                  </li>
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
                    openSubMenu === "leaves"
                      ? "btn-style text-white"
                      : "text-white"
                  }`}
                  onClick={() => toggleSubMenu("leaves")}
                >
                  <CiCalendarDate className="w-6 h-6" />
                  <span className="-mr-1 font-medium">Leaves</span>
                  <RiArrowRightSLine
                    className={`text-white ${
                      openSubMenu === "leaves" ? "rotate-90" : ""
                    }`}
                  />
                </div>
                {openSubMenu === "leaves" && (
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
          {/* <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t mb-0.1">
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
          </div> */}
        </aside>
      )}
    </div>
  );
};

export default Sidebar;
