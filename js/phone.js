const loadAll = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayPhones(data.data, dataLimit);
    } catch (error) {
        console.log(error);
    }
}

// display Phones Section
const displayPhones = (phones, dataLimit) => {
    const phoneCont = document.getElementById('phones-container');
    const notFoundCont = document.getElementById('not-found-cont');
    const btnShowAll = document.getElementById('show-all');
    phoneCont.innerText = '';
    console.log(dataLimit);


    if (dataLimit && phones.length > 8) {
        phones = phones.slice(0,8);
        btnShowAll.classList.remove('d-none');
        }
    else {
        btnShowAll.classList.add('d-none');
    }
    
    // display no phone found
    if (phones.length === 0) {
        notFoundCont.classList.remove('d-none');
    }
    else {
        notFoundCont.classList.add('d-none');
    }

    spinnerTrigger(false);
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card h-100 p-3">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <!-- Button trigger modal -->
                <button onclick="loadModaldet('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#phone-details-modal">
                    See Details
                </button>

                <!-- Modal -->
                <div class="modal fade" id="phone-details-modal" tabindex="-1" aria-labelledby="phone-details-modalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="phone-modal-name">Modal title</h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div id="ModalBody" class="modal-body">
                            ...
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        phoneCont.appendChild(phoneDiv);
    });
}
    
    
//Click on Search
document.getElementById('btn-search').addEventListener('click',function(){
    searchProgress(8);
})
//Enter keypress on Search
document.getElementById('search-field').addEventListener('keyup', event => {
    if (event.key == 'Enter') {
        searchProgress(8);
    }
})

//Search Functionality
const searchProgress = (dataLimit) => {
    spinnerTrigger(true);
    let searchVal = document.getElementById('search-field').value;
    loadAll(searchVal, dataLimit);
    document.getElementById('search-field').value = '';
}

//spinner Function
const spinnerTrigger = isloading => {
    const spinner = document.getElementById('spinner');
    if (isloading) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}

//Modal's Data
const loadModaldet = async (id) => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayModalData(data.data);
    } catch (error) {
        console.log(error);
    }
}

const displayModalData = data =>{
    document.getElementById('phone-modal-name').innerText = data.name
    const dataBody = document.getElementById('ModalBody');
    dataBody.innerHTML = `
    <img src="${data.image}" class="img-fluid rounded mb-2" alt="...">
    <p>Brand <span class="fw-bold">${data.brand}</span></p>
    <p>Release Date: ${data.releaseDate}</p>
    <p>Display Size <span class="fw-bold">${data.mainFeatures.displaySize}</span></p>
    <p>Chipset <span class="fw-bold">${data.mainFeatures.chipSet}</span></p>
    <p>Storage <span class="fw-bold">${data.mainFeatures.storage}</span></p>
    <p>Memory <span class="fw-bold">${data.mainFeatures.memory}</span></p>
    <p>Sensors: <span class="fw-bold">${data.mainFeatures.sensors}</span></p>
    <p>WiFi: <span class="fw-bold">${data.others.WLAN}</span></p>
    <p>Bluetooth: <span class="fw-bold">${data.others.Bluetooth}</span></p>
    <p>GPS: <span class="fw-bold">${data.others.GPS}</span></p>
    <p>NFc: <span class="fw-bold">${data.others.NFC}</span></p>
    <p>Radio: <span class="fw-bold">${data.others.Radio}</span></p>
    <p>USB: <span class="fw-bold">${data.others.USB}</span></p>
    `;
}

//
document.getElementById('btn-show-all').addEventListener('click', () => {
    searchProgress();
})


//default homeLoad
loadAll('iphone');