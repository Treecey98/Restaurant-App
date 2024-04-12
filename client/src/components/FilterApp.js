import '../index.css'
import Axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const options = {
  headers: {
    'X-RapidAPI-Key': '6a718b9d04msh9b34d559ba5ee03p16eec7jsnf3727a08cd12',
    'X-RapidAPI-Host': 'wyre-data.p.rapidapi.com'
  }
};

function Filter( {sendRestaurantDataToMap}) {

    let {userId} = useParams();

    const[userAddressDetails, setAddressDetails] = useState([])

    useEffect(() => {
        Axios.get(`http://localhost:3001/userDetails/${userId}`).then((response) => {
            setAddressDetails(response.data[0])
        })
    }, []);

    const URL = `https://wyre-data.p.rapidapi.com/restaurants/localauthority/${userAddressDetails.address2}`

    const [show, showContainer] = useState(true);

    const [randomRestaurants, setRandomRestaurants] = useState();

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

            sendRestaurantDataToMap(randomRestaurants);
            
        } catch (error){
            console.log(error)
        }
    }

    return (
        <div className= {show ? "filter--container" : "filter--container-hidden"}>
            <h2 className="filter-header">Find a local place to eat at!</h2>
                <div className="filter-search-btn">
                    <button className="search-btn" onClick={() => listOfPlaces()}>Search</button>
                </div>
        </div>
    )
}

export default Filter
