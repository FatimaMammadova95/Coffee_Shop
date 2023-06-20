const menuIcon = document.querySelector("#header-menu");
const burgerMenu = document.querySelector("#burger-menu");
const header = document.querySelector("header");
const logout = document.querySelectorAll(".logout");

logout.forEach((element) => {
  element.addEventListener("click", function () {
    localStorage.removeItem("account");
  });
});


menuIcon.addEventListener("click", function (e) {
  if (this.classList.contains("fa-bars")) {
    this.classList = "fa-solid fa-xmark";
    burgerMenu.style.display = "flex";
  } else {
    this.classList = "fa-solid fa-bars";
    burgerMenu.style.display = "none";
  }
});

function scrollFunction() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    header.style.background = "rgba(0, 0, 0, 0.7)";
  } else {
    header.style.background = "";
  }
}
window.addEventListener("scroll", scrollFunction);

$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".top-back").fadeIn();
    } else {
      $(".top-back").fadeOut();
    }
  });
  $(".top-back").click(function () {
    $("html, body").animate({ scrollTop: 100 }, 100);
    return false;
  });
});

let heroSwiper = new Swiper("#hero-swiper", {
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

let productSwiper = new Swiper("#product-swiper", {
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

let partnersSwiper = new Swiper("#partners-swiper", {
  slidesPerView: 5,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
});
