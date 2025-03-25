import React from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import TextField from "@mui/material/TextField"
import useStockRequests from "../services/useStockRequests"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
}

export default function BrandModal({ open, handleClose, data, setData }) {
  const { postStock, putStock } = useStockRequests()

  const handleChange = (e) => {
    e.preventDefault()
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()

    if (data._id) {
      putStock("brands", data)
    } else {
      postStock("brands", data)
    }
    handleClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          component={"form"}
          onSubmit={handleSubmit}
        >
          <TextField
            label="Brand Name"
            name="name"
            id="name"
            type="text"
            variant="outlined"
            value={data.name}
            onChange={handleChange}
            required
          />

          <TextField
            label="Image Url"
            name="image"
            id="image"
            type="url"
            variant="outlined"
            value={data.image}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained" size="large">
            Save Brand
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}