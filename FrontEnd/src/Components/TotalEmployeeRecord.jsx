import React, { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import UserContext from "./UserContext";

const TotalEmployeeRecord = ({ users, handleEdit, handleDelete }) => {
  const { Api_EndPoint } = useContext(UserContext);

  console.log("usersssss", users);
  return (
    <>
      <Table
        stickyHeader
        sx={{
          minWidth: 650,
          mt: 3,
        }}
        size="small"
        aria-label="a dense table"
        className="w-full border-collapse">
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              className="px-4 py-2 "
              style={{ backgroundColor: "#DBF3FA", color: "black" }}>
              Picture
            </TableCell>
            <TableCell
              align="center"
              className="px-4 py-2 "
              style={{ backgroundColor: "#DBF3FA", color: "black" }}>
              Name
            </TableCell>
            <TableCell
              align="center"
              className="px-4 py-2"
              style={{ backgroundColor: "#DBF3FA", color: "black" }}>
              User Name
            </TableCell>
            <TableCell
              align="center"
              className="px-4 py-2"
              style={{ backgroundColor: "#DBF3FA", color: "black" }}>
              Email
            </TableCell>
            <TableCell
              align="center"
              className="px-4 py-2"
              style={{ backgroundColor: "#DBF3FA", color: "black" }}>
              Phone Number
            </TableCell>
            <TableCell
              align="center"
              className="px-4 py-2"
              style={{ backgroundColor: "#DBF3FA", color: "black" }}>
              Edit
            </TableCell>
            <TableCell
              align="center"
              className="px-4 py-2"
              style={{ backgroundColor: "#DBF3FA", color: "black" }}>
              Delete
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users
            .sort((a, b) => a.name.localeCompare(b.name)) // Sort users alphabetically by name
            .map((user) => (
              <TableRow key={user.id}>
                <TableCell align="center" className="px-6 py-2">
                  <img
                    src={
                      user.profilePicture
                        ? `${Api_EndPoint}/uploads/Images/${user.profilePicture}`
                        : "path/to/default/avatar.jpg"
                    }
                    className="ml-20 mt-2 mb-2"
                    alt="Profile Picture"
                    style={{ width: 50, height: 50, borderRadius: "50%" }}
                  />
                </TableCell>

                <TableCell align="center" className="px-4 py-2">
                  {user.name}
                </TableCell>
                <TableCell align="center" className="px-4 py-2">
                  {user.username}
                </TableCell>
                <TableCell align="center" className="px-4 py-2">
                  {user.email}
                </TableCell>
                <TableCell align="center" className="px-4 py-2">
                  {user.phoneNumber}
                </TableCell>
                <TableCell align="center" className="px-4 py-2">
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEdit(user)}>
                    <Edit />
                  </IconButton>
                </TableCell>
                <TableCell align="center" className="px-4 py-2">
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDelete(user)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TotalEmployeeRecord;
