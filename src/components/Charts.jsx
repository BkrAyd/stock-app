import { AreaChart } from "@tremor/react"
import { useSelector } from "react-redux"
import Stack from "@mui/material/Stack"
const dataFormatter = (number) =>
  `$${Intl.NumberFormat("tr").format(number).toString()}`

const Charts = () => {
  const { sales, purchases } = useSelector((state) => state.stock)

  console.log(sales)

  const salesData = sales.map((sale) => ({
    salesAmount: sale.amount,
    date: new Date(sale.createdAt).toLocaleDateString("tr-TR"),
  }))

  const purchasesData = purchases.map((pur) => ({
    purAmount: pur.amount,
    date: new Date(pur.createdAt).toLocaleDateString("tr-TR"),
  }))

  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection="column"
      flexWrap={"wrap"}
    >
      <AreaChart
        className="h-80"
        data={salesData}
        index="date"
        categories={["salesAmount"]}
        colors={["indigo"]}
        valueFormatter={dataFormatter}
        yAxisWidth={80}
      />
      <AreaChart
        className="h-80"
        data={purchasesData}
        index="date"
        categories={["purAmount"]}
        colors={["red"]}
        valueFormatter={dataFormatter}
        yAxisWidth={80}
      />
    </Stack>
  )
}
export default Charts