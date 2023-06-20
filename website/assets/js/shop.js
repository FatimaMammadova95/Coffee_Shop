const BASE_URL = "http://localhost:8080/";

let range = document.querySelectorAll(".range-slider span input");
let progress = document.querySelector(".range-slider .progress");
let inputValue = document.querySelectorAll(".numberVal input");
let row = document.querySelector(".card-row");
let searchInput = document.querySelector("#search");
let sortItem = document.querySelectorAll(".sort-item");
let load = document.querySelector(".load-more");
let productInterval = document.querySelector(".product-interval");
let allProductLength = document.querySelector(".all-product-length");
let categories = document.querySelectorAll(".categories a");
let tags = document.querySelectorAll(".tags li");

let favorited = JSON.parse(localStorage.getItem("favorited")) ?? [];
let basket = JSON.parse(localStorage.getItem("basket")) ?? [];
let account = localStorage.getItem("account");

let dataArr = [];
let copyArr = [];
let sortedArr = [];

let gap = 0.1;
let max = 6;
let sorted = false;

function createCard(arr) {
  productInterval.innerHTML = `1-${max < arr.length ? max : arr.length}`;
  allProductLength.innerHTML = copyArr.length;
  row.innerHTML = "";
  arr.forEach((element) => {
    row.innerHTML += `
      <div class="col-12 col-md-6 col-lg-4">
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

async function getData() {
  let res = await axios(`${BASE_URL}product`);
  dataArr = res.data;
  copyArr = searchInput.value || copyArr.length ? copyArr : res.data;

  createCard(sliceArr(copyArr));
}
getData();

function sliceArr(arr) {
  return arr.slice(0, max);
}

//Load More
load.addEventListener("click", function () {
  max = max + 3;
  productInterval.innerHTML = `1-${max}`;

  if (max >= dataArr.length) {
    load.style.display = "none";
  }
  if (!sorted) {
    createCard(sliceArr(copyArr));
  } else {
    createCard(sliceArr(sortedArr));
  }
});

//Sort
sortItem.forEach((sort) => {
  sort.addEventListener("click", function () {
    sorted = true;
    if (sort.innerHTML == "Sort by price: low to high") {
      sortedArr = copyArr.toSorted((a, b) => a.price - b.price);
    } else if (sort.innerHTML == "Sort by price: high to low") {
      sortedArr = copyArr.toSorted((a, b) => b.price - a.price);
    } else if (sort.innerHTML == "Sort by popularity") {
      sortedArr = copyArr.toSorted((a, b) => b.rating - a.rating);
    } else {
      sortedArr = copyArr;
    }
    createCard(sliceArr(sortedArr));
  });
});

// Search
searchInput.addEventListener("input", function (e) {
  load.style.display = "block";
  copyArr = sortedArr.length ? sortedArr : dataArr;
  copyArr = copyArr.filter((item) =>
    item.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  createCard(sliceArr(copyArr));
});

// Categories
categories.forEach((category) => {
  category.addEventListener("click", function () {
    copyArr = dataArr.filter(
      (item) => item.category == category.innerHTML.toLocaleLowerCase() && item
    );
    createCard(sliceArr(copyArr));
  });
});

// Tags
tags.forEach((tag) => {
  tag.addEventListener("click", function (e) {
    e.preventDefault();
    copyArr = dataArr.filter((item) =>
      item.tags.includes(tag.innerHTML.toLocaleLowerCase())
    );
    createCard(sliceArr(copyArr));
  });
});

// Range
range.forEach((input) => {
  input.addEventListener("change", (e) => {
    let minRange = parseInt(range[0].value);
    let maxRange = parseInt(range[1].value);

    let rangedArr = dataArr.filter(
      (item) => item.price >= minRange && item.price <= maxRange
    );
    console.log(rangedArr);
    createCard(sliceArr(rangedArr));

    if (maxRange - minRange < gap) {
      if (e.target.className === "range-min") {
        range[0].value = maxRange - gap;
      } else {
        range[1].value = minRange + gap;
      }
    } else {
      progress.style.left = (minRange / range[0].max) * 100 + "%";
      progress.style.right = 100 - (maxRange / range[1].max) * 100 + "%";
      inputValue[0].value = minRange;
      inputValue[1].value = maxRange;
    }
  });
});

async function favFunc(id, fav) {
  if (account) {
    if (!fav.checked) {
      favorited = favorited.filter((item) => item.id != id);
    } else {
      let res = await axios(`${BASE_URL}product/${id}`);
      favorited.push(res.data);
    }
    localStorage.setItem("favorited", JSON.stringify(favorited));
  } else {
    alert("Hesaba daxil ol");
  }
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
    alert("Hesaba daxil ol");
  }
}

function details(id){
  window.location=`details.html?id=${id}`
}