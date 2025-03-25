import * as React from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardMedia from "@mui/material/CardMedia"
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline"
import EditIcon from "@mui/icons-material/Edit"
import { CardHeader } from "@mui/material"
import useStockRequests from "../services/useStockRequests"
import { butonStyle } from "../style/globalStyles"

const BrandCard = ({ brand, handleOpen, setData }) => {
  const { deleteStock } = useStockRequests()

  return (
    <Card
      elevation={10}
      sx={{
        p: 2,
        width: "300px",
        height: "400px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <CardHeader title={brand?.name} />

      <CardMedia
        image={brand?.image}
        sx={{ p: 1, objectFit: "contain", height: "250px" }}
        component="img"
        alt="brand-img"
      />

      <CardActions>
        <EditIcon
          sx={butonStyle}
          onClick={() => {
            setData(brand)
            handleOpen()
          }}
        />
        <DeleteOutlineIcon
          sx={butonStyle}
          onClick={() => deleteStock("brands", brand._id)}
        />
      </CardActions>
    </Card>
  )
}

export default BrandCard