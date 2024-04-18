import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { useContext, useState } from "react";
import UserContext from "./UserContext";
import MuiPhoneNumber from "material-ui-phone-number-2";
import ProfilePictureUpload from "./ProfilePictureUpload";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { nameUser, username, Api_EndPoint, email, phNumber } =
    useContext(UserContext);

  const [formData, setFormData] = useState({
    name: nameUser,
    email: email,
    username: username,
    phoneNo: phNumber,
  });

  //handling Form Data
  const handleValueChange = (event) => {
    const inputValue = event.target.value;

    // Allow only letters and spaces
    const filteredValue = inputValue.replace(/[^A-Za-z\s]/g, "");
    setFormData({ ...formData, name: filteredValue });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      //making an APi call

      await axios.put(`${Api_EndPoint}/api/users/${username}/update-profile`, {
        phoneNo: formData.phoneNo,
      });
      toast.success("Profile Updated");
    } catch (err) {
      console.log("Error Updating Profile Data", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-center text-3xl font-bold mb-20">
        Profile Information
      </h1>
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-center space-x-4 mb-4 border border-gray-300 p-24 rounded-md shadow-xl bg-[#DBF3FA]">
            <div className="w-1/2 border-r border-black pr-4">
              <ProfilePictureUpload />
            </div>
            <div className="w-1/2 pl-4 ">
              <div className="flex items-center space-x-4 mb-4 justify-end">
                <label htmlFor="name" className="lable-style">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="input-style cursor-not-allowed"
                  value={nameUser}
                  onChange={handleValueChange}
                  maxLength="30"
                  disabled
                />
              </div>
              <div className="flex items-center space-x-4 mb-4 justify-end">
                {" "}
                {/* Changed div to flex */}
                <label htmlFor="email" className=" lable-style ">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="input-style cursor-not-allowed"
                  value={email}
                  disabled
                />
              </div>
              <div className="flex items-center space-x-4 mb-4 justify-end">
                {" "}
                {/* Changed div to flex */}
                <label htmlFor="username" className="lable-style">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className="input-style cursor-not-allowed"
                  value={username}
                  disabled
                />
              </div>
              <div className="flex items-center space-x-4 mb-4 justify-end">
                {" "}
                {/* Changed div to flex */}
                <label htmlFor="phoneNo" className="lable-style">
                  Phone Number
                </label>
                <input
                  id="phoneNo"
                  type="tel"
                  className="input-style"
                  value={formData.phoneNo}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNo: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-10 px-6 md:px-60 py-2 md border border-transparent rounded-md shadow-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400 hover:bg-[#1b1d72] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={!(formData.name && formData.phoneNo)}>
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
