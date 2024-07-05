//

import { DataTable } from "./DataTable";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "./UserContext";
import DownloadCSVReport from "./DownladReport"; // Assuming the download function is in this file
import { toast } from "react-hot-toast";

const RemainingLeavesReport = () => {
  const [users, setUsers] = useState([]);
  const { Api_EndPoint } = useContext(UserContext);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${Api_EndPoint}/api/users`);
      setUsers(response.data.users);
      console.log(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const leaveColumns = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "leaveCount", headerName: "Remaining Leaves", width: 150 },
    { field: "unpaidLeaves", headerName: "Unpaid Leaves", width: 150 },
  ];

  const leaveRows = users.map((user, index) => ({
    id: index + 1,
    name: user.name,
    leaveCount: user.leaveCount,
    unpaidLeaves: user.unpaidLeaves,
  }));

  const handleDownloadCSV = () => {
    DownloadCSVReport(leaveRows, "remaining_leaves");
  };

  return (
    <div>
      <h2>Employee Leave Report</h2>
      <button
        className="font-bold py-2 px-4 rounded mb-4 btn-style"
        onClick={handleDownloadCSV}
      >
        Download CSV
      </button>
      <DataTable columns={leaveColumns} rows={leaveRows} />
    </div>
  );
};

export default RemainingLeavesReport;
