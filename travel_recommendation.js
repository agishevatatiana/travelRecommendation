
const searchInput = document.getElementById('search');
const submitBtn = document.getElementById('submit');
const resetBtn = document.getElementById('reset');

const resp = await fetch('./travel_recommendation_api.json')
const data = await resp.json();
const recommendationKeys = Object.keys(data);

submitBtn.addEventListener('click', () => {
    const searchText = (searchInput.value || '').toLowerCase();
    if (recommendationKeys.includes(searchText)) {
        console.log(data[searchText]);
    }
});