let username = document.querySelector(".username");
let email = document.querySelector(".email");
let password = document.querySelector(".password");
let confrimPassword = document.querySelector(".confrim-password");
let forms = document.querySelectorAll(".needs-validation");

Array.prototype.slice.call(forms).forEach(function (form) {
  form.addEventListener(
    "submit",
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add("was-validated");
    },
    false
  );
});
