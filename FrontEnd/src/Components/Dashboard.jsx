import { Box, Container, CssBaseline } from "@mui/material";
import DisplayCard from "./DisplayCard";
import RecordList from "./RecordList";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import UserContext from "./UserContext";
import { Link } from "react-router-dom";
// import DailyAttendanceChart from "../utilities/DailyAttendanceChart";
import AttendancePercentMonthly from "../utilities/AttendancePercentMonthly";
import LateUsersPieChart from "../utilities/LateUsersPieChart";

const Dashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [presentEmployees, setPresentEmployees] = useState(0);
  const [absentEmployees, setAbsentEmployees] = useState(0);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const { Api_EndPoint } = useContext(UserContext);

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

      <Container className="overflow-y-hidden">
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
        {/* <RecordList
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        /> */}
        <div className="flex">
          <div
            className="flex-grow"
            style={{ marginTop: "40px", flexBasis: "70%" }}
          >
            <AttendancePercentMonthly />
          </div>
          <div className="flex-none" style={{ flexBasis: "30%" }}>
            <LateUsersPieChart />
          </div>
        </div>
      </Container>
    </Box>
  );
};

export default Dashboard;
