import '../index.css'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import 'mapbox-gl/dist/mapbox-gl.css'
import {Marker, Map, Popup} from 'react-map-gl'
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

    const [randomRestaurants, setRandomRestaurants] = useState([]);

    const restaurantData = randomRestaurants;
    console.log(restaurantData)

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

    const [viewport, setViewport] = useState({
        longitude: -0.11,
        latitude: 51.50,
        zoom: 5
    })

    const changeViewPoint = (updatedLocation) => {
        if(updatedLocation !== undefined){
            setViewport({
                longitude: updatedLocation[0].Geocode_Longitude,
                latitude: updatedLocation[0].Geocode_Latitude,
                zoom: 10,
            })
        }
        console.log(viewport);
    }

    const [hideButton, setHideButton] = useState(false);
    const [disabledButton, setDisabledButton] = useState(true)

    const [popUpOpen, setPopUpOpen] = useState({});

    return (
        <div>
            <div className="filter-container">
                <h2 className="filter-header">Find a local place to eat out!</h2>
                    <div className="filter-buttons">
                        <div>
                            <button className="search-btn" onClick={() => {
                                listOfPlaces()
                                setDisabledButton(false)
                                }}
                            >Search</button>
                        </div>

                        <div>
                            <button className={`zoom-btn-${hideButton ? "hide" : "show" }`} onClick={() => {
                                changeViewPoint(restaurantData)
                                setHideButton(true)}}
                                disabled={disabledButton}
                                >Zoom</button>
                        </div>
                    </div>
                    
            </div>

            
            
            <div className="map-container">
                <Map
                    mapboxAccessToken= {process.env.REACT_APP_MAPBOX}
                    {...viewport}
                    onIdle={() => changeViewPoint()}
                    style={{width: "100%", height: "80vh"}}
                    mapStyle="mapbox://styles/mapbox/dark-v11"
                > 

                <h3 
                className={`no-data-message-${restaurantData.length > 0 && restaurantData[0] === undefined ? "show" : "hide"}`}
                >Council/borough is not correct, please update this in your profile.</h3>

                {restaurantData[0] !== undefined && restaurantData?.map((data, index) => {
                    return <div key={data._id}>
                        <Marker
                            key={index}
                            longitude={data.Geocode_Longitude}
                            latitude={data.Geocode_Latitude}
                            onClick={(e) => {
                                e.originalEvent.stopPropagation();
                                setPopUpOpen({ [data._id]: true });}}
                            anchor = "bottom"
                            >
                            <img className="map-markers" src={MarkerImage} alt="Marker" />
                        </Marker>

                        {popUpOpen[data._id] && (
                        
                            <Popup
                                key={index}
                                longitude={data.Geocode_Longitude}
                                latitude={data.Geocode_Latitude}
                                onClose={() => setPopUpOpen(false)}
                                closeButton={true}
                                offsetLeft={10}
                            >
                                <span>
                                    <h4 className="map-marker-title">{data.BusinessName}</h4>
                                    
                                    <h4>Address</h4>
                                    <p>{data.AddressLine2}</p>
                                    <p>{data.AddressLine3}</p>
                                    <p>{data.PostCode}</p>
                                    
                                </span>
                            </Popup>
                        
                        )}
                    </div>

                })} 

                </Map>
            </div>

        </div>
    )
}

export default Filter
