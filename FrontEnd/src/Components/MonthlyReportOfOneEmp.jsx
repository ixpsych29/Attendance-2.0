import React, { useState, useEffect, useContext } from "react";
import {
  Paper,
  TableContainer,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import UserContext from "./UserContext";
import axios from "axios";
import dayjs from "dayjs";
import { DataTable } from "./DataTable";
import FormatDateTime from "./FormatDateTime";
import Loader from "../Loader/Loader";
import DownloadCSVReport from "./DownladReport"; // Assuming the download function is in this file

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

  const handleDownloadCSV = () => {
    DownloadCSVReport(attendanceData, `monthly_${searchUserName}`);
  };

  if (loading) {
    return <Typography>{<Loader />}</Typography>;
  }

  return (
    <Box sx={{ mt: 3, mx: "auto", width: "95%" }}>
      <Paper sx={{ p: 3, bgcolor: "#DBF3FA" }}>
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ mb: 3, color: "#000" }}
        >
          <h1 className="text-center font-bold text-3xl">
            Monthly Attendance report{" "}
          </h1>
        </Typography>
        <TextField
          label="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          variant="outlined"
          sx={{ mb: 2, width: 300, display: "block", mx: "auto" }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{ mb: 2, mx: "auto", display: "block" }}
        >
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
            <Button
              variant="contained"
              color="primary"
              onClick={handleDownloadCSV}
              sx={{ mb: 3, mx: "auto", display: "block" }}
            >
              Download CSV
            </Button>
            <TableContainer>
              <DataTable rows={attendanceData} columns={columns} />
            </TableContainer>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default MonthlyReportOfOneEmp;
