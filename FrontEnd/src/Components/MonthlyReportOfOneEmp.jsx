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
        <div className="flex items-center space-x-4 ml-[30%]">
          <TextField
            label="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            variant="outlined"
            sx={{ mb: 2, width: 500 }} // Increased width to 400
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            className="font-bold py-2 px-4 rounded mb-4 btn-style"
            sx={{ mb: 2 }}
          >
            Search
          </Button>
        </div>

        {searchUserName && (
          <>
            <div className="flex items-center space-x-4 ml-[37%] mt-5">
              <Typography
                variant="h6"
                textAlign="center"
                sx={{ mb: 3, color: "#000" }}
              >
                Report for : " {searchUserName} "
              </Typography>
              <Button
                variant="contained"
                className="font-bold py-2 px-4 rounded mb-4 btn-style"
                color="primary"
                onClick={handleDownloadCSV}
                sx={{ mb: 3, mx: "auto", display: "block" }}
              >
                Download CSV
              </Button>
            </div>
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
