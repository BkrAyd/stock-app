import { useEffect, useState } from "react"
import useStockRequests from "../services/useStockRequests"

import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import ProductModal from "../components/ProductModal"
import ProductTable from "../components/ProductTable"
import { useSelector } from "react-redux"
import { NoDataMessage, TableSkelthon } from "../components/Messages"

const Products = () => {
  const { getStock } = useStockRequests()

  const { error, products, loading } = useSelector((state) => state.stock)

  const initialState = { categoryId: "", brandId: "", name: "" }
  const [data, setData] = useState(initialState)

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setData(initialState)
  }

  useEffect(() => {
    getStock("products")
    getStock("categories")
    getStock("brands")
  }, [])

  return (
    <div>
      <Typography variant="h5" color={"error"} mb={2}>
        Products
      </Typography>
      <Button
        variant="contained"
        sx={{ mb: 2 }}
        onClick={handleOpen}
        disabled={error}
      >
        NEW PRODUCT
      </Button>

      {/* {error && <ErrorMessage />}
      {!error && <ProductTable />} */}

      {loading && <TableSkelthon />}
      {!loading && !products.length && <NoDataMessage />}
      {!loading && products.length > 0 && <ProductTable />}

      <ProductModal
        open={open}
        handleClose={handleClose}
        data={data}
        setData={setData}
      />
    </div>
  )
}

export default Products