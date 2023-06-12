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
    header.style.background = "rgba(0, 0, 0, 0.451)";
  } else {
    header.style.background = "";
  }
}
window.addEventListener("scroll", scrollFunction);

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

// Swipper
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

// Scroll Reveal
ScrollReveal().reveal(".slide-up", {
  duration: 2000,
  origin: "bottom",
  distance: "100px",
  easing: "cubic-bezier(.37,.01,.74,1)",
  opacity: 0.3,
  scale: 0.5,
});

ScrollReveal().reveal(".slide-left", {
  duration: 2000,
  origin: "left",
  distance: "100px",
  easing: "cubic-bezier(.37,.01,.74,1)",
  opacity: 0.3,
});
ScrollReveal().reveal(".slide-right", {
  duration: 2000,
  origin: "right",
  distance: "100px",
  easing: "cubic-bezier(.37,.01,.74,1)",
  opacity: 0.3,
});
