import Axios from "axios";

const defaultHeaders = {'x-rapidapi-key': '6a718b9d04msh9b34d559ba5ee03p16eec7jsnf3727a08cd12',
'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com'}

const baseURL = "https://tripadvisor16.p.rapidapi.com/api/v1"

async function fetchLocationDataByUserTown (town) {
    return await Axios.request({method: 'GET',
        url: `${baseURL}/restaurant/searchLocation`,
        params: {
            query: `${town}`
        },
        headers: defaultHeaders})
}

async function fetchRestaurantsByLocationId (locationId, page) {
    return await Axios.request({method: 'GET',
        url: `${baseURL}/restaurant/searchRestaurants`,
        params: {
            locationId: `${locationId}`,
            page: `${page}`
        },
        headers: defaultHeaders})
}

async function fetchRestaurantDetailsById (restaurantId) {
    return await Axios.request({method: 'GET',
        url: `${baseURL}/restaurant/getRestaurantDetailsV2`,
        params: {
            restaurantsId: `${restaurantId}`
        },
        headers: defaultHeaders})
}

export {fetchLocationDataByUserTown, fetchRestaurantsByLocationId, fetchRestaurantDetailsById}