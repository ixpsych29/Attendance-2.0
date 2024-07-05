import { useState, useEffect, useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import UserContext from "../Components/UserContext";
import FormatDateTime from "../Components/FormatDateTime";
import axios from "axios";

const AttendancePercentMonthly = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const { Api_EndPoint } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${Api_EndPoint}/api/attendance/present-users`
        );
        console.log("API response:", response.data);
        if (
          response.data &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          setAttendanceData(response.data);
        } else {
          console.log("No data received from API or data is empty");
          setAttendanceData([]);
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
        setAttendanceData([]);
      }
    };

    fetchData();
  }, [Api_EndPoint]);

  const formatXAxis = (tickItem) => {
    const { formattedDate } = FormatDateTime(tickItem);
    return formattedDate.split(" ")[1]; // Return only the day part
  };

  const formatTooltipLabel = (value) => {
    const { formattedDate, formattedTime } = FormatDateTime(value);
    return `Date: ${formattedDate}\nTime: ${formattedTime}`;
  };

  if (attendanceData.length === 0) {
    return <div>No attendance data available for this month.</div>;
  }

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2>Monthly Attendance Percentage</h2>
      <ResponsiveContainer>
        <LineChart
          data={attendanceData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={formatXAxis}
            label={{
              value: "Date",
              position: "insideBottomRight",
              offset: -10,
            }}
          />
          <YAxis
            domain={[0, 100]}
            label={{
              value: "Attendance (%)",
              angle: -90,
              position: "insideLeft",
            }}
          />
          <Tooltip
            labelFormatter={formatTooltipLabel}
            formatter={(value) => [`${value.toFixed(2)}%`, "Attendance"]}
          />
          <Line
            type="monotone"
            dataKey="percentage"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendancePercentMonthly;
