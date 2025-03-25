import { useEffect, useState } from "react"
import useStockRequests from "../services/useStockRequests"
import { Button, Container } from "@mui/material"
import SaleModal from "../components/SaleModal"
import SaleTable from "../components/SaleTable"
import { TableSkelthon, NoDataMessage } from "../components/Messages"
import { useSelector } from "react-redux"

const Sales = () => {
  const { getStock, getProSaleBrand } = useStockRequests()
  const { sales, loading } = useSelector((state) => state.stock)

  const [open, setOpen] = useState(false)

  const initialState = { brandId: "", productId: "", quantity: "", price: "" }
  const [data, setData] = useState(initialState)

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setData(initialState)
  }

  useEffect(() => {
    // getStock("products")
    // getStock("sales")
    // getStock("brands")
    getProSaleBrand()
  }, []) // eslint-disable-line

  return (
    <Container maxWidth="xl">
      <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
        New Sale
      </Button>

      {loading && <TableSkelthon />}
      {!loading && !sales?.length && <NoDataMessage />}

      {!loading && sales?.length > 0 && (
        <SaleTable setData={setData} handleOpen={handleOpen} />
      )}

      <SaleModal
        open={open}
        handleClose={handleClose}
        data={data}
        setData={setData}
      />
    </Container>
  )
}

export default Sales