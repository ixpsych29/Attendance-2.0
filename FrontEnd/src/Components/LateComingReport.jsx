import { useState, useContext, useEffect } from "react";
import { DataTable } from "./DataTable";
import axios from "axios";
import UserContext from "./UserContext";
import FormatDateTime from "./FormatDateTime"; // Assuming FormatDateTime is in a separate file
import Loader from "../Loader/Loader";

const LateComingReport = () => {
  const { Api_EndPoint } = useContext(UserContext);
  const [lateComingsData, setLateComingsData] = useState([]);
  const [loading, setLoading] = useState(true); // State to handle loading

  const columns = [
    { field: "username", headerName: "Username", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "leavingTime", headerName: "Leaving Time", width: 180 },
    { field: "entranceTime", headerName: "Entrance Time", width: 180 },
    { field: "entranceDate", headerName: "Entrance Date", width: 120 },
  ];

  useEffect(() => {
    const fetchLateComingsData = async () => {
      try {
        const response = await axios.get(`${Api_EndPoint}/api/attendance/all`);
        if (response.status === 200) {
          const formattedData = response.data.map((item, index) => {
            const entranceDateTime = item.entranceTime
              ? FormatDateTime(item.entranceTime)
              : { formattedDate: "-", formattedTime: "-" };
            const leavingDateTime = item.leavingTime
              ? FormatDateTime(item.leavingTime)
              : { formattedDate: "-", formattedTime: "-" };
            const dateFormatted = item.date
              ? FormatDateTime(item.date)
              : { formattedDate: "-" };

            return {
              id: index + 1,
              username: item.username,
              email: item.email,
              entranceTime: entranceDateTime.formattedTime,
              entranceDate: entranceDateTime.formattedDate,
              leavingTime: leavingDateTime.formattedTime,
              leavingDate: leavingDateTime.formattedDate,
              date: dateFormatted.formattedDate,
            };
          });

          setLateComingsData(formattedData);
        } else {
          console.error("Failed to fetch late comings data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching late comings:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchLateComingsData();
  }, [Api_EndPoint]);

  if (loading) {
    return <p>{<Loader />}</p>; // Loading message
  }

  return (
    <>
      {lateComingsData.length > 0 ? (
        <DataTable rows={lateComingsData} columns={columns} />
      ) : (
        <p>Congratulations, everyone is on time!</p>
      )}
    </>
  );
};

export default LateComingReport;
