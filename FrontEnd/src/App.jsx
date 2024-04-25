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

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  // eslint-disable-next-line no-unused-vars
  const ProtectedRoute = ({ element, ...rest }) => {
    const isAuthenticated = authenticated;

    return isAuthenticated ? (
      // If authenticated, render the provided element
      element
    ) : (
      // If not authenticated, redirect to the login page
      <Navigate to="/" replace />
    );
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LoginForm login={setAuthenticated} role={setRole} />}
          index
        />
        <Route path="/signup" element={<SignupForm />} index />
        <Route path="/*" element={<Nopage />} index />
        <Route
          path="/home/"
          element={
            <ProtectedRoute element={<Home login={setAuthenticated} />} />
          }
        >
          {/* Conditionally render dashboards based on role */}
          {role === "user" && <Route index element={<UserDashboard />} />}
          {role === "admin" && <Route index element={<Dashboard />} />}
          <Route
            path="profile"
            element={<ProtectedRoute element={<ProfilePage />} />}
          ></Route>
          <Route
            path="update-password"
            element={<ProtectedRoute element={<ChangePassword />} />}
          ></Route>

          {role === "user" && (
            <Route
              path="attendence"
              element={<ProtectedRoute element={<Attendence />} />}
            />
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
