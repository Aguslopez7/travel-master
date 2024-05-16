const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');
const presentationDiv = document.getElementById("presentation-div");
const searchConditionDiv = document.getElementById("searchCondition");

function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
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
        else if (isTemple)
        {
          displayTemples(resultDiv, data.temples);
        }
        else if(isCountry)
        {
          displayCountries(resultDiv, data.countries);
        }
        else {
            const countries = data.countries.filter(country => country.name.toLowerCase().includes(input));
            const temples = data.temples.filter(temple => temple.name.toLowerCase().includes(input));
            const beaches = data.beaches.filter(beach => beach.name.toLowerCase().includes(input));

            displayResults(resultDiv, countries, temples, beaches);
        }
        HideDiv(presentationDiv);
        ShowDiv(searchConditionDiv);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        displayError(resultDiv);
      });
}

function displayResults(resultDiv, countries, temples, beaches) {
    if (countries.length === 0 && temples.length === 0 && beaches.length === 0) {
        resultDiv.innerHTML = 'No results found.';
        return;
    }

    const resultList = document.createElement('ul');

    countries.forEach(country => {
        const listItem = createListItem(country.name, 'Country');
        resultList.appendChild(listItem);
    });

    temples.forEach(temple => {
        const listItem = createListItem(temple.name, 'Temple');
        resultList.appendChild(listItem);
    });

    beaches.forEach(beach => {
        const listItem = createListItem(beach.name, 'Beach');
        resultList.appendChild(listItem);
    });

    resultDiv.appendChild(resultList);
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
        beachImage.alt = beach.name;
        beachDiv.appendChild(beachImage);

        const beachDescription = document.createElement('p');
        beachDescription.textContent = beach.description;
        beachDiv.appendChild(beachDescription);

        resultDiv.appendChild(beachDiv);
    });
}

function displayTemples(resultDiv, temples) {
  if (temples.length === 0) {
      resultDiv.innerHTML = 'No Temples found.';
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
      templeImage.alt = temple.name;
      templeDiv.appendChild(templeImage);

      const templeDescription = document.createElement('p');
      templeDescription.textContent = temple.description;
      templeDiv.appendChild(templeDescription);

      resultDiv.appendChild(templeDiv);
  });
}

function displayCountries(resultDiv, countries) {
  if (countries.length === 0) {
      resultDiv.innerHTML = 'No Temples found.';
      return;
  }

  countries.forEach(country => {
    const countryDiv = document.createElement('div');
    countryDiv.classList.add('country');

    const countryName = document.createElement('h2');
    countryName.textContent = country.name;
    countryDiv.appendChild(countryName);

    const cityList = document.createElement('ul');
    country.cities.forEach(city => {
        const cityItem = createListItem(city.name, 'City');
        cityList.appendChild(cityItem);

        const cityDiv = document.createElement('div');
        cityDiv.classList.add('city');

        const cityName = document.createElement('h3');
        cityName.textContent = city.name;
        cityDiv.appendChild(cityName);

        const cityImage = document.createElement('img');
        cityImage.src = city.imageUrl;
        cityImage.alt = city.name;
        cityDiv.appendChild(cityImage);

        const cityDescription = document.createElement('p');
        cityDescription.textContent = city.description;
        cityDiv.appendChild(cityDescription);

        countryDiv.appendChild(cityDiv);
    });
    resultDiv.appendChild(countryDiv);
});
}


function createListItem(name, type) {
    const listItem = document.createElement('li');
    listItem.textContent = `${name} (${type})`;
    return listItem;
}

function displayError(resultDiv) {
    resultDiv.innerHTML = 'An error occurred while fetching data.';
}

function HideDiv(div) {
    div.style.display = "none";
}

function ShowDiv(div) {
    div.style.display = "block";
}

function resetSearch(){
    document.getElementById("conditionInput").value = "";
    HideDiv(searchConditionDiv);
    ShowDiv(presentationDiv);
}

btnSearch.addEventListener('click', searchCondition);
btnReset.addEventListener('click', resetSearch);