import React, { useState, useEffect, useContext } from "react";
import { Paper, TableContainer, Typography, Button, Box } from "@mui/material";
import UserContext from "./UserContext";
import axios from "axios";
import dayjs from "dayjs";
import { DataTable } from "./DataTable";
import FormatDateTime from "./FormatDateTime";
import Loader from "../Loader/Loader";
import DownloadCSVReport from "./DownladReport"; // Assuming the download function is in this file

const ThreeMonthAttendanceReport = () => {
  const { Api_EndPoint } = useContext(UserContext);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "username", headerName: "Username", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "entranceTime", headerName: "Entrance Time", width: 180 },
    { field: "leavingTime", headerName: "Leaving Time", width: 180 },
  ];

  useEffect(() => {
    const fetchThreeMonthAttendanceData = async () => {
      try {
        const startDate = dayjs()
          .subtract(3, "month")
          .startOf("month")
          .toISOString();
        const endDate = dayjs().endOf("day").toISOString();

        const apiUrl = `${Api_EndPoint}/api/attendance/report?startDate=${startDate}&endDate=${endDate}`;
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
        console.error("Error fetching three-month attendance data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThreeMonthAttendanceData();
  }, [Api_EndPoint]);

  const handleDownloadCSV = () => {
    DownloadCSVReport(attendanceData, "three_month_attendance");
  };

  if (loading) {
    return <Typography>{<Loader />}</Typography>;
  }

  return (
    <Box sx={{ mt: 0, mx: "auto", width: "95%" }}>
      <Paper sx={{ p: 3, bgcolor: "#DBF3FA" }}>
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ mb: 3, color: "#000" }}
        >
          Three Month Attendance Report
        </Typography>
        <Button
          onClick={handleDownloadCSV}
          variant="contained"
          color="primary"
          sx={{ mb: 3 }}
        >
          Download CSV
        </Button>
        <TableContainer>
          <DataTable rows={attendanceData} columns={columns} />
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default ThreeMonthAttendanceReport;
