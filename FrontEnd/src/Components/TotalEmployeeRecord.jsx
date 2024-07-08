import { useContext, useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";

const TotalEmployeeRecord = ({ users, handleEdit, handleDelete }) => {
  const { Api_EndPoint } = useContext(UserContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (users) {
      setIsLoading(false);
    }
  }, [users]);

  const handleOpenProfile = (username) => {
    navigate("/home/empprofile", { state: { username: username } });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Table
        stickyHeader
        sx={{
          minWidth: 600,
          mt: 3,
        }}
        size="small"
        aria-label="a dense table"
        className="w-full border-collapse"
      >
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              className="px-2 py-2"
              style={{ backgroundColor: "#DBF3FA", color: "black" }}
            >
              Picture
            </TableCell>
            <TableCell
              align="center"
              className="px-2 py-2"
              style={{ backgroundColor: "#DBF3FA", color: "black" }}
            >
              Name
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
              Email
            </TableCell>
            <TableCell
              align="center"
              className="px-4 py-2"
              style={{ backgroundColor: "#DBF3FA", color: "black" }}
            >
              Phone Number
            </TableCell>
            <TableCell
              align="center"
              className="px-4 py-2"
              style={{ backgroundColor: "#DBF3FA", color: "black" }}
            >
              Edit
            </TableCell>
            <TableCell
              align="center"
              className="px-4 py-2"
              style={{ backgroundColor: "#DBF3FA", color: "black" }}
            >
              Delete
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {Array.isArray(users) && users.length > 0 ? (
            users
              .sort((a, b) =>
                a.name && b.name ? a.name.localeCompare(b.name) : 0
              )
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell align="center" className="px-6 py-2">
                    {user.profilePicture ? (
                      <img
                        src={`${Api_EndPoint}/uploads/Images/${user.profilePicture}`}
                        className="ml-20 mt-2 mb-2"
                        alt="Profile Picture"
                        style={{ width: 50, height: 50, borderRadius: "50%" }}
                      />
                    ) : (
                      <div
                        className="ml-20 mt-2 mb-2 flex items-center justify-center"
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          backgroundColor: "#ccc",
                          color: "#fff",
                          fontSize: "1.5rem",
                          fontWeight: "bold",
                        }}
                      >
                        {user.username.slice(0, 2).toUpperCase()}
                      </div>
                    )}
                  </TableCell>

                  <TableCell align="center" className="px-4 py-2">
                    {user.name}
                  </TableCell>
                  <TableCell align="center" className="px-4 py-2">
                    <Tooltip title="View Profile" arrow>
                      <span
                        onClick={() => handleOpenProfile(user.username)}
                        style={{
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                      >
                        {user.username}
                      </span>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center" className="px-4 py-2">
                    {user.email}
                  </TableCell>
                  <TableCell align="center" className="px-4 py-2">
                    {user.phoneNumber}
                  </TableCell>
                  <TableCell align="center" className="px-4 py-2">
                    <Tooltip title="Edit Profile" arrow>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEdit(user)}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                  <TableCell align="center" className="px-4 py-2">
                    <Tooltip title="Delete Profile" arrow>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(user)}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No employees to display
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default TotalEmployeeRecord;
