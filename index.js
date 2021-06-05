import './css/styles.css';
import countryMarkUp from './templates/country-card.hbs';
const refs = {
    countryContainer: document.querySelector('.js-countries-container')
}

fetch('https://restcountries.eu/rest/v2/name/eesti')
    .then(response => {
        return response.json();
    })
    .then(country => {
        console.log(country);
        refs.countryContainer.innerHTML = countryMarkUp(country);
    }).catch(error => {
        console.log(error);
    });
