let row = document.querySelector(".card-row");
let total = document.querySelector(".total");
let cargo = document.querySelector(".cargo");
let basket = JSON.parse(localStorage.getItem("basket"));

let price = 0;

function getData() {
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
          oninput= "inputFunc()"         
        />
      </div>
      <p class="price-card">${element.price}$</p>
      <i class="fa-solid fa-trash"></i>
    </div>
  </div>
    `;    
    price = price + element.price;
  });
}
getData();

total.innerHTML = `<span>Product Total:</span> ${price}$`;
cargo.innerHTML = `<span>Cargo:</span> ${price > 50 ? 0 : 10}$`;

// function inputFunc(e){
  
//   console.log(e.target.value);
// }