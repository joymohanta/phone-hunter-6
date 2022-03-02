// Input Search Field
const searchPhone = () => {
  const inputPhone = document.getElementById("input-field");
  const inputText = inputPhone.value;
  inputPhone.value = "";
  if (inputText == "") {
    const error = document.getElementById("error");
    error.style.display = "block";
  } else {
    //   console.log(inputText);
    fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`)
      .then((res) => res.json())
      .then((data) => displayPhone(data.data));
    const error = document.getElementById("error");
    error.style.display = "none";
  }
};
// UI Card Show
const displayPhone = (phones) => {
  // console.log(phones);
  const containerDiv = document.getElementById("container");
  containerDiv.textContent = "";
  phones.forEach((phone) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100">
      <img src="${phone.image}" class="card-img-top size" alt="...">
      <div class="card-body">
        <h5 class="card-title">${phone.brand}</h5>
        <h5 class="card-title part">${phone.phone_name} <button onclick="mobileDetails('${phone.slug}')" class = "btn">Explore</button></h5>
      </div>
    </div>
      `;
    containerDiv.appendChild(div);
  });
};
// Card Button Section
const mobileDetails = (slug) => {
  // console.log(slug);
  fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data.data));
};
// Device Details Section
const displayDetails = (phone) => {
  // console.log(phone);
  const detailItem = document.getElementById("cards");
  detailItem.textContent = "";
  const div = document.createElement("div");
  // div.classList.add("card");
  div.innerHTML = `
  <div class="card mb-3">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${phone.image}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h6 class="card-title">${phone.name}</h6>
              <h6 class="card-title">${phone.releaseDate}</h6>
              <p class="card-text"><small>Chipset: ${phone.mainFeatures.chipSet}</small></p>
              <p class="card-text"><small>Memory: ${phone.mainFeatures.memory}</small></p>
              <p><small>Storage: ${phone.mainFeatures.storage}</small></p>
            </div>
          </div>
        </div>
      </div>
  `;
  detailItem.appendChild(div);
};
