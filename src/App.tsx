import React from 'react'

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'

import CryptoTab from './components/CryptoTab'
import ForexTab from './components/ForexTab'

const App = () => {
  const [selectedTab, setSelectedTab] = React.useState('Crypto')

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue)
  }

  return (
    <div className='app'>
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          textColor='secondary'
          indicatorColor='secondary'
          aria-label='secondary tabs example'
        >
          <Tab value='Crypto' label='Crypto' />
          <Tab value='Forex' label='Forex' />
        </Tabs>
      </Box>
      {selectedTab === 'Crypto' && <CryptoTab />}
      {selectedTab === 'Forex' && <ForexTab />}
    </div>
  )
}

export default App
