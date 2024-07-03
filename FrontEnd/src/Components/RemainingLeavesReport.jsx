import { DataTable } from "./DataTable";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "./UserContext";

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

  return (
    <div>
      <h2>Employee Leave Report</h2>
      <DataTable columns={leaveColumns} rows={leaveRows} />
    </div>
  );
};

export default RemainingLeavesReport;
