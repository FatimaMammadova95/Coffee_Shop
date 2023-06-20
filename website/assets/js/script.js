const BASE_URL = "http://localhost:8080/";

let rowLeft = document.querySelector(".menu-row-left");
let rowRight = document.querySelector(".menu-row-right");
let email = document.querySelector("#Email");
let subscribe = document.querySelector(".button--submit");
let selectPerson = document.querySelector(".select-person");
let selectTime = document.querySelector(".select-time");
let reserveForm = document.querySelector(".reserve-form");
let links = document.querySelectorAll(".links a");
let productSlider = document.querySelector("#product-slider");
let dataArr;

function menuLeft(arr) {
  rowLeft.innerHTML = "";
  arr = arr.slice(0, 4);
  arr.forEach((element) => {
    rowLeft.innerHTML += `
      <div class="col-12">
        <div class="coffee-name">
          <h1>${element.name}</h1>
          <div class="line"></div>
          <div class="price">$ ${element.price}</div>
        </div>
        <div class="description">
          <p>${element.description}</p>
        </div>
      </div>
    `;
  });
}
function menuRight(arr) {
  rowRight.innerHTML = "";
  arr = arr.slice(5, 9);
  arr.forEach((element) => {
    rowRight.innerHTML += `
      <div class="col-12">
        <div class="coffee-name">
          <h1>${element.name}</h1>
          <div class="line"></div>
          <div class="price">$ ${element.price}</div>
        </div>
        <div class="description">
          <p>${element.description}</p>
        </div>
      </div>
    `;
  });
}
async function getDataInMenu() {
  let res = await axios(`${BASE_URL}menu`);
  data = res.data;
  menuLeft(data);
  menuRight(data);
}
getDataInMenu();

async function getDataInProduct() {
  let res = await axios(`${BASE_URL}product`);
  data = res.data;
  dataArr = data;
  topProduct(dataArr);
}
getDataInProduct();


subscribe.addEventListener("click", async function (e) {
  e.preventDefault();
  let obj = {
    email: email.value,
  };
  await axios.post(`${BASE_URL}subscriptions`, obj);
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "You have subscribed",
    showConfirmButton: false,
    timer: 1500,
  });
});

reserveForm.addEventListener("submit", async function () {
  let obj = {
    numberOfCustomer: selectPerson.value,
    selectTime: selectTime.value,
  };
  await axios.post(`${BASE_URL}reservation`, obj);
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Your reservation has been accepted",
    showConfirmButton: false,
    timer: 1500,
  });
});

var selector = ".links a";

$(selector).on("click", function () {
  $(selector).removeClass("active");
  $(this).addClass("active");
  let coffee = document.querySelector(".active").dataset.coffee;
  arr = dataArr.filter((obj) => obj.category == coffee);
  topProduct(arr);
});

function topProduct(arr) {
  arr = arr.sort((a, b) => a.popularity - b.popularity).slice(0, 4);

  productSlider.innerHTML = "";
  arr.forEach((element) => {
    productSlider.innerHTML += `
    <div class="swiper-slide">
    <img src=${element.image} alt="" />
    <h4>${element.name}</h4>
    <p class="price">${element.price} $</p>
  </div>
    `;
  });
}

let a = 0;
$(window).scroll(function () {
  let oTop = $("#counter").offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $(".count").each(function () {
      let $this = $(this);
      jQuery({ Counter: 0 }).animate(
        { Counter: $this.text() },
        {
          duration: 2000,
          easing: "swing",
          step: function () {
            $this.text(Math.ceil(this.Counter));
          },
        }
      );
    });
    a = 1;
  }
});

ScrollReveal().reveal(".slide-up", {
  duration: 2000,
  origin: "bottom",
  distance: "50px",
  easing: "cubic-bezier(.37,.01,.74,1)",
  opacity: 0.3,
  scale: 0.5,
});

ScrollReveal().reveal(".slide-left", {
  duration: 1000,
  origin: "left",
  distance: "20px",
  easing: "cubic-bezier(.37,.01,.74,1)",
  opacity: 0.3,
});
ScrollReveal().reveal(".slide-right", {
  duration: 1000,
  origin: "right",
  distance: "20px",
  easing: "cubic-bezier(.37,.01,.74,1)",
  opacity: 0.3,
});
