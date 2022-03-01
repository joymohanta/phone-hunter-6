const searchPhone = () => {
  const inputPhone = document.getElementById("input-field");
  const inputText = inputPhone.value;
  inputPhone.value = "";
  //   console.log(inputText);
  fetch(`https://openapi.programming-hero.com/api/phones?search=${inputText}`)
    .then((res) => res.json())
    .then((data) => displayPhone(data.data));
};
const displayPhone = (phones) => {
  console.log(phones);
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
        <h5 class="card-title part">${phone.phone_name} <button onclick="mobileDetails('${phone.slug}')">Explore</button></h5>
      </div>
    </div>
      `;
    containerDiv.appendChild(div);
  });
};
const mobileDetails = (slug) => {
  console.log(slug);
  fetch(`https://openapi.programming-hero.com/api/phone/${slug}`)
    .then((res) => res.json())
    .then((data) => displayDetails(data.data));
};
const displayDetails = (phone) => {
  console.log(phone);
};
