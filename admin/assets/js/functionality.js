let menuIcon = document.querySelector("#menu-icon");
let burgerMenu = document.querySelector(".col-2");
let darkMode = document.querySelector(".dark-mode");

menuIcon.addEventListener("click", function () {
  if (this.classList.contains("open")) {
    this.classList = "fa-solid fa-bars close";
    burgerMenu.style.display = "block";
  } else {
    this.classList = "fa-solid fa-bars open";
    burgerMenu.style.display = "none";
  }
});

let dark = localStorage.getItem("dark-mode");
if (dark) {
  darkMode.style.fill = "white";
} else {
  darkMode.style.fill = "none";
}

darkMode.addEventListener("click", function () {
  localStorage.setItem("dark-mode", true);
});
