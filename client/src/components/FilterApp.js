import '../index.css'
import Axios from 'axios'
import { useState } from 'react'

const URL = 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation'

const options = {
  method: 'GET',
  url: 'https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchLocation',
  params: {query: 'London'},
  headers: {
    'X-RapidAPI-Key': '6a718b9d04msh9b34d559ba5ee03p16eec7jsnf3727a08cd12',
    'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
  }
};

function Filter() {

    const [show, showContainer] = useState(true);

    const listOfPlaces = async () => {

        try {
            const { data: { data } } = await Axios.get(URL, options)
            console.log(data)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className= {show ? "filter--container" : "filter--container-hidden"}>
            <h2 className="filter-header">Find a restaurant to eat at!</h2>
                <form action="#">
                    <ul className="filter-options">
                        <li>
                            <p>Cuisine:</p>
                            <select name="cuisine">
                                <option value="italian">Italian</option>
                            </select>
                        </li>

                        <li>
                            <p>Distance(km):</p>
                            <select name="distance">
                                <option value="near">0-1</option>
                            </select>
                        </li>


                        <li style = {{paddingRight: "40px"}}>
                            <p>Price(£):</p>
                            <select name="price">
                                <option value="cheap">10-20</option>
                            </select>
                        </li>
                    </ul>
                    <div className="filter-search-btn">
                        <input 
                            onClick={() => listOfPlaces()}
                            type="submit" 
                            value="Search" 
                            className="search-btn"/>
                    </div>
                   
                </form>
        </div>
    )
}

export default Filter