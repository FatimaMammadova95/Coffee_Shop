const BASE_URL = "http://localhost:8080/";

let product = document.querySelector(".product");
let user = document.querySelector(".user");
let menu = document.querySelector(".menu-length");
let reservation = document.querySelector(".reservation");
let welcome = document.querySelector(".welcome");
let username = document.querySelector(".admin-username")
let email = document.querySelector(".admin-email")



async function getData() {
  let productRes = await axios(`${BASE_URL}product`);
  let userRes = await axios(`${BASE_URL}users`);
  let menuRes = await axios(`${BASE_URL}menu`);
  let reservationRes = await axios(`${BASE_URL}reservation`);
  let adminRes = await axios(`${BASE_URL}admin/${id}`);

  product.innerHTML = productRes.data.length;
  user.innerHTML = userRes.data.length;
  menu.innerHTML = menuRes.data.length;
  reservation.innerHTML = reservationRes.data.length;
  welcome.innerHTML = `Welcome, ${adminRes.data.username.toLocaleUpperCase()}`
  username.innerHTML = adminRes.data.username
  email.innerHTML = adminRes.data.email
}
getData();



// Chart
const xValues1 = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const yValues2 = [110, 50, 212, 156, 246, 124, 236, 200, 146, 90, 222];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues1,
    datasets: [
      {
        fill: false,
        lineTension: 0,
        backgroundColor: "rgba(0,0,255,1.0)",
        borderColor: "rgba(0,0,255,0.8)",
        data: yValues2,
      },
    ],
  },
  options: {
    legend: { display: false },
    scales: {
      y: {
        min: 6,
        max: 230,
        ticks: {
          stepSize: 50,
        },
      },
    },
  },
});
