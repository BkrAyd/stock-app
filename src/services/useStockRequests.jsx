// import axios from "axios"
import { useDispatch } from "react-redux"
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify"
import {
  fetchFail,
  fetchStart,
  getProSaleBraSuccess,
  //   getFirmsSuccess,
  //   getSalesSuccess,
  getStockSuccess,
} from "../features/stockSlice"
import useAxios from "./useAxios"

const useStockRequests = () => {
  //   const { token } = useSelector((state) => state.auth)
  const { axiosToken } = useAxios()
  const dispatch = useDispatch()

  //   const getFirms = async () => {
  //     dispatch(fetchStart())
  //     try {
  //       const { data } = await axios(`${process.env.REACT_APP_BASE_URL}/firms`, {
  //         headers: { Authorization: `Token ${token}` },
  //       })
  //       dispatch(getFirmsSuccess(data.data))
  //       console.log(data)
  //     } catch (error) {
  //       dispatch(fetchFail())
  //       console.log(error)
  //     }
  //   }

  //   const getSales = async () => {
  //     dispatch(fetchStart())
  //     try {
  //       const { data } = await axios(`${process.env.REACT_APP_BASE_URL}/sales`, {
  //         headers: { Authorization: `Token ${token}` },
  //       })
  //       dispatch(getSalesSuccess(data.data))
  //       console.log(data)
  //     } catch (error) {
  //       dispatch(fetchFail())
  //       console.log(error)
  //     }
  //   }

  //   const getStock = async (path) => {
  //     dispatch(fetchStart())
  //     try {
  //       const { data } = await axios(
  //         `${process.env.REACT_APP_BASE_URL}/${path}`,
  //         {
  //           headers: { Authorization: `Token ${token}` },
  //         }
  //       )
  //       //   const stockData = data.data
  //       dispatch(getStockSuccess({ data: data.data, path }))
  //       console.log(data)
  //     } catch (error) {
  //       dispatch(fetchFail())
  //       console.log(error)
  //     }
  //   }

  const getStock = async (path) => {
    dispatch(fetchStart())
    try {
      const { data } = await axiosToken.get(path)
      dispatch(getStockSuccess({ data: data.data, path }))
    } catch (error) {
      toastErrorNotify(`${path} çekme başarısız oldu.`)
      dispatch(fetchFail())
      console.log(error)
    }
  }

  const deleteStock = async (path, id) => {
    dispatch(fetchStart())
    try {
      await axiosToken.delete(`${path}/${id}`)
      getStock(path)
      toastSuccessNotify(`Silme işlemi başarılı.`)
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify("Silme işlemi başarısız oldu.")
    }
  }

  const postStock = async (path, data) => {
    dispatch(fetchStart())
    try {
      await axiosToken.post(path, data)
      toastSuccessNotify(`Veri ekleme başarılı.`)
      getStock(path)
    } catch (error) {
      toastErrorNotify("Ekleme işlemi başarısız oldu.")
      dispatch(fetchFail())
    }
  }

  const putStock = async (path, data) => {
    dispatch(fetchStart())
    try {
      await axiosToken.put(`${path}/${data._id}`, data)
      toastSuccessNotify(`Güncelleme başarılı.`)
      getStock(path)
    } catch (error) {
      dispatch(fetchFail())
      toastErrorNotify("Güncelleme başarısız oldu.")
      console.log(error)
    }
  }

  const getProSaleBrand = async () => {
    dispatch(fetchStart())
    try {
      const [pro, sal, bra] = await Promise.all([
        axiosToken("products"),
        axiosToken("sales"),
        axiosToken("brands"),
      ])
      const products = pro.data.data
      const sales = sal.data.data
      const brands = bra.data.data
      dispatch(getProSaleBraSuccess({ products, sales, brands }))
    } catch (error) {
      toastErrorNotify(`çekme başarısız oldu.`)
      dispatch(fetchFail())
      console.log(error)
    }
  }

  //   return { getFirms, getSales }
  return { getStock, deleteStock, postStock, putStock, getProSaleBrand }
}

export default useStockRequests