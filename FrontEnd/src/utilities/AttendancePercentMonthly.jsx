import { useState, useEffect, useContext } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import UserContext from "../Components/UserContext";
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
        if (Array.isArray(response.data) && response.data.length > 0) {
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
    return new Date(tickItem).getDate();
  };

  const formatTooltipLabel = (value) => {
    return `Date: ${new Date(value).toLocaleDateString()}`;
  };

  if (attendanceData.length === 0) {
    return <div>No attendance data available for this month.</div>;
  }

  return (
    <div
      style={{
        width: "100%",
        height: 400,
        padding: "20px",
        backgroundColor: "#ffc64c",
        borderRadius: "10px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#29406d",
          marginBottom: "20px",
        }}
      >
        Monthly Attendance Percentage
      </h2>
      <ResponsiveContainer>
        <LineChart
          data={attendanceData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <XAxis
            dataKey="date"
            tickFormatter={formatXAxis}
            stroke="#29406d"
            tick={{ fill: "#29406d", fontSize: 12 }}
          />
          <YAxis
            domain={[0, 100]}
            stroke="#29406d"
            tick={{ fill: "#29406d", fontSize: 12 }}
          />
          <Tooltip
            labelFormatter={formatTooltipLabel}
            formatter={(value, name) => [`${value.toFixed(2)}%`, name]}
            contentStyle={{
              backgroundColor: "#fff",
              border: "none",
              borderRadius: "5px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          />
          <Legend verticalAlign="top" height={36} iconType="circle" />
          <Line
            type="monotone"
            dataKey="presentPercentage"
            name="Present"
            stroke="#4CAF50"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 8, fill: "#4CAF50", stroke: "#fff" }}
          />
          <Line
            type="monotone"
            dataKey="absentPercentage"
            name="Absent"
            stroke="#F44336"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 8, fill: "#F44336", stroke: "#fff" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendancePercentMonthly;
