import './index.css'
import 'mapbox-gl/dist/mapbox-gl.css'
// import React, { useState } from 'react'
import Map from 'react-map-gl'

function InteractiveMap() {

  return (
    <Map
      mapboxAccessToken= {process.env.REACT_APP_MAPBOX}
      initialViewState={{
        longitude: -0.11,
        latitude: 51.50,
        zoom: 11
      }}
      style={{width: 1400, height: 632}}
      mapStyle="mapbox://styles/mapbox/dark-v11"
    />
  );
}

export default InteractiveMap