import { Box, Container, CssBaseline } from "@mui/material";
import DisplayCard from "./DisplayCard";
import RecordList from "./RecordList";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import UserContext from "./UserContext";
import { Link } from "react-router-dom";
import DailyAttendanceChart from "../utilities/DailyAttendanceChart";
// import AbsentEmp from "./AbsentEmp";

const Dashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [presentEmployees, setPresentEmployees] = useState(0);
  const [absentEmployees, setAbsentEmployees] = useState(0);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { Api_EndPoint } = useContext(UserContext);

  const attendanceData = [
    { name: "Jon Snow", entranceTime: "09:00", leaveTime: "17:00" },
    { name: "Cersei Lannister", entranceTime: "09:15", leaveTime: "17:30" },
    { name: "Jaime Lannister", entranceTime: "09:10", leaveTime: "17:25" },
    { name: "Arya Stark", entranceTime: "08:50", leaveTime: "16:50" },
    { name: "Daenerys Targaryen", entranceTime: "09:05", leaveTime: "17:10" },
    // Add more data as needed
  ];

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        // Add a cache-busting parameter to the API requests
        const uniqueIdentifier = Math.random().toString(36).substring(7);

        //fetching total no of users
        const totalResponse = await axios.get(
          `${Api_EndPoint}/api/users?cacheBuster=${uniqueIdentifier}`
        );
        // console.log("totalResponse ", totalResponse.data);
        setTotalEmployees(totalResponse.data.totalEmployees || 0);
        const apiUrl = `${Api_EndPoint}/api/attendance/all?date=${selectedDate.toISOString()}`;
        //fetching the total present employees
        const presentResponse = await axios.get(apiUrl);
        const distinctEmployeeCount = presentResponse.data.length;
        // console.log("presentResponse ", presentResponse.data);
        setPresentEmployees(distinctEmployeeCount || 0);

        // Calculate absentees as total employees minus present ones
        setAbsentEmployees(
          totalResponse.data.totalEmployees - distinctEmployeeCount || 0
        );
      } catch (error) {
        console.error("Error Fetching Attendance Records", error);
      }
    };
    fetchRecords();
  }, [selectedDate, Api_EndPoint]);

  return (
    <Box>
      <CssBaseline />

      <Container>
        <div className="flex justify-between mx-auto mb-10">
          <Link to="/home/totalemployee" style={{ textDecoration: "none" }}>
            <DisplayCard title="Total" count={totalEmployees} />
          </Link>
          <Link to="/home/PresentEmp" style={{ textDecoration: "none" }}>
            <DisplayCard title="Present" count={presentEmployees} />
          </Link>
          <Link to="/home/AbsentEmp" style={{ textDecoration: "none" }}>
            <DisplayCard title="Absent" count={absentEmployees} />
          </Link>
        </div>
        <RecordList
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <div>
          <DailyAttendanceChart data={attendanceData} />
        </div>
      </Container>
    </Box>
  );
};

export default Dashboard;
