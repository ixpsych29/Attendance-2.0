import DataTable from "./DataTable";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import toast from "react-hot-toast";

const RemainingLeavesReport = () => {
  const [user, setUser] = useState([]);
  const { Api_EndPoint, nameUser, leaveCount, unpaidLeaves } =
    useContext(UserContext);

  const fetchUserLeaves = async () => {
    try {
      const response = await axios.get(`${Api_EndPoint}/api/users`);

      // Filter users by role 'user' and map to include remaining leave data
      const usersWithRemainingLeaves = response.data
        .filter((user) => user.role === "user")
        .map((user) => ({
          id: user.username,
          name: user.name,
          remainingLeaves: user.leaveCount,
          unpaidLeaves: user.unpaidLeaves,
        }));

      setUser(usersWithRemainingLeaves);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error fetching users");
    }
  };

  useEffect(() => {
    fetchUserLeaves();
  }, []);

  const leaveColumns = [
    { field: "id", headerName: "ID", width: 200 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "remainingLeaves", headerName: "Remaining Leaves", width: 150 },
    { field: "unpaidLeaves", headerName: "Unpaid Leaves", width: 150 },
  ];

  const leaveRows = user.map((user, index) => ({
    id: index + 1, // Use index as the ID
    name: user.name,
    remainingLeaves: user.remainingLeaves,
    unpaidLeaves: user.unpaidLeaves,
  }));

  return (
    <div>
      <DataTable columns={leaveColumns} rows={leaveRows} />
    </div>
  );
};

export default RemainingLeavesReport;
