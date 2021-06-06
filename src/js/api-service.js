const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountry(name) { 
    return fetch(`${BASE_URL}/name/${name}`)
        .then(response => {
                if(response.status !== 404){
                return response.json();
            } 
            // console.log(response.status);
        });
}



export default {fetchCountry}