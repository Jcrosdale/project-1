// HTML Elements
const countryList = document.querySelector('#country-list');
const inputSearch = document.querySelector('#site-search');
const filterRegion = document.querySelector('#filter-region');

async function listCountries() {

    try {
        // API Key
        const url = 'https://api.restcountries.com/countries/v5?limit=100&pretty=1';

        const response = await fetch(url,
            { headers: { 'Authorization': 'Bearer rc_live_446e385638a94e05b148e514ffc3407e' } }
        );

        const result = await response.json();

        console.log('Full API response:', result);

        if (!response.ok) {
            console.error('API request failed:', result.errors);
            console.error('Error details:', result.errors?.map(error => error.message))
            return
        }

        // Country Card Element
        const countries = result.data.objects;
        const country = countries[0];

        console.log('Country object:', country)
        console.log('Country Name:', country.names);
        console.log('FLag:', country.flag);
        console.log('Flag image URL:', country.flag.png);
        console.log('Available:', Object.keys(country))


        // Display Details
        console.log('First country:', country)
        console.log('Country properties:', Object.keys(country));

        // Create Country Card
        const card = document.createElement('article');
        card.classList.add('country-card');

        // Create Flag
        countries.forEach(country => {
            const flag = document.createElement('img');
            flag.src = country.flag.url_png;
            flag.alt = `Flag of ${country.names.common}`;

        })

        // Adding Country's Name
        const countryName = document.createElement('h2');
        countryName.textContent = country.names.common;

        // Card Elements
        card.append(flag);
        card.append(countryName);
        countryList.append(card);

    } catch (error) {
        console.error('Error Request', error);
    }
}

listCountries();
