import './css/styles.css';
import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import countryMarkUp from './templates/country-card.hbs';
import getRefs from './get-refs'; 
const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const searchQuery = form.elements.query.value;
   
    fetchCountry(searchQuery)
        .then(renderCountryCard)
        .catch(onFetchError)
        .finally(() => form.reset());
}

function fetchCountry(countryId) {
    const url = 'https://restcountries.eu/rest/v2';
    return fetch(url)
        .then(response => response.json());
};

function renderCountryCard(country) {
  const markup = countryMarkUp(country);
  refs.countryContainer.innerHTML = markup;
};

function onFetchError(error) {
    alert('Ooops! Too many options. Specify the name of the country.');
}