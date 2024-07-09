// import React, { useState, useContext, useEffect } from "react";
// import { DataTable } from "./DataTable";
// import axios from "axios";
// import UserContext from "./UserContext";
// import FormatDateTime from "./FormatDateTime";
// import Loader from "../Loader/Loader";
// import DownloadCSVReport from "./DownladReport";
// import { toast } from "react-hot-toast";

// const LateComingReport = () => {
//   const { Api_EndPoint } = useContext(UserContext);
//   const [lateComingsData, setLateComingsData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const columns = [
//     { field: "username", headerName: "Username", width: 150 },
//     { field: "leavingTime", headerName: "Leaving Time", width: 180 },
//     { field: "entranceTime", headerName: "Entrance Time", width: 180 },
//     { field: "entranceDate", headerName: "Entrance Date", width: 120 },
//   ];

//   useEffect(() => {
//     const fetchLateComingsData = async () => {
//       try {
//         const response = await axios.get(`${Api_EndPoint}/api/attendance/all/`);
//         if (response.status === 200) {
//           const formattedData = response.data.map((item, index) => {
//             const entranceDateTime = item.entranceTime
//               ? FormatDateTime(item.entranceTime)
//               : { formattedDate: "-", formattedTime: "-" };
//             const leavingDateTime = item.leavingTime
//               ? FormatDateTime(item.leavingTime)
//               : { formattedDate: "-", formattedTime: "-" };

//             return {
//               id: index + 1,
//               username: item.username,
//               entranceTime: entranceDateTime.formattedTime,
//               entranceDate: entranceDateTime.formattedDate,
//               leavingTime: leavingDateTime.formattedTime,
//               date: item.date,
//             };
//           });

//           setLateComingsData(formattedData);
//         } else {
//           console.error("Failed to fetch late comings data:", response.status);
//         }
//       } catch (error) {
//         console.error("Error fetching late comings:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLateComingsData();
//   }, [Api_EndPoint]);

//   const handleDownloadCSV = () => {
//     DownloadCSVReport(lateComingsData, "late_comings");
//   };

//   if (loading) {
//     return (
//       <p>
//         <Loader />
//       </p>
//     );
//   }

//   return (
//     <>
//       <h1 className="text-center font-bold text-3xl">Late Coming Report</h1>
//       <button
//         onClick={handleDownloadCSV}
//         className="font-bold py-2 px-4 rounded mb-4 btn-style"
//       >
//         Download CSV
//       </button>

//       {lateComingsData.length > 0 ? (
//         <div className="overflow-x-auto">
//           <DataTable rows={lateComingsData} columns={columns} />
//         </div>
//       ) : (
//         <p>Congratulations, everyone is on time!</p>
//       )}
//     </>
//   );
// };

// export default LateComingReport;
import React, { useState, useContext, useEffect } from "react";
import { DataTable } from "./DataTable";
import axios from "axios";
import UserContext from "./UserContext";
import FormatDateTime from "./FormatDateTime";
import Loader from "../Loader/Loader";
import DownloadCSVReport from "./DownladReport";

const LateComingReport = () => {
  const { Api_EndPoint } = useContext(UserContext);
  const [lateComingsData, setLateComingsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { field: "username", headerName: "Username", width: 150 },
    { field: "leavingTime", headerName: "Leaving Time", width: 180 },
    { field: "entranceTime", headerName: "Entrance Time", width: 180 },
    { field: "entranceDate", headerName: "Entrance Date", width: 120 },
  ];

  useEffect(() => {
    const fetchLateComingsData = async () => {
      try {
        const response = await axios.get(`${Api_EndPoint}/api/attendance/late`);
        if (response.status === 200) {
          const formattedData = response.data.map((item, index) => {
            const entranceDateTime = item.entranceTime
              ? FormatDateTime(item.entranceTime)
              : { formattedDate: "-", formattedTime: "-" };
            const leavingDateTime = item.leavingTime
              ? FormatDateTime(item.leavingTime)
              : { formattedDate: "-", formattedTime: "-" };

            return {
              id: index + 1,
              username: item.username,
              entranceTime: entranceDateTime.formattedTime,
              entranceDate: entranceDateTime.formattedDate,
              leavingTime: leavingDateTime.formattedTime,
            };
          });

          setLateComingsData(formattedData);
        } else {
          console.error("Failed to fetch late comings data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching late comings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLateComingsData();
  }, [Api_EndPoint]);

  const handleDownloadCSV = () => {
    DownloadCSVReport(lateComingsData, "late_comings");
  };

  if (loading) {
    return (
      <p>
        <Loader />
      </p>
    );
  }

  return (
    <>
      <h1 className="text-center font-bold text-3xl">Late Coming Report</h1>
      <button
        onClick={handleDownloadCSV}
        className="font-bold py-2 px-4 rounded mb-4 btn-style"
      >
        Download CSV
      </button>

      {lateComingsData.length > 0 ? (
        <div className="overflow-x-auto">
          <DataTable rows={lateComingsData} columns={columns} />
        </div>
      ) : (
        <p>Congratulations, everyone is on time!</p>
      )}
    </>
  );
};

export default LateComingReport;
