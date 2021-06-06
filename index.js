import './src/css/styles.css';
import countryCard from '../templates/country-card.hbs';
import countryUnderTen from '../templates/country-card-one.hbs';
import API from '../js/api-service.js';
import getRefs from '../js/get-refs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
// import { defaults } from '@pnotify/core';


const refs = getRefs();
var debounce = require('debounce');

refs.countryNameInput.addEventListener('input', debounce(onSearch, 500)); 

function pushError(err) {
  error({
    text: `${err}`,
  });
}



function clearResult() { 
    refs.countryContainer.innerHTML = '';
}

/* ============Функция рендеринга разметки================*/

function renderCountryCard(country) {   
    if (country.length === 1) {
        const markup = countryCard(country);
        refs.countryContainer.innerHTML = markup;
    } else if (country.length >= 2 && country.length <= 10) {
        const markup = countryUnderTen(country);
        console.log(markup);
        refs.countryContainer.innerHTML = markup;
    } else if (country.length > 10) { 
        pushError('Сделайте более специфичный запрос. Слишком много совпадений!!');
        // console.log('Сделайте более специфичный запрос. Слишком много совпадений!!');
    }; 
    
}

function onSearch(e) { 
    e.preventDefault();
    const searchQuery = refs.countryNameInput.value;
    // console.log(searchQuery);
    if (searchQuery.length === 0) {
        clearResult();
        return;
    } else { 
        API.fetchCountryByName(searchQuery)
        .then(renderCountryCard)
        .catch(error => pushError('Ошибка ввода, такой страны не существует'));
    }

    
}

// //  if (response.ok) return response.json();
//     if (response.status == 404) throw new Error('Not found');
//     throw new Error('Error fetching data');