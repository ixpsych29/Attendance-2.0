import React, { useState } from "react";
import RecordList from "./RecordList";
import dayjs from "dayjs";

const DailyAttendance = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());

  return (
    <div>
      <RecordList
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </div>
  );
};

export default DailyAttendance;
