const menuIcon = document.querySelector("#menu");
const burgerMenu = document.querySelector("#burger-menu");
const header = document.querySelector("header");

// Menu click

menu.addEventListener("click", function (e) {
  if (this.classList.contains("fa-bars")) {
    this.classList = "fa-solid fa-xmark";
    burgerMenu.style.display = "flex";
  } else {
    this.classList = "fa-solid fa-bars";
    burgerMenu.style.display = "none";
  }
});

// Scroll nav

function scrollFunction() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    header.style.background = "#000";
  } else {
    header.style.background = "";
  }
}
window.addEventListener("scroll", scrollFunction);

// Swipper
var swiper = new Swiper("#hero-swiper", {
  spaceBetween: 30,
  effect: "fade",
  loop: true,
  zoom: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

var swiper = new Swiper("#product-swiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
