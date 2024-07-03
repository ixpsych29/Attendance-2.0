import { useState, useEffect } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import setupEnv from "../../setupEnv.js";

const UserProvider = ({ children }) => {
  const Api_EndPoint = setupEnv.apiEndpoint;

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [userProfilePic, setUserProfilePic] = useState();
  const [email, setEmail] = useState("");
  const [nameUser, setNameUser] = useState("");
  const [phNumber, setPhNumber] = useState("");
  const [dob, setDobState] = useState("");
  const [entranceTime, setEntranceTime] = useState(null);
  const [leaveTime, setLeaveTime] = useState(null);

  const setNameOfUser = (name) => {
    setNameUser(name);
  };
  const setPhoneNumber = (phone) => {
    setPhNumber(phone);
  };
  const setUserName = (name) => {
    setUsername(name);
  };
  const setUserRole = (r) => {
    setRole(r);
  };
  const setUserProfilePicture = (pic) => {
    setUserProfilePic(pic);
  };
  const setUserEmail = (userEmail) => {
    setEmail(userEmail);
  };
  const setDob = (userDob) => {
    setDobState(userDob);
  };

  const fetchProfilePicture = async (username) => {
    try {
      const response = await axios.get(`${Api_EndPoint}/api/users/${username}`);
      if (response.status === 200) {
        setNameOfUser(response.data.name);
        setUserProfilePic(response.data.profilePicture);
        setUserEmail(response.data.email);
        setPhoneNumber(response.data.phoneNumber);
        setDob(response.data.dob);
      } else {
        console.error(
          "Error fetching profile picture. Server response:",
          response.status
        );
      }
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  };

  const fetchAttendanceTimes = async () => {
    try {
      const response = await axios.get(
        `${Api_EndPoint}/api/reports/late-coming`
      );
      if (response.status === 200 && response.data.length > 0) {
        const latestAttendance = response.data[0];
        setEntranceTime(new Date(latestAttendance.entranceTime));
        setLeaveTime(new Date(latestAttendance.leaveTime));
      }
    } catch (error) {
      console.error("Error fetching attendance times:", error);
    }
  };

  useEffect(() => {
    fetchProfilePicture(username);
    fetchAttendanceTimes();
  }, [username, Api_EndPoint]);

  return (
    <UserContext.Provider
      value={{
        nameUser,
        username,
        phNumber,
        setUserName,
        role,
        setUserRole,
        userProfilePic,
        setUserProfilePicture,
        fetchProfilePicture,
        email,
        Api_EndPoint,
        dob,
        entranceTime,
        leaveTime, // Add entranceTime and leaveTime to the context
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
