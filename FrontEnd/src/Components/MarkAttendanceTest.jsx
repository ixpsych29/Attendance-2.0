import { Button } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MarkAttendanceTest = () => {
  const navigate = useNavigate();
  const [checkedIn, setCheckedIn] = useState(false);
  const { username, Api_EndPoint } = useContext(UserContext);

  useEffect(() => {
    const checkIfCheckedIn = async () => {
      try {
        const response = await axios.get(
          `${Api_EndPoint}/api/attendance/${username}`
        );
        setCheckedIn(!!response.data);
      } catch (error) {
        console.log(error.response?.data?.message || error.message);
      }
    };
    checkIfCheckedIn();
  }, [username, Api_EndPoint]);

  const handleAttendance = async () => {
    const date = new Date();
    try {
      if (!checkedIn) {
        await axios.post(`${Api_EndPoint}/api/attendance`, {
          username: username,
          entranceTime: date.toISOString(),
        });
        toast.success("Check-in Successful!");
        setCheckedIn(true);
      } else {
        await axios.put(`${Api_EndPoint}/api/attendance/${username}`, {
          leavingTime: date,
        });
        toast.success("Check-out Successful!");
        setCheckedIn(false);
      }
      navigate("/home");
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      toast.error("Failed to mark attendance");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-[#DBF3FA] px-80 py-10 rounded-md border border-white border-opacity-40 backdrop-blur-md ml-20 mb-10">
      <Button
        variant="contained"
        className="w-72 btn-style"
        onClick={handleAttendance}
      >
        {checkedIn ? "Check-out" : "Check-in"} &nbsp;
        {checkedIn && <CheckIcon />}
      </Button>
    </div>
  );
};

export default MarkAttendanceTest;
