import { useContext, useState } from "react";
import UserContext from "./UserContext";
import ProfilePictureUpload from "./ProfilePictureUpload";
import axios from "axios";
import toast from "react-hot-toast";
import SelectedProfilePage from "./SelectedProfilePage";

export default function ProfilePage() {
  const { nameUser, username, Api_EndPoint, email, phNumber, dob } =
    useContext(UserContext);

  const [formData, setFormData] = useState({
    name: nameUser,
    email: email,
    username: username,
    phoneNo: phNumber,
    dob: dob,
  });

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

  return (
    <div className="max-w-2.5xl mx-auto mt-0">
      <h1 className="text-center text-3xl font-bold mb-8">
        Profile Information
      </h1>
      <div className="flex items-center justify-between ml-[15%]">
        <div
          className="flex flex-col lg:flex-row items-center justify-between space-x-4 mb-4 border border-gray-300 py-16 rounded-md shadow-2xl bg-[#DBF3FA] pr-20 "
          style={{ boxShadow: "14px 12px 20px rgba(0, 0, 0, 0.6)" }}
        >
          <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-black lg:mr-0 pr-10 mb-4 lg:mb-0">
            <ProfilePictureUpload />
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
