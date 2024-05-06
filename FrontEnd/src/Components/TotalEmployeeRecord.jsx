import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const TotalEmployeeRecord = ({ users, handleEdit, handleDelete }) => {
  return (
    <Table
      stickyHeader
      sx={{
        minWidth: 650,
        mt: 3,
      }}
      size="small"
      aria-label="a dense table"
      className="w-full border-collapse">
      <TableHead className="bg-gray-200">
        <TableRow>
          <TableCell align="center" className="px-4 py-2">
            Name
          </TableCell>
          <TableCell align="center" className="px-4 py-2">
            User Name
          </TableCell>
          <TableCell align="center" className="px-4 py-2">
            Email
          </TableCell>
          <TableCell align="center" className="px-4 py-2">
            Phone Number
          </TableCell>
          <TableCell align="center" className="px-4 py-2">
            Edit
          </TableCell>
          <TableCell align="center" className="px-4 py-2">
            Delete
          </TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {users
          .sort((a, b) => a.name.localeCompare(b.name)) // Sort users alphabetically by name
          .map((user) => (
            <TableRow key={user.id}>
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
                <IconButton aria-label="edit" onClick={() => handleEdit(user)}>
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
  );
};

export default TotalEmployeeRecord;
