import '../index.css'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import 'mapbox-gl/dist/mapbox-gl.css'
import { Marker, Map, Popup, NavigationControl } from 'react-map-gl'
import MarkerImage from '../map-marker-2-512.png'
import { fetchLocationDataByUserTown, fetchRestaurantsByLocationId, fetchRestaurantDetailsById } from '../model/TripAdvisorAPI'
import { CountryValidation } from '../util/location'
import { FormControl, Box, Stack, Autocomplete, TextField } from '@mui/material';
import * as Constants from '../constants/constant';

function Filter() {

    let {userId} = useParams();

    const[userAddressDetails, setAddressDetails] = useState([])

    useEffect(() => {
        Axios.get(`https://easy-eats-api.onrender.com/userDetails/${userId}`).then((response) => {
            setAddressDetails(response.data[0])
        })
    }, []);

    const changeViewPoint = (updatedLocation) => {
        if(updatedLocation !== undefined){
            setViewport({
                longitude: updatedLocation.location.address.geoPoint.longitude,
                latitude: updatedLocation.location.address.geoPoint.latitude,
                zoom: 12,
            })
        }
    }

    const [incorrectTown, setIncorrectTown] = useState(false);
    const [incorrectFilters, setIncorrectFilters] = useState(false);

    const [specificRestaurant, setRestaurant] = useState();
    const [restaurantURL, setRestaurantURL] = useState();
    const [vegetarianFriendly, setVegetarianFriendly] = useState("No");

    const [chosenCuisine, setChosenCuisine] = useState("");
    const [chosenPrice, setChosenPrice] = useState("");

    const [viewport, setViewport] = useState(Constants.originalViewOptions);

    const [popUpOpen, setPopUpOpen] = useState(false);
        
    const restaurantData = specificRestaurant;
    const restaurantWebsite = restaurantURL;

    const initialRestaurantCall = async () => {

        setIncorrectTown(false);
        setIncorrectFilters(false);

        try {
            const locations = await fetchLocationDataByUserTown(userAddressDetails.address2)
            const differentLocations = {};
            const userCountry = userAddressDetails.country

            locations.data.data.forEach((element, index, array) => {
                differentLocations[element.localizedAdditionalNames.longOnlyHierarchy] = element.locationId;
            })

            let locationId = CountryValidation(differentLocations, userCountry);
            if (locationId === undefined ) throw new Error("Incorrect town");

            window.sessionStorage.setItem("locationId", locationId);
            
            let page = 1

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

            const restaurantData = await fetchRestaurantsByLocationId(locationId, page)
            window.sessionStorage.setItem("Page", page);

            const filteredRestaurants = [];
            const unFilteredRestaurants = [];
            const restaurant = [];

            const numberOfRestaurantPages = restaurantData.data.data.totalPages

            function filteringRestaurantData(data) {
                data.forEach((element, index, array) => {
                    if(element.establishmentTypeAndCuisineTags.includes(chosenCuisine) && element.priceTag === price){
                        filteredRestaurants.push(element);
                    } else if(chosenCuisine === "" && element.priceTag === price){
                        filteredRestaurants.push(element);
                    } else if(element.establishmentTypeAndCuisineTags.includes(chosenCuisine) && price === ""){
                        filteredRestaurants.push(element);
                    } else if(chosenCuisine === "" && price === ""){
                        unFilteredRestaurants.push(element);
                    }
                })
            }

            filteringRestaurantData(restaurantData.data.data.data)

            const filteredRestaurantCount = filteredRestaurants.length;
            const nonFilteredRestaurantCount = unFilteredRestaurants.length;

            if(filteredRestaurantCount === 0 && (chosenCuisine !== "" || chosenPrice !== "")){
                
                while (filteredRestaurants.length === 0) {

                    page++

                    if (page > numberOfRestaurantPages || page === 21) break;

                    const restaurantData2 = await fetchRestaurantsByLocationId(locationId, page)
                    filteringRestaurantData(restaurantData2.data.data.data);
                }

                window.sessionStorage.setItem("Page", page);

                restaurant.push(filteredRestaurants[0]);

            } else if(filteredRestaurantCount !== 0){
                    const randomIndex = Math.floor(Math.random() * (filteredRestaurantCount - 0) + 0)
                    restaurant.push(filteredRestaurants[randomIndex]);
            } else {
                    const randomIndex = Math.floor(Math.random() * (nonFilteredRestaurantCount - 0) + 0)
                    restaurant.push(unFilteredRestaurants[randomIndex]);
            }

            const data = await fetchRestaurantDetailsById(restaurant[0].restaurantsId);
            setRestaurant(data.data.data);

            data.data.data.about.content.map((data, index) => {
                if(data.__typename === "AppPresentation_ContactSubsection"){
                    data.contactLinks.map((data, index) => {
                        if(data.link.trackingContext === "server_website"){
                            setRestaurantURL(data.link.externalUrl);
                        } 
                    })
                } 
            })

            const vegetarianString = data.data.data.overview.accessibleTags.text;
            let lowerCaseVegetarianString = vegetarianString.toLowerCase()
            
            if(lowerCaseVegetarianString.includes('vegetarian friendly')){
                setVegetarianFriendly("Yes");
            }

            changeViewPoint(data.data.data);
            setPopUpOpen(true);

        } catch (e){
            if (e.message === "Incorrect town"){
                setIncorrectTown(true);
            } else {
                setIncorrectFilters(true);
            }
        } 

    }

    const locationId = window.sessionStorage.getItem("locationId");
    const page = Number(window.sessionStorage.getItem("Page"));

    const searchForAnotherRestaurant = async (locationId, page) => {

        page = page + 1

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

            try {

            const restaurantData = await fetchRestaurantsByLocationId(locationId, page)
            window.sessionStorage.setItem("Page", page);

            const filteredRestaurants = [];
            const unFilteredRestaurants = [];
            const restaurant = [];

            const numberOfRestaurantPages = restaurantData.data.data.totalPages

            function filteringRestaurantData(data) {
                data.forEach((element, index, array) => {
                    if(element.establishmentTypeAndCuisineTags.includes(chosenCuisine) && element.priceTag === price){
                        filteredRestaurants.push(element);
                    } else if(chosenCuisine === "" && element.priceTag === price){
                        filteredRestaurants.push(element);
                    } else if(element.establishmentTypeAndCuisineTags.includes(chosenCuisine) && price === ""){
                        filteredRestaurants.push(element);
                    } else if(chosenCuisine === "" && price === ""){
                        unFilteredRestaurants.push(element);
                    }
                })
            }

            filteringRestaurantData(restaurantData.data.data.data)

            const filteredRestaurantCount = filteredRestaurants.length;
            const nonFilteredRestaurantCount = unFilteredRestaurants.length;

            if(filteredRestaurantCount === 0 && (chosenCuisine !== "" || chosenPrice !== "")){
                
                while (filteredRestaurants.length === 0) {

                    page++

                    if (page > numberOfRestaurantPages || page === 41) break;

                    const restaurantData2 = await fetchRestaurantsByLocationId(locationId, page)
                    filteringRestaurantData(restaurantData2.data.data.data);
                }

                window.sessionStorage.setItem("Page", page);

                restaurant.push(filteredRestaurants[0]);

            } else if(filteredRestaurantCount !== 0){
                    const randomIndex = Math.floor(Math.random() * (filteredRestaurantCount - 0) + 0)
                    restaurant.push(filteredRestaurants[randomIndex]);
            } else {
                    const randomIndex = Math.floor(Math.random() * (nonFilteredRestaurantCount - 0) + 0)
                    restaurant.push(unFilteredRestaurants[randomIndex]);
            }

            const data = await fetchRestaurantDetailsById(restaurant[0].restaurantsId);
            setRestaurant(data.data.data);

            data.data.data.about.content.map((data, index) => {
                if(data.__typename === "AppPresentation_ContactSubsection"){
                    data.contactLinks.map((data, index) => {
                        if(data.link.trackingContext === "server_website"){
                            setRestaurantURL(data.link.externalUrl);
                        } 
                    })
                } 
            })

            const vegetarianString = data.data.data.overview.accessibleTags.text;
            let lowerCaseVegetarianString = vegetarianString.toLowerCase()
            
            if(lowerCaseVegetarianString.includes('vegetarian friendly')){
                setVegetarianFriendly("Yes");
            }

            changeViewPoint(data.data.data);
            setPopUpOpen(true);

        } catch (error){
          console.error(error);
          setIncorrectFilters(true);
          setRestaurant(undefined);
          setRestaurantURL(undefined);
        } 
    }

    return (
        <div className="home-page">
            <div className="filter-container">
                <h2 className="filter-header">Find a local place to eat out!</h2>

                    <div className="filter-options">
                        <h3 className="filter-options-title">Options</h3>
                        <Stack spacing={3}>
                        <div>
                            <Box sx={{width: '95%'}}>
                                <FormControl sx={{marginLeft: 1}} fullWidth>
                                    <Autocomplete
                                        disablePortal
                                        options={Constants.cuisines}
                                        sx={{ width: '100%' }}
                                        renderInput={(params) => <TextField {...params} label="Cuisine" />}
                                        onChange={(event) => {
                                            setChosenCuisine(event.target.textContent);
                                        }}
                                    />
                                </FormControl>
                            </Box> 
                        </div>

                        <div>
                            <Box sx={{width: '95%'}}>
                                <FormControl sx={{marginLeft: 1}} fullWidth>
                                    <Autocomplete
                                        disablePortal
                                        options={Constants.prices}
                                        sx={{ width: '100%' }}
                                        renderInput={(params) => <TextField {...params} label="Price"/>}
                                        onChange={(event) => {
                                            setChosenPrice(event.target.textContent);
                                        }}
                                    />
                                </FormControl>
                            </Box>
                        </div>
                        </Stack>

                    </div>

                    <div className="filter-buttons">
                        <div>
                            <button className="search-btn" onClick={() => {
                                initialRestaurantCall();
                                }}
                            >Search</button>
                        </div>
                    </div>
            </div>

            <div className="map-container">
                <Map
                    mapboxAccessToken= {process.env.REACT_APP_MAPBOX}
                    {...viewport}
                    minZoom={4}
                    maxZoom={14}
                    onMove={evt => setViewport(evt.viewState)}
                    style={{width: "auto", height: "81.5vh"}}
                    mapStyle="mapbox://styles/mapbox/light-v11"
                    onRender={(event) => event.target.resize()}
                >

                 <div className={`incorrect-town-message-${incorrectTown ? "show" : "hide"}`}>
                    <h4>Please update your town in your profile</h4>
                </div>

                <div className={`incorrect-filters-message-${incorrectFilters ? "show" : "hide"}`}>
                    <h4>No restaurants found with those filters. Please alter them.</h4>
                </div>

                       { specificRestaurant !== undefined && restaurantURL !== undefined && ( 
                       
                        <Marker
                            longitude={restaurantData.location.address.geoPoint.longitude}
                            latitude={restaurantData.location.address.geoPoint.latitude}
                            onClick={(e) => {
                                e.originalEvent.stopPropagation();
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
                                    <button className="pop-up-search-btn" onClick={() => {
                                        searchForAnotherRestaurant(locationId, page)
                                        setPopUpOpen(false);
                                    }}>Want to search for another restaurant?</button>
                                </span>
                            </Popup> 
                        
                        )}

                        <NavigationControl position={"bottom-right"}/>
                    </Map>
            </div>

        </div>  

)}

export default Filter
