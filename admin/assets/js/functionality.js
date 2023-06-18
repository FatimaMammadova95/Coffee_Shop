const menuIcon = document.querySelector("#menu-icon");
const burgerMenu = document.querySelector(".col-2");

menuIcon.addEventListener("click", function () {
  if (this.classList.contains("open")) {
    this.classList = "fa-solid fa-bars close";
    burgerMenu.style.display = "block";
  } else {
    this.classList = "fa-solid fa-bars open";
    burgerMenu.style.display = "none";
  }
});
