let menuIcon = document.querySelector("#menu-icon");
let burgerMenu = document.querySelector(".col-2");
let darkMode = document.querySelector(".dark-mode");
let header = document.querySelector("header");
let title = document.querySelector("#title");
let table = document.querySelector("table");
let addEditForm = document.querySelector(".form");
let logout = document.querySelector(".logout");

let id = localStorage.getItem("admin") || false;
let dark = localStorage.getItem("dark-mode") || "";

if (!id) {
  document.body.innerHTML = "";
}

menuIcon.addEventListener("click", function () {
  if (this.classList.contains("open")) {
    this.classList = "fa-solid fa-bars close";
    burgerMenu.style.display = "none";
  } else {
    this.classList = "fa-solid fa-bars open";
    burgerMenu.style.display = "block";
  }
});

function darkModeFunc() {
  if (dark) {
    darkMode.style.fill = "white";
    burgerMenu.classList.add("dark");
    header.classList.add("dark");
    title.classList.add("dark");
    table?.classList.add("table-dark");
    addEditForm?.classList.add("dark");
  } else {
    darkMode.style.fill = "none";
    burgerMenu.classList.remove("dark");
    header.classList.remove("dark");
    title.classList.remove("dark");
    table?.classList.remove("table-dark");
    addEditForm?.classList.remove("dark");
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

logout.addEventListener("click", function () {
  localStorage.removeItem("admin");
  window.location = "signin.html";
});
