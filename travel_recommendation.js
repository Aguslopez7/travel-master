const btnSearch = document.getElementById('btnSearch');

function searchCondition() {
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
        if (input === 'beach' || input === 'beaches') {
            displayBeaches(resultDiv, data.beaches);
        } else {
            const countries = data.countries.filter(country => country.name.toLowerCase().includes(input));
            const temples = data.temples.filter(temple => temple.name.toLowerCase().includes(input));
            const beaches = data.beaches.filter(beach => beach.name.toLowerCase().includes(input));

            displayResults(resultDiv, countries, temples, beaches);
        }
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

    const resultList = document.createElement('ul');

    beaches.forEach(beach => {
        const listItem = createListItem(beach.name, 'Beach');
        resultList.appendChild(listItem);
    });

    resultDiv.appendChild(resultList);
}

function createListItem(name, type) {
    const listItem = document.createElement('li');
    listItem.textContent = `${name} (${type})`;
    return listItem;
}

function displayError(resultDiv) {
    resultDiv.innerHTML = 'An error occurred while fetching data.';
}

btnSearch.addEventListener('click', searchCondition);
