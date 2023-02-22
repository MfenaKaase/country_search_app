window.addEventListener('DOMContentLoaded', function () {
    const resultsContainer = document.querySelector('#resultsContainer');

    const searchBtn = document.querySelector('#searchBtn');

    const searchField = document.querySelector('#search');


    fetch('https://restcountries.com/v3.1/all')
        .then(response => response.json())
        .then(data => {
            displayResults(data);
            searchBtn.addEventListener('click', evt => {
                resultsContainer.innerHTML = ``;
                evt.preventDefault();
                let searchTerm = document.querySelector('#search').value;
                displayResults(filterResults(data, searchTerm));
            });

            searchField.addEventListener('keyup', evt => {
                resultsContainer.innerHTML = ``;
                let searchTerm = evt.target.value;
                displayResults(filterResults(data, searchTerm));
            })


        })

})


let displayResults = (data) => {
    let resultsContainer = document.querySelector('#resultsContainer');
    data.forEach(item => {
        resultsContainer.innerHTML += `
        <div class="result d-flex">
            <div class="img-cont d-flex align-center">
                <img src="${item['flags']['svg']}" alt="" width="50">
            </div>
            <div class="d-flex align-center">
                ${item['name']['common']}
            </div>
        </div>
        `;
    });
}

let filterResults = (data, searchTerm) => {
    if (searchTerm) {
        document.querySelector('#searchString').textContent = searchTerm;
        let filteredData = data.filter(item => {
             return item['name']['common'].toLowerCase().includes(searchTerm.toLowerCase());
        });
        return filteredData;
    } else {
        return data;
    } 
}