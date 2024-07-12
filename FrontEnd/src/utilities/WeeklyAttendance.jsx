import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { BarChart } from "@mui/x-charts";
import UserContext from "../Components/UserContext";
import FormatDateTime from "../Components/FormatDateTime"; // Import FormatDateTime if it's defined

// Helper function to get the day name from a date
const getDayName = (date) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[date.getDay()];
};

// Helper function to convert time to minutes since midnight
const timeToMinutes = (timeString) => {
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
};

// Helper function to convert minutes since midnight to a formatted time
const minutesToTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;
  return `${formattedHours}:${mins.toString().padStart(2, "0")} ${period}`;
};

const WeeklyAttendance = () => {
  const { username, Api_EndPoint } = useContext(UserContext);
  const [xLabels, setXLabels] = useState([]);
  const [entranceTimes, setEntranceTimes] = useState([]);
  const [leaveTimes, setLeaveTimes] = useState([]);
  const [formattedEntranceTimes, setFormattedEntranceTimes] = useState([]);
  const [formattedLeaveTimes, setFormattedLeaveTimes] = useState([]);

  useEffect(() => {
    const fetchWeeklyAttendance = async () => {
      try {
        const response = await axios.get(
          `${Api_EndPoint}/api/attendance/weekly/${username}`
        );
        const data = response.data;

        const labels = data.map((att) =>
          getDayName(new Date(att.entranceTime))
        );
        const entranceData = data.map((att) =>
          att.entranceTime
            ? FormatDateTime(att.entranceTime).formattedTime
            : "N/A"
        );
        const leaveData = data.map((att) =>
          att.leavingTime
            ? FormatDateTime(att.leavingTime).formattedTime
            : "N/A"
        );

        setXLabels(labels);
        setEntranceTimes(entranceData);
        setLeaveTimes(leaveData);
      } catch (error) {
        console.error("Error fetching weekly attendance data:", error);
      }
    };

    if (username) {
      fetchWeeklyAttendance();
    }
  }, [username, Api_EndPoint]);

  return (
    <BarChart
      width={500}
      height={300}
      series={[
        {
          data: entranceTimes,
          label: "Entrance Time                                   ",
          id: "entranceId",
          color: "#3f51b5", // Blue color for entrance time bars
        },
        {
          data: leaveTimes,
          label: "Leave Time",
          id: "leaveId",
          color: "#f50057", // Red color for leave time bars
        },
      ]}
      xAxis={[{ data: xLabels, scaleType: "band" }]}
      yAxis={[
        {
          scaleType: "linear",
          tickFormat: minutesToTime,
        },
      ]}
      tooltip={{
        renderTooltip: (params) => {
          const { id, value, dataIndex } = params;
          const formattedTime =
            id === "entranceId"
              ? formattedEntranceTimes[dataIndex]
              : formattedLeaveTimes[dataIndex];
          return `${
            id === "entranceId" ? "Entrance Time" : "Leave Time"
          }: ${formattedTime}`;
        },
      }}
    />
  );
};

export default WeeklyAttendance;
