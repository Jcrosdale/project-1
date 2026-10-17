// Countries Array
let countries = [];

// HTML Elements
const countryList = document.querySelector('#country-list');
const inputSearch = document.querySelector('#site-search');
const filterRegion = document.querySelector('#filter-region');

// Fetch country data API
async function listCountries() {

    try {
        // API Key
        const url = 'https://api.restcountries.com/countries/v5?limit=100&pretty=1';

        const response = await fetch(url,
            { headers: { 'Authorization': 'Bearer rc_live_446e385638a94e05b148e514ffc3407e' } }
        );

        // Convert to object
        const result = await response.json();

        // If API request fails
        if (!response.ok) {
            console.error('API request failed:', result.errors);
            return;
        }

        // Country Card Element For Searching
        countries = result.data.objects;

        // Display load
        displayCountries(countries);


    } catch (error) {
        console.error('Error Request', error);
    }
}

function displayCountries(countriesList) {
    // Clear existing list
    countryList.replaceChildren();

    countriesList.forEach(country => {
        // Create a country code
        const card = document.createElement('article');
        card.classList.add('country-card');

        // Create flag image
        const flag = document.createElement('img');
        flag.src = country.flag.url_png;
        flag.alt = `Flag of ${country.names.common}`;
        card.append(flag);

        // Adding Country's Name
        const countryName = document.createElement('h2');
        countryName.textContent = country.names.common;
        card.append(countryName);

        // Adding Population
        const population = document.createElement('p');
        population.textContent = `Population: ${country.population.toLocaleString()}`; //Better formatting
        card.append(population);

        // Adding Region
        const region = document.createElement('p');
        region.textContent = `Region: ${country.region}`;
        card.append(region);

        // Adding sub region
        if (country.subregion && country.subregion.length > 0) {
            const subregion = document.createElement('p');
            subregion.textContent = `Sub Region: ${country.subregion}`;
            card.append(subregion);
        }

        // Country displays even without capital
        if (country.capitals && country.capitals.length > 0) {
            // Adding Capital
            const capital = document.createElement('p');
            capital.textContent = `Capital: ${country.capitals[0].name}`;
            card.append(capital);
        }

        // Card Append Display
        countryList.append(card);



    })
}
// Search Event Listener
inputSearch.addEventListener('input', () => {
    const searchText = inputSearch.value.toLowerCase().trim(); // value of input

    const filterCountries = countries.filter(country =>
        country.names.common.toLowerCase().includes(searchText)
    );

    displayCountries(filterCountries);
});

// Filter Region Event Listener 
filterRegion.addEventListener('change', () => {
    // Value of region selected
    const selectedRegion = filterRegion.value;

    // Creates a new array for only countries that match
    const filterCountries = countries.filter(country =>
        country.region === selectedRegion
    );

    // Displays list of countries after filter
    displayCountries(filterCountries);
});

// Country list displays
listCountries();
