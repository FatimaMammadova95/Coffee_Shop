const BASE_URL = "http://localhost:8080/";

let username = document.querySelector("#username");
let password = document.querySelector("#password");
let forms = document.querySelectorAll(".needs-validation");

let user;

Array.prototype.slice.call(forms).forEach(function (form) {
  form.addEventListener(
    "submit",
    function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        event.stopPropagation();
      } else {
        async function getData() {
          let res = await axios(`${BASE_URL}users`);
          let data = res.data;
          user = data.find(
            (user) =>
              (user.username == username.value ||
                user.email == username.value) &&
              user.password == password.value
          );
          if (!user) {
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Your are not user",
              showConfirmButton: false,
              timer: 1500,
            });
          } else {
            localStorage.setItem("account", true);
            window.location = "index.html";
          }
        }
        getData();
      }
      form.classList.add("was-validated");
    },
    false
  );
});
