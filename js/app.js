const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);

    searchField.value = '';
    if (searchText == '') {
        const errorMessage = document.getElementById("errorMessage").innerHTML = `<p class="error" id="errorMessage">Please Write what you are looking for!!</p>`;
    }
    else {
        const errorMessage = document.getElementById("errorMessage").innerHTML = '';
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data));
    }

}
searchPhone();
const displaySearchResult = phones => {
    const phontush = phones.data.slice(0, 20);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    // searchResult.innerHTML = '';
    searchResult.textContent = '';
    phontush.forEach(phone => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
            <div onclick ="loadPhoneDetail('${phone.slug}')" class="card ps-3 pt-2 h-100">
                <img src="${phone.image}" class="card-img-top w-50" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <h5 class="card-title">Brand:${phone.brand}</h5>
                    <button type="button" class="btn btn-info">Details</button>
                    
                </div>
            </div>
`;
        searchResult.appendChild(div);
    })
}

const loadPhoneDetail = phoneId => {
    // console.log(phoneId);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data));
}
const displayPhoneDetail = phone => {
    // console.log(phone.data.mainFeatures.storage);
    const phoneDetails = document.getElementById('phone-deatils');
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
   <img src="${phone.data.image}" class="card-img-top w-75" alt="...">
           <div class="card-body">
               <h5 class="card-title"><strong>Storage: </strong>${phone.data.mainFeatures.storage}</h5>
               <h5 class="card-title"> <strong>Display: </strong>${phone.data.mainFeatures.displaySize}</h5>
               <h5 class="card-title"> <strong>Sensors: </strong>${phone.data.mainFeatures.sensors[0]}</h5>
               <h5 class="card-title"> <strong>Release Date: </strong>${phone.data.releaseDate}</h5>
           </div>
   `;
    phoneDetails.appendChild(div);
}

