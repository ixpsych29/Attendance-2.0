import Dashboard from "./Components/Dashboard";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Attendence from "./Components/Attendence";
import LoginForm from "./Components/LoginForm";
import SignupForm from "./Components/SignupForm";
import { useState } from "react";
import Nopage from "./Components/Nopage";
import UserDashboard from "./Components/UserDashboard";
import "./app.css";
import ChangePassword from "./Components/ChangePassword";
import ProfilePage from "./Components/ProfilePage";
import TotalEmployee from "./Components/TotalEmployee";
import LeaveForm from "./Components/LeaveForm"; // Import the LeaveForm component
import AdminLeaveDashboard from "./Components/AdminLeaveDashboard";
import UserLeaveDashboard from "./Components/UserLeaveDashboard";
import SignupApprovals from "./Components/SignupApprovals";
import EmpProfilePage from "./Components/EmpProfilePage";

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  const ProtectedRoute = ({ element, ...rest }) => {
    const isAuthenticated = authenticated;

    return isAuthenticated ? element : <Navigate to="/" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginForm login={setAuthenticated} role={setRole} />}
          index
        />
        {/* <Route path="/signup" element={<SignupForm />} /> */}
        <Route path="update-password" element={<ChangePassword />} />
        <Route path="/*" element={<Nopage />} />
        <Route
          path="/home/"
          element={
            <ProtectedRoute element={<Home login={setAuthenticated} />} />
          }
        >
          {role === "user" && <Route index element={<UserDashboard />} />}
          {role === "admin" && <Route index element={<Dashboard />} />}
          {role === "admin" && (
            <Route
              path="signup"
              element={<ProtectedRoute element={<SignupForm />} />}
            />
          )}
          <Route
            path="profile"
            element={<ProtectedRoute element={<ProfilePage />} />}
          />
          <Route
            path="empprofile"
            element={<ProtectedRoute element={<EmpProfilePage />} />}
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
