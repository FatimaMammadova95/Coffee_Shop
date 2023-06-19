const BASE_URL = "http://localhost:8080/";

let row = document.querySelector(".card-row");

let account = localStorage.getItem("account");
let favorited = JSON.parse(localStorage.getItem("favorited"));
let basket = JSON.parse(localStorage.getItem("basket")) ?? [];

function createCard() {
  row.innerHTML = "";
  favorited.forEach((element) => {
    row.innerHTML += `
      <div class="col-12 col-md-6 col-lg-3">
       <div class="card">
         <div class="card card-image">
           <img
            src="${element.image}"
            alt=""
           />
           <a href="#" class="add" onclick=basketFunc(${
             element.id
           })>Add to Basket</a>
         </div>
         <div class="card-text">
          <h1>${element.name}</h1>
          <div class="stars" style="--rating: ${element.rating}"></div>
          <div class="price">${element.price}$</div>
         </div>
         <div class="bookmark">
          <input type="checkbox" class="fav" onclick=favFunc(${
            element.id
          },this) ${
      favorited.find((item) => item.id === element.id) ? "checked" : ""
    }>
         </div>
        </div>
      </div>
          `;
  });
}
if (account) {
  createCard();
}

async function favFunc(id, fav) {
  if (!fav.checked) {
    favorited = favorited.filter((item) => item.id != id);
  } else {
    let res = await axios(`${BASE_URL}product/${id}`);
    favorited.push(res.data);
  }
  localStorage.setItem("favorited", JSON.stringify(favorited));
  createCard();
}

async function basketFunc(id) {
  if (basket.find((item) => item.id == id)) {
    alert("Baskette var");
  } else {
    let res = await axios(`${BASE_URL}product/${id}`);
    basket.push(res.data);
    localStorage.setItem("basket", JSON.stringify(basket));
  }
}
