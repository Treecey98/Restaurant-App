import './index.css'
import 'mapbox-gl/dist/mapbox-gl.css'
// import React, { useState } from 'react'
import Map from 'react-map-gl'

function InteractiveMap() {
  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoidHJlZWNleXkiLCJhIjoiY2w2cWVjYXgwMGc1cDNqb3d5dWMzZTUxMiJ9.RXB5JWk2b5aYuq3DZPF6vA"
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width: 600, height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
}

export default InteractiveMap