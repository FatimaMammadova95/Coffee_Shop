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