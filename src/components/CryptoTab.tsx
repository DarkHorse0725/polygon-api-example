import { useState, useEffect } from 'react'
import { websocketClient } from '@polygon.io/client-js'

import Box from '@mui/material/Box'

import TableComponent from './TableComponent'

const CryptoTab = () => {
  const [cryptoLists, setCryptoLists] = useState<any>([])
  const [realCryptoData, setRealCryptoData] = useState<any>(null)
  const [cryptoWS, setCryptoWS] = useState<any>(null)

  const APIKEY = process.env.REACT_APP_POLYGON_API_KEY as string

  const getCryptoData = () => {
    cryptoWS.onmessage = (data: any) => {
      cryptoWS.send(
        '{"action":"subscribe","params":"XT.X:BTC-USD,XT.X:ETH-USD"}',
      )
      const cryptoData = JSON.parse(data.data)[0]
      if (cryptoData && cryptoData.pair) {
        setRealCryptoData({
          pair: cryptoData.pair,
          price: cryptoData.p,
          timestamp: cryptoData.t,
        })
      }
    }
  }

  useEffect(() => {
    const _cryptoWS = websocketClient(APIKEY).crypto()
    setCryptoWS(_cryptoWS)
  }, [APIKEY])

  useEffect(() => {
    if (cryptoWS) {
      getCryptoData()

      cryptoWS.onclose = (event: any) => {
        const _cryptoWS = websocketClient(APIKEY).crypto()
        setCryptoWS(_cryptoWS)
      }
    }
  }, [cryptoWS])

  setTimeout(() => {
    if (cryptoWS) {
      getCryptoData()
    }
  }, 5 * 1000)

  useEffect(() => {
    const tempCryptoList = cryptoLists
    if (realCryptoData) {
      tempCryptoList.push(realCryptoData)
      tempCryptoList.sort((a: any, b: any) => b.timestamp - a.timestamp)
      const lastCrytoList = tempCryptoList.slice(0, 20)
      setCryptoLists(lastCrytoList)
    }
  }, [realCryptoData])

  return (
    <Box>
      <TableComponent data={cryptoLists} />
    </Box>
  )
}

export default CryptoTab
