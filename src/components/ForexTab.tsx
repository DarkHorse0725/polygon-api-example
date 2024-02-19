import { useState, useEffect } from 'react'
import { websocketClient } from '@polygon.io/client-js'

import Box from '@mui/material/Box'

import TableComponent from './TableComponent'

const ForexTab = () => {
  const [forexLists, setForexLists] = useState<any>([])
  const [realForexData, setRealForexData] = useState<any>(null)
  const [forexWS, setForexWS] = useState<any>(null)

  const APIKEY = process.env.REACT_APP_POLYGON_API_KEY as string

  const getForexData = () => {
    forexWS.onmessage = (data: any) => {
      forexWS.send('{"action":"subscribe","params":"C.C:EUR-USD,C.C:JPY-USD"}')
      const forexData = JSON.parse(data.data)[0]
      if (forexData && forexData.p) {
        setRealForexData({
          pair: forexData.p,
          price: forexData.a + "/" + forexData.b,
          timestamp: forexData.t,
        })
      }
    }
  }

  useEffect(() => {
    const _forexWS = websocketClient(APIKEY).forex()
    setForexWS(_forexWS)
  }, [APIKEY])

  useEffect(() => {
    if (forexWS) {
      getForexData()

      forexWS.onclose = (event: any) => {
        const _forexWS = websocketClient(APIKEY).forex()
        setForexWS(_forexWS)
      }
    }
  }, [forexWS])

  setTimeout(() => {
    if (forexWS) {
      getForexData()
    }
  }, 5 * 1000)

  useEffect(() => {
    const tempForexList = forexLists
    if (realForexData) {
      tempForexList.push(realForexData)
      tempForexList.sort((a: any, b: any) => b.timestamp - a.timestamp)
      const lastCrytoList = tempForexList.slice(0, 20)
      setForexLists(lastCrytoList)
    }
  }, [realForexData])

  return (
    <Box>
      {forexLists.length > 0 && (<TableComponent data={forexLists} />)}
    </Box>
  )
}

export default ForexTab
