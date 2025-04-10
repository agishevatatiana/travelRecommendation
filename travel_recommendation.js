
const searchInput = document.getElementById('search');
const submitBtn = document.getElementById('submit');
const resetBtn = document.getElementById('reset');

const resp = await fetch('./travel_recommendation_api.json')
const data = await resp.json();
const recommendationKeys = Object.keys(data);

const searchResultTemplate = ({name, imageUrl, description}) => {
    const search_res = document.createElement("section");
    search_res.setAttribute('class', 'search-section');

    const img_res = document.createElement("img");
    img_res.setAttribute('src', imageUrl);
    img_res.setAttribute('alt', name);
    const h_res = document.createElement("h3");
    const h_text = document.createTextNode(name);
    h_res.append(h_text);
    const p_res = document.createElement('p');
    p_res.setAttribute('class', 'search-description');
    const p_text = document.createTextNode(description);
    p_res.append(p_text);
    const btn = document.createElement('button');
    const btn_text = document.createTextNode('View All');
    btn.append(btn_text);

    search_res.append(img_res);
    search_res.append(h_res);
    search_res.append(p_res);
    search_res.append(btn);

    return search_res;
}

submitBtn.addEventListener('click', () => {
    const search_container = document.getElementById('search-container');
    const searchText = (searchInput.value || '').toLowerCase();
    if (recommendationKeys.includes(searchText)) {
        console.log(data[searchText]);
        if (searchText === 'countries') {
            const countries = document.createElement('div');
            for (let i = 0; i < data[searchText].length; i++) {
                const cities = data[searchText][i]['cities'];
                for (let j = 0; j < cities.length; j++) {
                    countries.append(searchResultTemplate(cities[j]));
                }
            }
            search_container.replaceChildren(countries)
        } else {
            const non_countries = document.createElement('div');
            for(let i = 0; i < data[searchText].length; i++) {
                non_countries.append(searchResultTemplate(data[searchText][i]));
            }
            search_container.replaceChildren(non_countries);
        }
    } else {
        const nothing_found = document.createTextNode('Nothing found!');
        search_container.replaceChildren(nothing_found);
    }
});

resetBtn.addEventListener('click', () => {
    const search_container = document.getElementById('search-container');
    search_container.replaceChildren('');
});