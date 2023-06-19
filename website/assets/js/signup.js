const BASE_URL = "http://localhost:8080/";

let username = document.querySelector("#username");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let forms = document.querySelectorAll(".needs-validation");

Array.prototype.slice.call(forms).forEach(function (form) {
  form.addEventListener(
    "submit",
    function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        async function addUser() {
          let user = {
            username: username.value,
            email: email.value,
            password: password.value,
          };
          await axios.post(`${BASE_URL}users`, user);
          window.location = "signin.html";
        }
        addUser();
      }

      form.classList.add("was-validated");
    },
    false
  );
});
