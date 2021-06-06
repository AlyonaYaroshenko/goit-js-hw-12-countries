const BASE_URL = 'https://restcountries.eu/rest/v2';

/*=============Функция выполняющая фетч к АПИ==============*/

function fetchCountryByName(countryName) { 
    return fetch(`${BASE_URL}/name/${countryName}`)
        .then(response => {
                if(response.status !== 404){
                return response.json();
            } 
            // console.log(response.status);
        });
}



export default {fetchCountryByName}