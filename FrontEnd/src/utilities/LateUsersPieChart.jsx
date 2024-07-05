import { useState, useEffect, useContext } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import UserContext from "../Components/UserContext";
import axios from "axios";

const COLORS = ["#4CAF50", "#F44336", "#19b0e7"]; // Yellow for On Time, Blue for Late, Green for outer ring

const TwoLevelPieChart = () => {
  const [chartData, setChartData] = useState({ inner: [], outer: [] });
  const { Api_EndPoint } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${Api_EndPoint}/api/attendance/all/`);
        if (response.status === 200) {
          const attendanceData = response.data;
          const totalUsersCount = attendanceData.length;

          // Assuming entranceTime is in a proper Date format
          const onTimeUsersCount = attendanceData.filter(
            (item) =>
              item.entranceTime && new Date(item.entranceTime).getHours() < 12
          ).length;
          const lateUsersCount = attendanceData.filter(
            (item) =>
              item.entranceTime && new Date(item.entranceTime).getHours() >= 12
          ).length;

          setChartData({
            inner: [
              { name: "On Time", value: onTimeUsersCount },
              { name: "Late", value: lateUsersCount },
            ],
            outer: [{ name: "Total", value: totalUsersCount }],
          });
        }
      } catch (error) {
        console.error("Error fetching attendance data:", error);
      }
    };

    fetchData();
  }, [Api_EndPoint]);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2 style={{ textAlign: "center", color: "#29406d", marginTop: "20px" }}>
        LateComings Overview
      </h2>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData.outer}
            cx="50%"
            cy="50%"
            outerRadius={120}
            innerRadius={90}
            fill={COLORS[2]}
            dataKey="value"
          />
          <Pie
            data={chartData.inner}
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={90}
            fill={COLORS[0]}
            dataKey="value"
            label={renderCustomizedLabel}
          >
            {chartData.inner.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TwoLevelPieChart;
