import { useSelector } from "react-redux"
import useStockRequests from "../services/useStockRequests"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { butonStyle } from "../style/globalStyles"
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid"
import Box from "@mui/material/Box"

const PurchaseTable = ({ setData, handleOpen }) => {
  const { purchases } = useSelector((state) => state.stock)
  const { deleteStock } = useStockRequests()

  const getRowId = (row) => row._id

  const columns = [
    {
      field: "createdAt",
      headerName: "Date",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return new Date(row.createdAt).toLocaleString("de-DE")
      },
    },
    {
      field: "firmId",
      headerName: "Firm",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => row?.firmId?.name,
    },
    {
      field: "brandId",
      headerName: "Brand",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => row?.brandId?.name,
    },
    {
      field: "productID",
      headerName: "Product",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => row?.productId?.name,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 40,
      headerAlign: "center",
      align: "center",
      renderCell: ({
        row: { brandId, productId, quantity, price, firmId, _id },
      }) => {
        return [
          <GridActionsCellItem
            key={"edit"}
            icon={<EditIcon />}
            label="Edit"
            onClick={() => {
              handleOpen()
              setData({ _id, brandId, productId, quantity, price, firmId })
            }}
            sx={butonStyle}
          />,
          <GridActionsCellItem
            key={"delete"}
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deleteStock("purchases", _id)}
            sx={butonStyle}
          />,
        ]
      },
    },
  ]
  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      <DataGrid
        rows={purchases}
        columns={columns}
        pageSizeOptions={[20, 50, 75, 100]} //? sayfa basina satir sayisi
        disableRowSelectionOnClick
        slots={{ toolbar: GridToolbar }}
        getRowId={getRowId}
      />
    </Box>
  )
}

export default PurchaseTable