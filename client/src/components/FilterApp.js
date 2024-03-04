import '../index.css'
import { useState } from 'react'

function Filter() {

    const [show, showContainer] = useState(true);

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
                            onClick={() => showContainer(!show)}
                            type="submit" 
                            value="Search" 
                            className="search-btn"/>
                    </div>
                   
                </form>
        </div>
    )
}

export default Filter