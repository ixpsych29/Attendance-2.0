import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ rows, columns }) => {
  // Ensure each row has a unique id
  const rowsWithId = rows.map((row, index) => ({
    ...row,
    id: row.id || index + 1,
  }));

  return (
    <div style={{ height: 475, width: "100%" }}>
      <DataGrid
        rows={rowsWithId}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 7 },
          },
        }}
        pageSizeOptions={[7, 10, 20]}
        checkboxSelection
      />
    </div>
  );
};

export { DataTable }; // Export DataTable
