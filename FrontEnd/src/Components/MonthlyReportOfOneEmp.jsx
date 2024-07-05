import React, { useState, useEffect, useContext } from "react";
import {
  Paper,
  TableContainer,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import UserContext from "./UserContext";
import axios from "axios";
import dayjs from "dayjs";
import { DataTable } from "./DataTable";
import FormatDateTime from "./FormatDateTime";
import Loader from "../Loader/Loader";

const MonthlyReportOfOneEmp = () => {
  const { Api_EndPoint } = useContext(UserContext);
  const [userName, setUserName] = useState("");
  const [searchUserName, setSearchUserName] = useState("");
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { field: "username", headerName: "Username", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "entranceTime", headerName: "Entrance Time", width: 180 },
    { field: "leavingTime", headerName: "Leaving Time", width: 180 },
  ];

  useEffect(() => {
    const fetchMonthlyAttendanceData = async () => {
      if (!searchUserName) return;

      setLoading(true);
      try {
        const startDate = dayjs().startOf("month").toISOString();
        const endDate = dayjs().endOf("month").toISOString();
        const apiUrl = `${Api_EndPoint}/api/attendance/monthly/${searchUserName}?startDate=${startDate}&endDate=${endDate}`;

        const response = await axios.get(apiUrl);

        const formattedData = response.data.map((record, index) => ({
          id: index + 1,
          username: record.username,
          date: FormatDateTime(record.entranceTime).formattedDate,
          entranceTime: FormatDateTime(record.entranceTime).formattedTime,
          leavingTime: record.leavingTime
            ? FormatDateTime(record.leavingTime).formattedTime
            : "Not Checked Out",
        }));

        setAttendanceData(formattedData);
      } catch (error) {
        console.error("Error fetching monthly attendance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyAttendanceData();
  }, [Api_EndPoint, searchUserName]);

  const handleSearch = () => {
    setSearchUserName(userName);
  };

  if (loading) {
    return <Typography>{<Loader />}</Typography>;
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ mt: 7, ml: "auto", pt: 5, bgcolor: "#DBF3FA" }}
    >
      <Typography variant="h4" textAlign="center" sx={{ mb: 3, color: "#000" }}>
        Monthly Attendance Report
      </Typography>
      <TextField
        label="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        variant="outlined"
        sx={{ mb: 2 }}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      {searchUserName && (
        <>
          <Typography
            variant="h6"
            textAlign="center"
            sx={{ mb: 3, color: "#000", mt: 3 }}
          >
            Report for {searchUserName}
          </Typography>
          <DataTable rows={attendanceData} columns={columns} />
        </>
      )}
    </TableContainer>
  );
};

export default MonthlyReportOfOneEmp;
