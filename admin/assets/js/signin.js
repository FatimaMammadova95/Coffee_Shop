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
          let res = await axios(`${BASE_URL}admin`);
          let data = res.data;
          return user = data.find(
            (user) =>
              (user.username == username.value ||
                user.email == username.value) &&
              user.password == password.value
          );
        }
        getData();
        if (!user) {
          alert("You are not user");
        } else {
          localStorage.setItem("admin", true);
        }
      }
      form.classList.add("was-validated");
    },
    false
  );
});
