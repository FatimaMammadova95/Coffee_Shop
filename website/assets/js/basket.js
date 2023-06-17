let row = document.querySelector(".card-row");
let total = document.querySelector(".total");
let cargo = document.querySelector(".cargo");
let basket = JSON.parse(localStorage.getItem("basket"));

window.inputNumber = function (el) {
  let min = el.attr("min") || false;
  let max = el.attr("max") || false;

  let els = {};

  els.dec = el.prev();
  els.inc = el.next();

  el.each(function () {
    init($(this));
  });

  function init(el) {
    els.dec.on("click", decrement);
    els.inc.on("click", increment);

    function decrement() {
      let value = el[0].value;
      value--;
      if (!min || value >= min) {
        el[0].value = value;
      }
    }

    function increment() {
      let value = el[0].value;
      value++;
      if (!max || value <= max) {
        el[0].value = value++;
      }
    }
  }
};

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
        <span class="input-number-decrement">-</span
        ><input
          class="input-number"
          type="text"
          value="1"
          min="1"
          max="10"
        /><span class="input-number-increment">+</span>
      </div>
      <p class="price-card">${element.price}$</p>
      <i class="fa-solid fa-trash"></i>
    </div>
  </div>
    `;
    inputNumber($(".input-number"));
  });
}
getData();
