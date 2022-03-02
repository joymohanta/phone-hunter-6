// Input Search Field
const searchPhone = () => {
  const inputPhone = document.getElementById("input-field");
  const inputText = inputPhone.value;
  inputPhone.value = "";
  if (inputText == "") {
    const error = document.getElementById("error");
    error.style.display = "block";
  } else {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`)
      .then((res) => res.json())
      .then((data) => displayPhone(data.data.slice(0, 20)));
    const error = document.getElementById("error");
    error.style.display = "none";
  }
};
// UI Card Show
const displayPhone = (phones) => {
  const containerDiv = document.getElementById("container");
  containerDiv.textContent = "";
  if (phones.length == 0) {
    const errorWord = document.getElementById("error-word");
    errorWord.style.display = "block";
  } else {
    phones.forEach((phone) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
      <div class="card h-100">
        <img src="${phone.image}" class="card-img-top size" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.brand}</h5>
          <h5 class="card-title part">${phone.phone_name} <a href="#scroll"><button onclick="mobileDetails('${phone.slug}')" class = "btn">Explore</button></a></h5>
        </div>
      </div>
        `;
      containerDiv.appendChild(div);
    });
    const errorWord = document.getElementById("error-word");
    errorWord.style.display = "none";
  }
};

// Card Button Section
const mobileDetails = (slug) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data.data));
};
// Device Details Section
const displayDetails = (phone) => {
  const detailItem = document.getElementById("cards");
  detailItem.textContent = "";
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4 ps-3 pt-2">
            <img src="${phone.image}" class="img-fluid rounded-start" alt="...">
            <h6 class="card-title">${phone.name}</h6>
              <h6 class="card-title">${
                phone.releaseDate || "Release date not found"
              }</h6>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h6>Main Features</h6>
              <p class="card-text"><small>Chipset: ${
                phone.mainFeatures.chipSet
              }</small></p>
              <p class="card-text"><small>Memory: ${
                phone.mainFeatures.memory
              }</small></p>
              <p><small>Storage: ${phone.mainFeatures.storage}</small></p>
              <p><small>Display Size: ${
                phone.mainFeatures.displaySize
              }</small></p>
            </div>
          </div>
        </div>
      </div>
  `;
  detailItem.appendChild(div);
};
