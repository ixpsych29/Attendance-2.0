import { useContext, useState, useEffect } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import toast from "react-hot-toast";
import SelectedProfilePage from "./SelectedProfilePage";
import { useLocation } from "react-router-dom";

export default function EmpProfilePage() {
  const { Api_EndPoint } = useContext(UserContext);
  const location = useLocation();
  const { username } = location.state || {};
  const [user, setUser] = useState(null);

  const getSingleUser = async () => {
    try {
      const response = await axios.get(`${Api_EndPoint}/api/users/${username}`);
      setUser(response.data);
    } catch (err) {
      console.error("Error Fetching Profile Data", err);
      toast.error("Failed to fetch profile. Please try again later.");
    }
  };

  useEffect(() => {
    if (username) {
      getSingleUser();
    }
  }, [username]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    phoneNo: "",
    dob: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        username: user.username || "",
        phoneNo: user.phoneNumber || "",
        dob: user.dob || "",
      });
    }
  }, [user]);

  const [formErrors, setFormErrors] = useState({
    name: false,
    phoneNo: false,
  });

  const handleValueChange = (event) => {
    const { name, value } = event.target;
    const filteredValue =
      name === "name" ? value.replace(/[^A-Za-z\s]/g, "") : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: filteredValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = true;
    }
    if (!formData.phoneNo.trim()) {
      errors.phoneNo = true;
    }
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    try {
      await axios.put(`${Api_EndPoint}/api/users/${username}/update-profile`, {
        phoneNo: formData.phoneNo,
        dob: formData.dob,
      });
      toast.success("Profile Updated");
    } catch (err) {
      console.error("Error Updating Profile Data", err);
      toast.error("Failed to update profile. Please try again later.");
    }
  };

  function formatDate(dateString) {
    if (dateString) {
      return dateString.split("T")[0];
    }
    return "";
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2.5xl mx-auto mt-0">
      <h1 className="text-center text-3xl font-bold mb-20">
        Profile Information
      </h1>
      <div className="flex items-center justify-center">
        <div
          className="flex flex-col lg:flex-row items-center justify-center space-x-4 mb-4 border border-gray-300 p-24 pl-[-5] rounded-md shadow-2xl bg-[#DBF3FA] pr-20"
          style={{ boxShadow: "14px 12px 20px rgba(0, 0, 0, 0.6)" }}>
          <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-black lg:mr-44 pr-10 mb-4 lg:mb-0">
            {user.profilePicture ? (
              <img
                src={`${Api_EndPoint}/uploads/Images/${user.profilePicture}`}
                className="ml-20 mt-2 mb-2"
                alt="Profile Picture"
                style={{ width: 200, height: 200, borderRadius: "50%" }}
              />
            ) : (
              <div
                className="ml-20 mt-2 mb-2 flex items-center justify-center"
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: "50%",
                  backgroundColor: "#ccc",
                  color: "#fff",
                  fontSize: "6rem",
                  fontWeight: "bold",
                }}>
                {user.username.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
          <SelectedProfilePage
            formData={formData}
            formErrors={formErrors}
            handleValueChange={handleValueChange}
            handleSubmit={handleSubmit}
            formatDate={formatDate}
            setFormData={setFormData}
          />
        </div>
      </div>
    </div>
  );
}
