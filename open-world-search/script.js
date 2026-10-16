// HTML Elements
const countryList = document.querySelector('#country-list');
const inputSearch = document.querySelector('#site-search');
const filterRegion = document.querySelector('#filter-region');

async function listCountries() {

    try {
        // API Key
        const url = 'https://api.restcountries.com/countries/v5?q=canada';

        const response = await fetch(url, 
            { headers: { 'Authorization': 'Bearer rc_live_446e385638a94e05b148e514ffc3407e'} }
        );

        const result = await response.json();

        console.log('Full API response:', result);

        if (!response.ok) {
            console.error('API request failed:', result.errors);
            console.error('Error details:', result.errors?.map(error => error.message))
            return
        }
        const countries = result.data.objects
        console.log('First', countries[0]);
        

    } catch (error) {
        console.error('Error Request', error);
    }
}

listCountries();
