import * as React from "react"
import Box from "@mui/material/Box"
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid"
import DeleteIcon from "@mui/icons-material/Delete"
import { useSelector } from "react-redux"
import useStockRequests from "../services/useStockRequests"

const getRowId = (row) => row._id

export default function ProductTable() {
  const { deleteStock } = useStockRequests()
  const { products } = useSelector((state) => state.stock)

  const columns = [
    { field: "_id", headerName: "#", flex: 1.2, minWidth: 140 },
    {
      field: "categoryId",
      headerName: "Categories",
      flex: 1,
      minWidth: 140,
      align: "center",
      headerAlign: "center",
      // valueGetter: (value, row) => {
      //   console.log("ROW:", row, "VALUE:", value)
      //   //   return row.categoryId.name
      //   return value.name
      // },
      valueGetter: (value) => value?.name,
    },
    {
      field: "brandId",
      headerName: "Brands",
      flex: 1,
      minWidth: 140,
      align: "center",
      headerAlign: "center",
      valueGetter: (value) => value?.name,
      width: 150,
    },
    {
      field: "name",
      headerName: "Name",
      type: "number",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 140,
    },
    {
      field: "quantity",
      headerName: "Stock",
      type: "number",
      flex: 1,
      align: "center",
      headerAlign: "center",
      minWidth: 90,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Operations",
      getActions: (props) => {
        // console.log(props)
        return [
          <GridActionsCellItem
            icon={<DeleteIcon />}
            onClick={() => deleteStock("products", props.id)}
            label="Delete"
          />,
        ]
      },
    },
  ]

  return (
    <Box sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <DataGrid
        rows={products}
        columns={columns}
        disableRowSelectionOnClick
        getRowId={getRowId}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </Box>
  )
}