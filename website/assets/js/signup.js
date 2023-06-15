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
  
      }else{
        let user = {
            username: username.value,
            email: email.value,
            password: password.value,
          };
          axios.post(`${BASE_URL}users`, user);
      }

      form.classList.add("was-validated");
    },
    false
  );
});
