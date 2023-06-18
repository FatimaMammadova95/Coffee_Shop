const BASE_URL = "http://localhost:8080/";

let username = document.querySelector("#username");
let password = document.querySelector("#password");
let forms = document.querySelectorAll(".needs-validation");

let admin;

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
          return admin = data.find(
            (admin) =>
              (admin.username == username.value ||
                admin.email == username.value) &&
              admin.password == password.value
          );
        }
        getData();
        if (!admin) {
        //   alert("You are not admin");
        } else {
          console.log(admin.id);
          localStorage.setItem("admin", admin.id);
          window.location="admin.html"
        }
      }
      form.classList.add("was-validated");
    },
    false
  );
});
