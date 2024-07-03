import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ rows, columns }) => {
  // Ensure each row has a unique id
  const rowsWithId = rows.map((row, index) => ({
    ...row,
    id: row.id || index + 1,
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rowsWithId}
        columns={columns}
        pageSize={5} // Default page size
        rowsPerPageOptions={[5, 10, 20]} // Optional: Customize rows per page options
        checkboxSelection
      />
    </div>
  );
};

export { DataTable }; // Export DataTable
