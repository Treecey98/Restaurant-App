import '../index.css'
import Axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Marker, Map, Popup } from 'react-map-gl'
import MarkerImage from '../mapmarker.png'
import { fetchLocationDataByUserTown, fetchRestaurantsByLocationId, fetchRestaurantDetailsById } from '../model/TripAdvisorAPI'
import { CountryValidation } from '../util/location'
import ClearIcon from '@mui/icons-material/Clear';

function Filter() {

    let {userId} = useParams();

    const[userAddressDetails, setAddressDetails] = useState([])

    useEffect(() => {
        Axios.get(`http://localhost:3001/userDetails/${userId}`).then((response) => {
            setAddressDetails(response.data[0])
        })
    }, []);

    const [incorrectTown, setIncorrectTown] = useState(false);

    const [specificRestaurant, setRestaurant] = useState();
    const [restaurantURL, setRestaurantURL] = useState();
    const [vegetarianFriendly, setVegetarianFriendly] = useState("No");

    const [chosenCuisine, setChosenCuisine] = useState("");
    const [chosenPrice, setChosenPrice] = useState("");
        
    const restaurantData = specificRestaurant;
    const restaurantWebsite = restaurantURL;

    const restaurantCall = async () => {

        try {
            const locations = await fetchLocationDataByUserTown(userAddressDetails.address2)
            const differentLocations = {};
            const userCountry = userAddressDetails.country

            locations.data.data.forEach((element, index, array) => {
                differentLocations[element.localizedAdditionalNames.longOnlyHierarchy] = element.locationId;
            })

            let locationId = CountryValidation(differentLocations, userCountry);

            let page = 1

            const restaurantData = await fetchRestaurantsByLocationId(locationId, page)

            const totalRestaurants = [];
            const filteredRestaurants = [];
            const restaurant = [];

            restaurantData.data.data.data.forEach((element, index, array) => {
                totalRestaurants.push(element);
            })

            const numberOfRestaurantPages = restaurantData.data.data.totalPages

            if(restaurantData.data.data.totalPages > 1){
                for(var i=1; i<numberOfRestaurantPages ;i++){
                   
                    page++

                    const restaurantsData = await fetchRestaurantsByLocationId(locationId, page)
                    restaurantsData.data.data.data.forEach((element, index, array) => {
                        totalRestaurants.push(element);
                    })
                }
            }

            console.log(totalRestaurants);

            let price

            if(chosenPrice === "Cheap") {
                price = "$"
            } else if(chosenPrice === "Reasonably priced") {
                price = "$$ - $$$"
            } else if(chosenPrice === "Expensive") {
                price = "$$$$"
            } else {
                price = ""
            }

            totalRestaurants.forEach((data) => {
                if(data.establishmentTypeAndCuisineTags.includes(chosenCuisine) && data.priceTag === price){
                    filteredRestaurants.push(data);
                } else if(chosenCuisine === "" && data.priceTag === price){
                    filteredRestaurants.push(data);
                } else if(data.establishmentTypeAndCuisineTags.includes(chosenCuisine) && price === "")
                    filteredRestaurants.push(data);
            })

            const restaurantCount = totalRestaurants.length;
            const filteredRestaurantCount = filteredRestaurants.length;

            const maxRestaurantsToDisplay = 1;

            console.log(filteredRestaurants);
            console.log(filteredRestaurantCount);

            if(filteredRestaurantCount === 0){
                for(var i=0; i<maxRestaurantsToDisplay ;i++){
                    const randomIndex = Math.floor(Math.random() * (restaurantCount - 0) + 0)
                    restaurant.push(totalRestaurants[randomIndex]);
                }
            } else {
                for(var j=0; j<maxRestaurantsToDisplay ;j++){
                    const randomIndex = Math.floor(Math.random() * (filteredRestaurantCount - 0) + 0)
                    restaurant.push(filteredRestaurants[randomIndex]);
                }
            }

            const data = await fetchRestaurantDetailsById(restaurant[0].restaurantsId);
            setRestaurant(data.data.data);

            console.log(data.data.data);

            data.data.data.about.content.map((data, index) => {
                if(data.__typename === "AppPresentation_ContactSubsection"){
                    data.contactLinks.map((data, index) => {
                        if(data.link.trackingContext === "server_website"){
                            setRestaurantURL(data.link.externalUrl);
                        } 
                    })
                } 
            })

            if(data.data.data.overview.accessibleTags.text.includes("Vegetarian Friendly")){
                setVegetarianFriendly("Yes");
            }

        } catch (error){
            setIncorrectTown(true)
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
                longitude: updatedLocation.location.address.geoPoint.longitude,
                latitude: updatedLocation.location.address.geoPoint.latitude,
                zoom: 10,
            })
        }
    }

    const [popUpOpen, setPopUpOpen] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false)

    const cuisines = [
        "British", 
        "Asian", 
        "European",
        "Italian",
        "Indian",
        "Turkish",
        "Chinese",
        "Japanese",
        "French",
        "Spanish",
        "Mexican",
        "Greek",
        "Vietnamese",
        "African",
        "South American"
    ];

    const prices = ["Cheap", "Reasonably priced", "Expensive"]; 

    const clearCuisineDropDown = () => {
        if(chosenCuisine !== ""){
            setChosenCuisine("")
        }
    }

    const clearPriceDropDown = () => {
        if(chosenPrice !== ""){
            setChosenPrice("")
        }
    }

    const dropdownList = useRef(null)
    const dropdownList2 = useRef(null)

    const closeCuisineDropdown = (e)=>{
        if(isOpen && !dropdownList.current?.contains(e.target)){
          setIsOpen(false)
        }
    }

    const closePriceDropdown = (e)=>{
        if(isOpen2 && !dropdownList2.current?.contains(e.target)){
          setIsOpen2(false)
        }
    }

    document.addEventListener('mousedown',closeCuisineDropdown)
    document.addEventListener('mousedown',closePriceDropdown)

    return (
        <div>
            <div className="filter-container">
                <h2 className="filter-header">Find a local place to eat out!</h2>

                    <div className="filter-options">
                        <div className="filter-option-cuisine">
                            <h3>Cuisine</h3>

                                <div ref={dropdownList}>
                                    <h4 className="select-option-title">Select an option</h4>
                                    <button onClick={() => setIsOpen(true)} className="filter-select-options-btn">{chosenCuisine}</button>

                                    <ClearIcon className="clear-btn" onClick={() => clearCuisineDropDown()}></ClearIcon>

                                    {isOpen && (
                                        <div className="dropdown-options">
                                            {cuisines.map(option => (
                                                <button 
                                                    key={option} 
                                                    onClick={() => {
                                                        setChosenCuisine(option)
                                                        setIsOpen(false)}} 
                                                    className="dropdown-option">
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                        </div>

                        <div className="filter-option-price">
                            <h3>Price</h3>

                                <div ref={dropdownList2}>  
                                    <h4 className="select-option-title">Select an option</h4>
                                    <button onClick={() => setIsOpen2(true)} className="filter-select-options-btn">{chosenPrice}</button>

                                    <ClearIcon className="clear-btn" onClick={() => clearPriceDropDown()}></ClearIcon>

                                    {isOpen2 && (
                                        <div className="dropdown-options">
                                            {prices.map(option => (
                                                <button 
                                                    key={option} 
                                                    onClick={() => {
                                                        setChosenPrice(option)
                                                        setIsOpen2(false)
                                                    }} 
                                                    className="dropdown-option">
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                        </div>

                    </div>

                    <div className="filter-buttons">
                        <div>
                            <button className="search-btn" onClick={() => {
                                restaurantCall();
                                }}
                            >Search</button>
                        </div>
                    </div>
            </div>

            <div className="map-container">
                <Map
                    mapboxAccessToken= {process.env.REACT_APP_MAPBOX}
                    {...viewport}
                    style={{width: "100%", height: "80vh"}}
                    mapStyle="mapbox://styles/mapbox/dark-v11"
                >

                 <div className={`no-data-message-${incorrectTown ? "show" : "hide"}`}>
                    <h4>Please update your town in your profile</h4>
                </div>

                       { specificRestaurant !== undefined && restaurantURL !== undefined && ( 
                       
                        <Marker
                            longitude={restaurantData.location.address.geoPoint.longitude}
                            latitude={restaurantData.location.address.geoPoint.latitude}
                            onClick={(e) => {
                                e.originalEvent.stopPropagation();
                                changeViewPoint(restaurantData)
                                setPopUpOpen(true);}}
                            anchor = "bottom"
                            >
                            <img className="map-markers" src={MarkerImage} alt="Marker" />
                        </Marker> 
                        
                        )}

                        {popUpOpen && (
                        
                            <Popup
                                longitude={restaurantData.location.address.geoPoint.longitude}
                                latitude={restaurantData.location.address.geoPoint.latitude}
                                onClose={() => setPopUpOpen(false)}
                                closeButton={true}
                                offsetLeft={10}
                            >
                                <span>
                                    <h4 className="map-marker-title">{restaurantData.overview.name}</h4>
                                    
                                    <h4>Address</h4>
                                    <p>{restaurantData.location.address.address}</p>
                                    <p>Website: <a href={restaurantWebsite} target="_blank">{restaurantData.overview.name}</a></p>
                                    <p>Vegetarian Friendly?: {vegetarianFriendly}</p>
                            
                                </span>
                            </Popup> 
                        
                        )} 
                    </Map>
            </div>

        </div>  

)}

export default Filter
