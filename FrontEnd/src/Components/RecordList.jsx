import { useContext, useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import UserContext from "./UserContext";
import AttendanceRecordTable from "./AttendanceRecordTable";
import DatePickerCmp from "./DatePickerCmp";

const RecordList = ({ selectedDate, setSelectedDate }) => {
  const { username, role, Api_EndPoint } = useContext(UserContext);
  const [attendanceRecord, setAttendanceRecord] = useState([]);
  const [showPreviousMonth, setShowPreviousMonth] = useState(false);

  const isAdmin = role === "admin";

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        let apiUrl;
        if (isAdmin) {
          apiUrl = `${Api_EndPoint}/api/attendance/all?date=${selectedDate.toISOString()}`;
        } else {
          const startDate = showPreviousMonth
            ? dayjs().subtract(1, "month").startOf("month")
            : dayjs().startOf("month");
          const endDate = showPreviousMonth
            ? dayjs().subtract(1, "month").endOf("month")
            : dayjs().endOf("day");
          apiUrl = `${Api_EndPoint}/api/attendance/monthly/${username}?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`;
        }

        const response = await axios.get(apiUrl);
        setAttendanceRecord(response.data);
      } catch (error) {
        console.error("Error Fetching Attendance Records", error);
      }
    };

    fetchAttendanceRecords();
  }, [isAdmin, username, selectedDate, showPreviousMonth, Api_EndPoint]);

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleLastMonthClick = () => {
    setShowPreviousMonth(true);
  };

  return (
    <div className="mt-32">
      {isAdmin ? (
        <div className="flex justify-between mb-4">
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
              onClick={() => setShowPreviousMonth(false)}
            >
              This Month Records
            </button>
          </div>
          <div>
            <DatePickerCmp value={selectedDate} onChange={handleDateChange} />
          </div>
        </div>
      ) : (
        <div>
          {showPreviousMonth ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setShowPreviousMonth(false)}
            >
              This Month Records
            </button>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleLastMonthClick}
            >
              Previous Month Records
            </button>
          )}
        </div>
      )}
      <AttendanceRecordTable attendanceRecord={attendanceRecord} />
    </div>
  );
};

export default RecordList;
