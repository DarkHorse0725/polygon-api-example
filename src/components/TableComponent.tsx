import { Box } from '@mui/material'

const TableComponent = ({ data }: { data: any[] }) => {
  return (
    <Box>
      {data.map((row: any, index: number) => (
        <Box display={`flex`} gap={`20px`} p={`20px`} key={index}>
          <Box>{index + 1}</Box>
          <Box
            color={
              row.pair === 'BTC-USD' || row.pair === 'EUR/USD' ? 'red' : 'blue'
            }
          >
            {row.pair}
          </Box>
          <Box>{row.price}</Box>
          <Box>{<DateFormat ts={row.timestamp} />}</Box>
        </Box>
      ))}
    </Box>
  )
}
interface DateFormatInterface {
  ts: number
}
const DateFormat = (props: DateFormatInterface) => {
  const { ts } = props
  const dt = new Date(ts)

  return (
    <>
      {dt.getHours() +
        ':' +
        dt.getMinutes() +
        ':' +
        dt.getSeconds() +
        ' ' +
        (dt.getMonth() + 1) +
        '/' +
        dt.getDate() +
        '/' +
        dt.getFullYear()}
    </>
  )
}
export default TableComponent
