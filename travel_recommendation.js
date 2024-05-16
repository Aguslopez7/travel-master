const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');
const presentationDiv = document.getElementById("presentation-div");
const searchConditionDiv = document.getElementById("searchCondition");

function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    if (input === "") {
        return;
    }
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            const isBeach = input === 'beach' || input === 'beaches';
            const isCountry = input === 'country' || input === 'countries';
            const isTemple = input === 'temple' || input === 'temples';
            if (isBeach) {
                displayBeaches(resultDiv, data.beaches);
            }
            else if (isTemple) {
                displayTemples(resultDiv, data.temples);
            }
            else if (isCountry) {
                displayCountries(resultDiv, data.countries);
            }
            else {
                displaySearchNotFound(resultDiv);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            displayError(resultDiv);
        });
    HideDiv(presentationDiv);
    ShowDiv(searchConditionDiv);
}

function displayBeaches(resultDiv, beaches) {
    if (beaches.length === 0) {
        resultDiv.innerHTML = 'No beaches found.';
        return;
    }

    beaches.forEach(beach => {
        const beachDiv = document.createElement('div');
        beachDiv.classList.add('beach');

        const beachName = document.createElement('h3');
        beachName.textContent = beach.name;
        beachDiv.appendChild(beachName);

        const beachImage = document.createElement('img');
        beachImage.src = beach.imageUrl;
        beachDiv.appendChild(beachImage);

        const beachDescription = document.createElement('p');
        beachDescription.textContent = beach.description;
        beachDiv.appendChild(beachDescription);

        resultDiv.appendChild(beachDiv);
    });
}

function displayTemples(resultDiv, temples) {
    if (temples.length === 0) {
        resultDiv.innerHTML = 'No temples found.';
        return;
    }

    temples.forEach(temple => {
        const templeDiv = document.createElement('div');
        templeDiv.classList.add('temple');

        const templeName = document.createElement('h3');
        templeName.textContent = temple.name;
        templeDiv.appendChild(templeName);

        const templeImage = document.createElement('img');
        templeImage.src = temple.imageUrl;
        templeDiv.appendChild(templeImage);

        const templeDescription = document.createElement('p');
        templeDescription.textContent = temple.description;
        templeDiv.appendChild(templeDescription);

        resultDiv.appendChild(templeDiv);
    });
}

function displayCountries(resultDiv, countries) {
    if (countries.length === 0) {
        resultDiv.innerHTML = 'No countries found.';
        return;
    }

    countries.forEach(country => {
        const countryDiv = document.createElement('div');
        countryDiv.classList.add('country');

        const countryName = document.createElement('h2');
        countryName.textContent = country.name;
        countryDiv.appendChild(countryName);

        country.cities.forEach(city => {
            const cityDiv = document.createElement('div');
            cityDiv.classList.add('city');

            const cityName = document.createElement('h3');
            cityName.textContent = city.name;
            cityDiv.appendChild(cityName);

            const cityImage = document.createElement('img');
            cityImage.src = city.imageUrl;
            cityDiv.appendChild(cityImage);

            const cityDescription = document.createElement('p');
            cityDescription.textContent = city.description;
            cityDiv.appendChild(cityDescription);

            const cityDivider = document.createElement('hr');
            cityDiv.appendChild(cityDivider);

            countryDiv.appendChild(cityDiv);
        });
        resultDiv.appendChild(countryDiv);
    });
}

function displayError(resultDiv) {
    resultDiv.innerHTML = 'An error occurred while fetching data.';
}

function displaySearchNotFound(resultDiv) {
    resultDiv.innerHTML = `
    No search results, please try with:<br>
    <ul>
        <li>"country" or "countries"</li>
        <li>"beach" or "beaches"</li>
        <li>"temple" or "temples"</li>
    </ul>
    `;
}

function HideDiv(div) {
    div.style.display = "none";
}

function ShowDiv(div) {
    div.style.display = "block";
}

function resetSearch() {
    document.getElementById("conditionInput").value = "";
    HideDiv(searchConditionDiv);
    ShowDiv(presentationDiv);
}

btnSearch.addEventListener('click', searchCondition);
btnReset.addEventListener('click', resetSearch);