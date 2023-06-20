const BASE_URL = "http://localhost:8080/";

let row = document.querySelector(".card-row");
let searchInput = document.querySelector("#search");
let sortItem = document.querySelectorAll(".sort-item");

let account = localStorage.getItem("account");
let favorited = JSON.parse(localStorage.getItem("favorited"));
let basket = JSON.parse(localStorage.getItem("basket")) ?? [];

let copyArr = searchInput.value ? copyArr : favorited;


function createCard(arr) {
  row.innerHTML = "";
  arr.forEach((element) => {
    row.innerHTML += `
      <div class="col col-6 col-md-4 col-lg-3">
       <div class="card">
         <div class="card card-image">
           <img
            src="${element.image}"
            alt=""
           />           
         </div>
         <div class="card-text" onclick=details(${element.id}) >
          <h1>${element.name}</h1>
          <div class="stars" style="--rating: ${element.rating}"></div>
          <div class="price">${element.price}$</div>
         </div>         
         <div class="bookmark">
          <input type="checkbox" class="fav" onclick=favFunc(${
            element.id
          },this) 
          ${favorited.find((item) => item.id === element.id) ? "checked" : ""}>
         </div>
         <a href="#product" class="add" onclick=basketFunc(${element.id})><i class="fa-solid fa-basket-shopping"></i></a>
              
        </div>
      </div>
          `;
  });
}
if (account) {
  createCard(favorited);
}

//Sort
sortItem.forEach((sort) => {
  sort.addEventListener("click", function () {
    sorted = true;
    if (sort.innerHTML == "Sort by price: low to high") {
      copyArr = favorited.toSorted((a, b) => a.price - b.price);
    } else if (sort.innerHTML == "Sort by price: high to low") {
      copyArr = favorited.toSorted((a, b) => b.price - a.price);
    } else if (sort.innerHTML == "Sort by popularity") {
      copyArr = favorited.toSorted((a, b) => b.rating - a.rating);
    } else {
      copyArr = favorited;
    }
    createCard(copyArr);
  });
});

// Search
searchInput.addEventListener("input", function (e) {
  copyArr =  favorited;
  copyArr = copyArr.filter((item) =>
    item.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  createCard(copyArr);
});

async function favFunc(id, fav) {
  if (!fav.checked) {
    favorited = favorited.filter((item) => item.id != id);
  } else {
    let res = await axios(`${BASE_URL}product/${id}`);
    favorited.push(res.data);
  }
  localStorage.setItem("favorited", JSON.stringify(favorited));
  createCard(favorited);
}

async function basketFunc(id) {
  if (account) {
    let res = await axios(`${BASE_URL}product/${id}`);
    if (basket.find((item) => item.product.id == id)) {
      let obj = basket.find((item) => item.product.id == id);
      obj.count += 1;
      console.log(basket);
      console.log(obj);
    } else {
      let obj = {
        count: 1,
        product: res.data,
      };
      basket.push(obj);
    }
    localStorage.setItem("basket", JSON.stringify(basket));
  } else {
    window.location="signin.html"
  }
}
function details(id){
  window.location=`details.html?id=${id}`
}