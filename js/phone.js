const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // display 6 phones only
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 6) {
        phones = phones.slice(0, 6);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    // display no phones found
    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }
    // display all phones
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = 
        `
         <div class="card mb-3 text-bg-light mx-2 text-bg-light shadow p-3 mb-5 bg-body-tertiary rounded border border-0" style="max-width: 420px;">
        <div class="row g-0">
          <div class="col-md-6">
            <img src="${phone.image}" class="img-fluid rounded p-2" alt="...">
          </div>
          <div class="col-md-6 pt-4">
            <div class="card-body ">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="card-text">${phone.slug}</p>
              <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-danger opacity-75" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
            </div>
          </div>
        </div>
      </div>
        
        `
        ;
        phoneContainer.appendChild(phoneDiv)

    });
    // stop loader
    toggleSpinner(false);
}
const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    loadPhones(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function () {
    // start loader
    processSearch(6);
})
//  search input field enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        //code for enter 
        processSearch(6);
    }
});
const toggleSpinner = isLoading => {
    const loaderSpin = document.getElementById('loader');
    if (isLoading) {
        loaderSpin.classList.remove('d-none');
    }
    else {
        loaderSpin.classList.add('d-none');
    }
}

// not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
})

const loadPhoneDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);

}

const displayPhoneDetails = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <img src="${phone.image}" class="img-fluid rounded px-4 py-2 " alt="...">
        <h5 class= "px-5"><strong> Brand: </strong> ${phone.brand}</h5>
        <p><strong>Release Date: </strong> ${phone.releaseDate ? phone.releaseDate : 'No release date found'}</p>
        <p><strong>Display Size: </strong> ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'No dta found'}</p>
        <p><strong>Storage: </strong> ${phone.mainFeatures ? phone.mainFeatures.storage : 'No storage information'}</p>
        <p><strong>Memory: </strong> ${phone.mainFeatures ? phone.mainFeatures.memory : 'No data found'}</p>
        <p><strong>Others: </strong> ${phone.others ? phone.others.Bluetooth : 'No Bluetooth information'}</p>
        <ul>
        <h4>Sensors: </h4>
            <li> <small> ${phone.mainFeatures ? phone.mainFeatures.sensors[0] : 'No sensors'} </small> </li>
            <li> <small> ${phone.mainFeatures ? phone.mainFeatures.sensors[1] : 'No sensors'} </small> </li>
            <li> <small> ${phone.mainFeatures ? phone.mainFeatures.sensors[2] : 'No sensors'} </small> </li>
            <li> <small> ${phone.mainFeatures ? phone.mainFeatures.sensors[3] : 'No sensors'} </small> </li>
            <li> <small> ${phone.mainFeatures ? phone.mainFeatures.sensors[4] : 'No sensors'} </small> </li>
            <li> <small> ${phone.mainFeatures ? phone.mainFeatures.sensors[5] : 'No sensors'} </small> </li>
        </ul>
    `
}


loadPhones("iphone");