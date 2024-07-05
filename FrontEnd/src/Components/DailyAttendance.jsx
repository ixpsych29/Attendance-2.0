import React, { useState } from "react";
import RecordList from "./RecordList";
import dayjs from "dayjs";
import { Divider, Paper, TableContainer, Typography } from "@mui/material";

const DailyAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <TableContainer
      component={Paper}
      sx={{ mt: 7, ml: "auto", pt: 5, bgcolor: "#DBF3FA" }}
    >
      <Typography variant="h4" textAlign="center" sx={{ mb: 3, color: "#000" }}>
        Welcome to the Daily log
      </Typography>

      <Divider
        variant="middle"
        sx={{ mt: 7, mb: 7, borderColor: "primary.main", borderWidth: 2 }}
      />
      <RecordList
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </TableContainer>
  );
};

export default DailyAttendance;
