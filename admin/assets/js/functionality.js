let menuIcon = document.querySelector("#menu-icon");
let burgerMenu = document.querySelector(".col-2");
let darkMode = document.querySelector(".dark-mode");
let header = document.querySelector("header");
let title = document.querySelector("#title");
let table = document.querySelector("table")

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
function darkModeFunc() {
  if (dark) {
    darkMode.style.fill = "white";
    burgerMenu.classList.add("dark");
    header.classList.add("dark");
    title.classList.add("dark");
    table.classList.add("table-dark")
  } else {
    darkMode.style.fill = "none";
    burgerMenu.classList.remove("dark");
    header.classList.remove("dark");
    title.classList.remove("dark");
    table.classList.remove("table-dark")

  }
}
darkModeFunc();

darkMode.addEventListener("click", function () {
  if (dark) {
    localStorage.removeItem("dark-mode");
    dark = localStorage.getItem("dark-mode");
  } else {
    localStorage.setItem("dark-mode", true);
    dark = localStorage.getItem("dark-mode");
  }
  darkModeFunc();
});
