import Dashboard from "./Components/Dashboard";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Attendence from "./Components/Attendence";
import LoginForm from "./Components/LoginForm";
import SignupForm from "./Components/SignupForm";
import { useState, useEffect } from "react";
import Nopage from "./Components/Nopage";
import UserDashboard from "./Components/UserDashboard";
import "./app.css";
import ChangePassword from "./Components/ChangePassword";
import ProfilePage from "./Components/ProfilePage";
import TotalEmployee from "./Components/TotalEmployee";
import LeaveForm from "./Components/LeaveForm";
import AdminLeaveDashboard from "./Components/AdminLeaveDashboard";
import UserLeaveDashboard from "./Components/UserLeaveDashboard";
import SignupApprovals from "./Components/SignupApprovals";
import { useCookies } from "react-cookie";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [cookies, setCookie] = useCookies(["authenticated", "role"]);

  useEffect(() => {
    const storedAuth = cookies["authenticated"];
    const storedRole = cookies["role"];

    if (storedAuth && storedRole) {
      setAuthenticated(storedAuth === "true");
      setRole(storedRole);
    }
  }, [cookies]);

  const login = (auth, userRole) => {
    setAuthenticated(auth);
    setRole(userRole);
    setCookie("authenticated", auth, { path: "/" });
    setCookie("role", userRole, { path: "/" });
  };

  const ProtectedRoute = ({ element, ...rest }) => {
    const isAuthenticated = authenticated;

    return isAuthenticated ? element : <Navigate to="/" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm login={login} />} index />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/*" element={<Nopage />} />
        <Route
          path="/home/"
          element={<ProtectedRoute element={<Home login={login} />} />}>
          {role === "user" && <Route index element={<UserDashboard />} />}
          {role === "admin" && <Route index element={<Dashboard />} />}
          <Route
            path="profile"
            element={<ProtectedRoute element={<ProfilePage />} />}
          />
          <Route
            path="update-password"
            element={<ProtectedRoute element={<ChangePassword />} />}
          />
          <Route
            path="totalemployee"
            element={<ProtectedRoute element={<TotalEmployee />} />}
          />
          {role === "user" && (
            <Route
              path="attendence"
              element={<ProtectedRoute element={<Attendence />} />}
            />
          )}
          {/* Route for LeaveForm */}
          <Route
            path="leave"
            element={<ProtectedRoute element={<LeaveForm />} />}
          />
          {/* Route for LeaveRequest */}
          <Route
            path="adminleavedashboard"
            element={<ProtectedRoute element={<AdminLeaveDashboard />} />}
          />
          {/* Route for User LeaveRequest */}
          <Route
            path="userleavedashboard"
            element={<ProtectedRoute element={<UserLeaveDashboard />} />}
          />
          <Route
            path="signupapproval"
            element={<ProtectedRoute element={<SignupApprovals />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
