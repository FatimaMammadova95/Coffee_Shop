let row = document.querySelector(".card-row");
let total = document.querySelector(".total");
let cargo = document.querySelector(".cargo");

let account = localStorage.getItem("account");
let basket = JSON.parse(localStorage.getItem("basket"));

let price = 0;

function getData() {
  row.innerHTML = "";
  price = 0;
  basket.forEach((element) => {
    row.innerHTML += `
    <div class="col-12">
    <div class="product-about">
      <img src=${element.product.image} alt="" />
      <div class="product-text">
        <h1>${element.product.name}</h1>
        <p>${element.product.description}</p>
      </div>
    </div>
    <div class="value">
      <div class="number">
        <input
          class="input-number"
          type="number"
          value="${element.count}"
          min="0"
          max="10"
          oninput= inputFunc(${element.product.id})         
        />
      </div>
      <p class="price-card"><span class="price-value">${element.product.price}</span>$</p>      
      <a href="#"><i class="fa-solid fa-trash" onclick=deleteFunc(${element.product.id})></i></a>
    </div>
  </div>
    `;
    // inputFunc()
    price = price + element.product.price * element.count;
  });
  total.innerHTML = `<span>Product Total:</span> ${price}$`;
  cargo.innerHTML = `<span>Cargo:</span> ${price > 50 ? 0 : 10}$`;
}
if (account) {
  getData();
}

function inputFunc(id) {
  let totals = 0;
  let obj = basket.find((item) => item.product.id == id);

  document.querySelectorAll(".col-12 .value").forEach((element) => {
    let count = +element.querySelector(".input-number").value;
    let price = +element.querySelector(".price-value").innerText;
    // console.log(id);
    obj.count = count;
    console.log(obj);
    localStorage.setItem("basket", JSON.stringify(basket));
    totals += price * count;
    totals == 0 && deleteFunc(id);
  });
  price = totals;
  total.innerHTML = `<span>Product Total:</span> ${price}$`;
  cargo.innerHTML = `<span>Cargo:</span> ${price > 50 ? 0 : 10}$`;
}

async function deleteFunc(id) {
  basket = basket.filter((item) => item.product.id != id);
  localStorage.setItem("basket", JSON.stringify(basket));
  getData();
}
