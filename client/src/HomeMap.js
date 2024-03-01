import './index.css'
import { useState } from 'react'
import ReactMapGL from 'react-map-gl'
import MAPBOX_TOKEN from './.env'

function InteractiveMap() {
    const [viewport, setViewport] = useState({
      width: '100%',
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 10,
    });
  
    return <ReactMapGL {...viewport} onViewportChange={setViewport} mapboxApiAccessToken={MAPBOX_TOKEN} />;
  }

function Map() {
    return(
        <div>
            <span>{InteractiveMap}</span>
        </div>
    )
}

export default Map