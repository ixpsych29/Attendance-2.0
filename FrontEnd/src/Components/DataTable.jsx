import { DataGrid } from "@mui/x-data-grid";

const DataTable = ({ columns, rows }) => {
  return (
    <div style={{ height: 475, width: "100%" }}>
      <DataGrid
        rows={rows}
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

export default DataTable;
