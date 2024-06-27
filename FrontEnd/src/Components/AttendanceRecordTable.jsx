import React, { useState } from "react";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Menu,
  MenuItem,
} from "@mui/material";
import FormatDateTime from "./FormatDateTime";
import { BsThreeDots } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

function AttendanceRecordTable({ attendanceRecord, isAdmin }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUsername, setSelectedUsername] = useState(null);

  const handleMenuClick = (event, username) => {
    setAnchorEl(event.currentTarget);
    setSelectedUsername(username);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUsername(null);
  };

  const handleViewProfile = () => {
    navigate("/home/empprofile", { state: { username: selectedUsername } });
    handleClose();
  };

  if (attendanceRecord.length === 0) {
    return (
      <div className="flex items-center justify-center ">
        <h1 className="text-3xl font-bold text-center mb-10">No Record</h1>
      </div>
    );
  }

  return (
    <Table
      stickyHeader
      sx={{
        minWidth: 650,
        mt: 3,
      }}
      size="small"
      aria-label="a dense table"
      className="w-full border-collapse md:mt-3 sm:mt-2 md:min-w-[650rem] sm:min-w-[500rem]"
    >
      <TableHead>
        <TableRow>
          <TableCell
            align="center"
            className="px-4 py-2"
            style={{ backgroundColor: "#DBF3FA", color: "black" }}
          >
            Picture
          </TableCell>
          <TableCell
            align="center"
            className="px-4 py-2"
            style={{ backgroundColor: "#DBF3FA", color: "black" }}
          >
            User Name
          </TableCell>
          <TableCell
            align="center"
            className="px-4 py-2"
            style={{ backgroundColor: "#DBF3FA", color: "black" }}
          >
            Date
          </TableCell>
          <TableCell
            align="center"
            className="px-4 py-2"
            style={{ backgroundColor: "#DBF3FA", color: "black" }}
          >
            Entrance Time
          </TableCell>
          <TableCell
            align="center"
            className="px-4 py-2"
            style={{ backgroundColor: "#DBF3FA", color: "black" }}
          >
            Leave Time
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {attendanceRecord.map((record) => (
          <TableRow
            key={record._id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            className="border-b border-black-200"
          >
            <TableCell component="th" align="center" className="px-4 py-2">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {record.picture ? (
                  <Avatar sx={{ width: 70, height: 70 }}>
                    <img
                      src={record.picture}
                      alt="Attendance"
                      style={{ maxWidth: "100rem" }}
                    />
                  </Avatar>
                ) : (
                  "Not Found"
                )}
              </div>
            </TableCell>

            <TableCell align="center" className="px-4 py-2">
              {record.username}
            </TableCell>

            <TableCell align="center" className="px-4 py-2">
              {FormatDateTime(record.entranceTime).formattedDate}
            </TableCell>

            <TableCell align="center" className="px-4 py-2">
              {FormatDateTime(record.entranceTime).formattedTime}
            </TableCell>

            <TableCell align="center" className="px-4 py-2">
              {record.leavingTime
                ? FormatDateTime(record.leavingTime).formattedTime
                : "Didn't Check Out"}
            </TableCell>

            {isAdmin && (
              <TableCell align="center" className="px-4 py-2">
                <BsThreeDots
                  onClick={(event) => handleMenuClick(event, record.username)}
                />
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  sx={{ "& .MuiMenu-paper": { backgroundColor: "#DBF3FA" } }}
                >
                  <MenuItem onClick={handleViewProfile}>View Profile</MenuItem>
                </Menu>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default AttendanceRecordTable;
