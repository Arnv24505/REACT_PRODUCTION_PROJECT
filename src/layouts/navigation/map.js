import React, { useEffect, useState } from 'react'
import { GoogleMap, MarkerF, PolylineF, useLoadScript } from '@react-google-maps/api'
// import './style/MapStyle.css'
import drone from './mapIcon/droneMarker.png'
import MarkerDrawer from './drawer/MarkerDrawer'
import _ from 'lodash'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

const Map = ({ markerData, markerOptions, apiKey }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: apiKey,
  })

  const [drawer, setDrawer] = useState({ open: false, close: false, markData: [] })
  const [center, setCenter] = useState()

  useEffect(() => {
    const arr = Object.values(markerData[markerData.length - 1])[0]
    setCenter(arr[arr.length - 1])
  }, [markerData])

  const handleDrawerOpen = (mark) => {
    const markerOpt = markerOptions
    setDrawer({ open: true, markData: markerOpt[mark] })
  }

  const handleDrawerClose = () => {
    setDrawer({ close: true })
  }

  const poliyOption = {
    strokeColor: '#0086c3',
    strokeOpacity: 0.75,
    strokeWeight: 2,
  }

  if (!isLoaded) {
    return (
      <Box className='progress-bar'>
        <CircularProgress className='progress-bar-inner' size={200} />
      </Box>
    )
  }
  return (
    <div>
      <GoogleMap zoom={20} center={center} mapContainerClassName='mapComponent'>
        {_.map(markerData, (mark) => {
          const id = _.findKey(mark)
          const subMark = mark[id]
          const value = _.last(subMark)
          return (
            <>
              <MarkerF
                position={value}
                icon={drone}
                key={Math.random()}
                onClick={handleDrawerOpen.bind(this, id)}
              />
              <PolylineF
                path={subMark}
                geodesic={true}
                id={Math.random()}
                key={Math.random()}
                options={poliyOption}
              />
            </>
          )
        })}
      </GoogleMap>
      {drawer.open ? (
        <MarkerDrawer
          drawerClose={handleDrawerClose}
          drawerOpen={drawer.open}
          markData={drawer.markData}
        />
      ) : null}
    </div>
  )
}

export default Map
