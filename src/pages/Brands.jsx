import { Typography, Box, Grid, Button } from "@mui/material"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import BrandCard from "../components/BrandCard"
import BrandModal from "../components/BrandModal"
import useStockRequests from "../services/useStockRequests"
import { NoDataMessage, CardSkeleton } from "../components/Messages"

const Brands = () => {
  const { getStock } = useStockRequests()
  const { brands, loading } = useSelector((state) => state.stock)
  const [data, setData] = useState({ name: "", image: "" })

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    setData({ name: "", image: "" })
  }

  useEffect(() => {
    getStock("brands")
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Typography variant="h4" color="error" mb={2}>
        Brands
      </Typography>

      <Button variant="contained" onClick={handleOpen}>
        New Brand
      </Button>

      {loading && (
        <CardSkeleton>
          <BrandCard />
        </CardSkeleton>
      )}

      {!loading && !brands.length && <NoDataMessage />}
      {!loading && brands.length > 0 && (
        <Grid container gap={2} mt={3} justifyContent={"center"}>
          {brands?.map((brand) => (
            <Grid item key={brand._id}>
              <BrandCard
                brand={brand}
                handleOpen={handleOpen}
                setData={setData}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <BrandModal
        open={open}
        handleClose={handleClose}
        data={data}
        setData={setData}
      />
    </Box>
  )
}

export default Brands