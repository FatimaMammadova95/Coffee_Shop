const BASE_URL = "http://localhost:8080/";

let rowLeft = document.querySelector(".menu-row-left");
let rowRight = document.querySelector(".menu-row-right");
let email = document.querySelector("#Email");
let subscribe = document.querySelector(".button--submit");

// Menu
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
async function getData() {
  let res = await axios(`${BASE_URL}menu`);
  data = res.data;
  menuLeft(data);
  menuRight(data);
}
getData();

// Subscribe

subscribe.addEventListener("click", async function () {
  let obj = {
    email: email.value,
  };
  await axios.post(`${BASE_URL}subscriptions`, obj);
  alert("You have subscribed")
});

// Counter
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

// Scroll Reveal
ScrollReveal().reveal(".slide-up", {
  duration: 2000,
  origin: "bottom",
  distance: "50px",
  easing: "cubic-bezier(.37,.01,.74,1)",
  opacity: 0.3,
  scale: 0.5,
});

ScrollReveal().reveal(".slide-left", {
  duration: 2000,
  origin: "left",
  distance: "20px",
  easing: "cubic-bezier(.37,.01,.74,1)",
  opacity: 0.3,
});
ScrollReveal().reveal(".slide-right", {
  duration: 2000,
  origin: "right",
  distance: "20px",
  easing: "cubic-bezier(.37,.01,.74,1)",
  opacity: 0.3,
});
