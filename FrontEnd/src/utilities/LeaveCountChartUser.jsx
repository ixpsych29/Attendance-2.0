import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import UserContext from "../Components/UserContext";

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

const StyledTotalLeaveText = styled("text")(({ theme }) => ({
  fill: "#000000", // Black color for total leave count text
  textAnchor: "middle",
  dominantBaseline: "hanging",
  fontSize: 16,
}));

const StyledRemainingLeaveText = styled("text")(({ theme }) => ({
  fill: "#000000", // Black color for remaining leave text
  textAnchor: "middle",
  dominantBaseline: "hanging",
  fontSize: 16,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

const LeaveCountChartUser = () => {
  const { username, Api_EndPoint } = useContext(UserContext);

  const [paidLeaves, setPaidLeaves] = useState(0);
  const [unpaidLeaves, setUnpaidLeaves] = useState(0); // State for unpaid leaves

  const totalLeaveCount = 24; // Fixed total leave count

  useEffect(() => {
    const fetchLeaveData = async () => {
      try {
        const response = await axios.get(
          `${Api_EndPoint}/api/users/${username}`
        );
        if (response.status === 200) {
          const userData = response.data;

          // Calculate paid leaves
          const paidLeavesCount = userData.leaveRequests.reduce(
            (total, request) =>
              request.leaveType === "paid" && request.status === "approved"
                ? total + request.leaveDays
                : total,
            0
          );
          setPaidLeaves(paidLeavesCount);

          // Calculate unpaid leaves
          const unpaidLeavesCount = userData.leaveRequests.reduce(
            (total, request) =>
              request.leaveType === "unpaid" && request.status === "approved"
                ? total + request.leaveDays
                : total,
            0
          );
          setUnpaidLeaves(unpaidLeavesCount);
        } else {
          console.error(
            "Error fetching user data. Server response:",
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (username) {
      fetchLeaveData();
    }
  }, [username, Api_EndPoint]);

  const size = {
    width: 500,
    height: 200,
  };

  const totalLeaveTextPosition = { x: size.width / 2, y: size.height + 30 }; // Position for total leave count text
  const remainingLeaveTextPosition = {
    x: size.width / 2,
    y: size.height + 50, // Adjusted position for remaining leave text
  };
  const chartPadding = 20; // Padding between chart and labels

  // Calculate remaining leaves
  const remainingLeaves = totalLeaveCount - paidLeaves;

  // Adjusting the chart data based on the calculated values
  const data = [
    { value: paidLeaves, label: "Paid Leaves", color: "#87CEEB" }, // Light blue color for paid leaves
    { value: remainingLeaves, label: "Remaining Leaves", color: "#FFFF00" }, // Yellow color for remaining leaves
  ];

  return (
    <div style={{ position: "relative", width: size.width + 2 * chartPadding }}>
      <PieChart series={[{ data }]} {...size}>
        <PieCenterLabel>Leave Count</PieCenterLabel>
      </PieChart>
      <StyledTotalLeaveText
        x={totalLeaveTextPosition.x}
        y={totalLeaveTextPosition.y}
      >
        Total Leave: {totalLeaveCount} {/* Display fixed total leave count */}
      </StyledTotalLeaveText>
      <StyledRemainingLeaveText
        x={remainingLeaveTextPosition.x}
        y={remainingLeaveTextPosition.y}
      >
        Remaining Unpaid Leave: {unpaidLeaves}{" "}
        {/* Display remaining unpaid leaves */}
      </StyledRemainingLeaveText>
    </div>
  );
};

export default LeaveCountChartUser;
