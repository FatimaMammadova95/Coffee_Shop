const BASE_URL = "http://localhost:8080/";

let product = document.querySelector(".product");
let user = document.querySelector(".user");
let menu = document.querySelector(".menu-length");
let reservation = document.querySelector(".reservation");

async function getData(){
  let productRes = await axios(`${BASE_URL}product`);
  let userRes = await axios(`${BASE_URL}users`);
  let menuRes = await axios(`${BASE_URL}menu`);  
  let reservationRes = await axios(`${BASE_URL}reservation`);

  product.innerHTML=productRes.data.length
  user.innerHTML=userRes.data.length
  menu.innerHTML=menuRes.data.length
  reservation.innerHTML=reservationRes.data.length
}
getData()
