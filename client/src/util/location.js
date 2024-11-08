export function CountryValidation(differentLocations, userCountry){

    let locationId

    for (const [key, value] of Object.entries(differentLocations)) {
        if(key.includes(userCountry) === true){
            locationId = value;
        }
    }

    return locationId
}

