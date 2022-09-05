// load all phones
const leadPhones = searchFieldValue => {
     const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldValue}`;
     fetch(url)
     .then(res => res.json())
     .then(data => displayPhones(data.data))
     .catch(error => console.log(error))
}

// display phones using loop
const displayPhones = phones => {
     // console.log(phones);
     const phonesContainer = document.getElementById('phones-container');
     phonesContainer.innerHTML = '';

     phones.forEach(phone => {
          // console.log(phone);

          const currentColDiv = document.createElement('div');
          currentColDiv.classList.add('col');

          currentColDiv.innerHTML = `
               <div class="card">
                    <img src="${phone.image}" class="card-img-top phone-img" alt="...">
                    <div class="card-body">
                         <h5 class="card-title">${phone.phone_name}</h5>
                         <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                         <button class="btn btn-secondary mt-2" data-bs-toggle="modal" data-bs-target="#display-modal" onclick="loadPhonesId('${phone.slug}')">Show details &nbsp<i class="fa-sharp fa-solid fa-arrow-right"></i></button>
                    </div>
               </div>
          `;
          phonesContainer.appendChild(currentColDiv);
     })
}
leadPhones('iphone');

// search phone by eventListener
document.getElementById('search-btn').addEventListener('click', function() {
     const searchFieldId = document.getElementById('search-field');
     const searchFieldValue = searchFieldId.value;
     searchFieldId.value = '';
     leadPhones(`${searchFieldValue}`);
     // console.log(searchFieldValue);
})

// load some info of a phone in modal
const loadPhonesId = phoneId => {
     // console.log(phoneId);

     const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
     fetch(url)
     .then(res => res.json())
     .then(data => displayPhonesInfo(data.data))
     .catch(error => console.log(error))
}

// display some info of a phone in modal
const displayPhonesInfo = phoneInfo => {
     console.log(phoneInfo);

     // add phone name in modal-title
     document.getElementById('modal-title').innerText = `${phoneInfo.name}`;

     // display info in modal body
     const modalBody = document.getElementById('modal-body');
     modalBody.innerHTML = '';

     const currentDiv = document.createElement('div');
     currentDiv.innerHTML = `
          <p>Brand name: ${phoneInfo.brand}</p>
          <p>Release date: ${phoneInfo.releaseDate ? phoneInfo.releaseDate : 'No data available'}</p>
          <p>Storage: ${phoneInfo.mainFeatures.storage}</p>
          <p>Memory: ${phoneInfo.mainFeatures.memory}</p>
          <p>ClipSet: ${phoneInfo.mainFeatures.chipSet}</p>
          <p>Sensor: ${phoneInfo.mainFeatures.sensors}</p>
     `;
     modalBody.appendChild(currentDiv);
}