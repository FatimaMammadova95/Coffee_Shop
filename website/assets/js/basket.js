let row = document.querySelector(".card-row");
let total = document.querySelector(".total");
let cargo = document.querySelector(".cargo");

let account = localStorage.getItem("account");
let basket = JSON.parse(localStorage.getItem("basket"));

let price = 0;

function getData() {
  row.innerHTML = "";
  basket.forEach((element) => {
    row.innerHTML += `
    <div class="col-12">
    <div class="product-about">
      <img src=${element.image} alt="" />
      <div class="product-text">
        <h1>${element.name}</h1>
        <p>${element.description}</p>
      </div>
    </div>
    <div class="value">
      <div class="number">
        <input
          class="input-number"
          type="number"
          value="1"
          min="1"
          max="10"
          oninput= inputFunc(${element.price},this)         
        />
      </div>
      <p class="price-card">${element.price}$</p>      
      <a href="#"><i class="fa-solid fa-trash" onclick=deleteFunc(${element.id})></i></a>
    </div>
  </div>
    `;
    price = price + element.price;
  });
  total.innerHTML = `<span>Product Total:</span> ${price}$`;
  cargo.innerHTML = `<span>Cargo:</span> ${price > 50 ? 0 : 10}$`;
}
if (account) {
  getData();
}

// function inputFunc(productPrice, input) {
//   price = price + productPrice * (input.value - 1);
//   total.innerHTML = `<span>Product Total:</span> ${price}$`;
//   cargo.innerHTML = `<span>Cargo:</span> ${price > 50 ? 0 : 10}$`;
// }

async function deleteFunc(id) {
  basket = basket.filter((item) => item.id != id);
  localStorage.setItem("basket", JSON.stringify(basket));
  getData();
}
