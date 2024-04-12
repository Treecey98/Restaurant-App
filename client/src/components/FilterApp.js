import '../index.css'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import 'mapbox-gl/dist/mapbox-gl.css'
import {Marker, Map} from 'react-map-gl'
import MarkerImage from '../mapmarker.png'

const options = {
  headers: {
    'X-RapidAPI-Key': '6a718b9d04msh9b34d559ba5ee03p16eec7jsnf3727a08cd12',
    'X-RapidAPI-Host': 'wyre-data.p.rapidapi.com'
  }
};

function Filter() {

    let {userId} = useParams();

    const[userAddressDetails, setAddressDetails] = useState([])

    useEffect(() => {
        Axios.get(`http://localhost:3001/userDetails/${userId}`).then((response) => {
            setAddressDetails(response.data[0])
        })
    }, []);

    const URL = `https://wyre-data.p.rapidapi.com/restaurants/localauthority/${userAddressDetails.address2}`

    // const [show, showContainer] = useState(true);

    const [randomRestaurants, setRandomRestaurants] = useState();

    const restaurantData = randomRestaurants;

    console.log(restaurantData);

    const listOfPlaces = async () => {

        try {
            const totalRestaurants = [];
            const fiveRestaurants = [];
            const data = await Axios.get(URL, options)

            data.data.forEach((element, index, array) => {
                if (element.BusinessType === "Restaurant/Cafe/Canteen"){
                    totalRestaurants.push(element)
                }
            })

            const maxNumber = totalRestaurants.length;

            const numberOfRestaurants = 5;
            var i;

            for(i=0; i<numberOfRestaurants ;i++){
                const randomIndex = Math.floor(Math.random() * maxNumber + 1)
                fiveRestaurants.push(totalRestaurants[randomIndex]);
            }

            setRandomRestaurants(fiveRestaurants);

        } catch (error){
            console.log(error)
        }
    }

    return (
        <div>
            <h2 className="filter-header">Find a local place to eat at!</h2>
                <div className="filter-search-btn">
                    <button className="search-btn" onClick={() => listOfPlaces()}>Search</button>
                </div>

                <Map
                    mapboxAccessToken= {process.env.REACT_APP_MAPBOX}
                    initialViewState={{
                        longitude: -0.11,
                        latitude: 51.50,
                        zoom: 10
                }}
                style={{width: "100%", height: 442}}
                mapStyle="mapbox://styles/mapbox/dark-v11"
                > 

                {restaurantData?.map((data) => {
                    return <Marker
                            key={data.id}
                            longitude={data.Geocode_Longitude}
                            latitude={data.Geocode_Latitude}
                            anchor = "bottom"
                            >
                                <img className="map-markers" src={MarkerImage} alt="Marker" />
                            </Marker>
                })} 

                </Map>

        </div>
    )
}

export default Filter

// {show ? "filter--container" : "filter--container-hidden"}
