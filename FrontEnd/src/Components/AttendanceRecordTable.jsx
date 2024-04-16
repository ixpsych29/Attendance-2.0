import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import FormatDateTime from "./FormatDateTime";
function AttendanceRecordTable({ attendanceRecord }) {
  if (attendanceRecord.length === 0) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1>No Record</h1>
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
    >
      <TableHead>
        <TableRow>
          <TableCell align="center">Picture</TableCell>
          <TableCell align="center">User Name</TableCell>
          <TableCell align="center">Date</TableCell>
          <TableCell align="center">Entrance Time</TableCell>
          <TableCell align="center">Leave Time</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {attendanceRecord.map((record) => (
          <TableRow
            key={record._id}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell
              align="center"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {record.picture ? (
                <Avatar sx={{ width: 70, height: 70 }}>
                  <img
                    src={record.picture}
                    alt="Attendance"
                    style={{ maxWidth: "100px" }}
                  />
                </Avatar>
              ) : (
                "Not Found"
              )}
            </TableCell>
            <TableCell align="center">{record.username}</TableCell>

            {/* //Displaying Date  */}
            <TableCell component="th" align="center" scope="row">
              {FormatDateTime(record.entranceTime).formattedDate}
            </TableCell>

            {/* //displaying entranceTime */}
            <TableCell component="th" align="center" scope="row">
              {FormatDateTime(record.entranceTime).formattedTime}
            </TableCell>

            {/* displaying leavingTime */}

            {record.leavingTime ? (
              <TableCell component="th" align="center" scope="row">
                {FormatDateTime(record.leavingTime).formattedTime}
              </TableCell>
            ) : (
              <TableCell component="th" align="center" scope="row">
                {"didn't Checked Out "}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default AttendanceRecordTable;
