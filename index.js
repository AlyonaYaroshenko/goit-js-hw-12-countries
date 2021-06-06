import './src/css/styles.css';
import countryCard from './src/templates/country-card.hbs';
import countryList from './src/templates/country-card-one.hbs';
import API from './src/js/api-service.js';
import getRefs from './src/js/get-refs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';

const refs = getRefs();
var debounce = require('debounce');

refs.countryInput.addEventListener('input', debounce(onSearch, 500)); 

function onSearch(e) { 
    e.preventDefault();
    const searchQuery = refs.countryInput.value;
    if (searchQuery.length === 0) {
        clearResult();
        return;
    } else { 
        API.fetchCountry(searchQuery)
        .then(renderCountryCard)
        .catch(error => pushError('Ooops ;( There is no such country!'));
    }    
}


function pushError(err) {
  error({
    text: `${err}`,
  });
}

function clearResult() { 
    refs.countryContainer.innerHTML = '';
}

function renderCountryCard(country) {   
    if (country.length === 1) {
        const markup = countryCard(country);
        refs.countryContainer.innerHTML = markup;
    } else if (country.length >= 2 && country.length <= 10) {
        const markup = countryList(country);
        console.log(markup);
        refs.countryContainer.innerHTML = markup;
    } else if (country.length > 10) { 
        pushError('Ooops ;( Too many options. Specify the name of the country.');
    }; 
    
}

