const BASE_URL = "http://localhost:8080/";

let range = document.querySelectorAll(".range-slider span input");
let progress = document.querySelector(".range-slider .progress");
let inputValue = document.querySelectorAll(".numberVal input");
let row = document.querySelector(".card-row");
let searchInput = document.querySelector("#search");
let sortBtn = document.querySelector("#sort");
let load = document.querySelector(".load-more");
let productInterval = document.querySelector(".product-interval");
let allProductLength = document.querySelector(".all-product-length");
let categories = document.querySelectorAll(".categories a");
let tags = document.querySelectorAll(".tags li");

let dataArr = [];
let copyArr = [];
let sortedArr = [];

let gap = 0.1;
let max = 6;
let sorted = false;

function createCard(arr) {
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
          <a href="#" class="add" onclick=basketFunc(${element.id})>Add to Basket</a>
        </div>
        <div class="card-text">
          <h1>${element.name}</h1>
          <div class="stars" style="--rating: ${element.rating}"></div>
          <div class="price">${element.price}$</div>
        </div>
        <a href="#" class="favorite" onclick=favFunc(${element.id})
          ><i class="fa-regular fa-bookmark" ></i
        ></a>
      </div>
    </div>
          `;
  });
}

async function getData() {
  let res = await axios(`${BASE_URL}product`);
  dataArr = res.data;
  copyArr = searchInput.value || copyArr.length ? copyArr : res.data;
  productInterval.innerHTML = `1-${max}`;
  allProductLength.innerHTML = copyArr.length;
  createCard(sliceArr(copyArr));
}
getData();

function sliceArr(arr) {
  return arr.slice(0, max);
}

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

    // axios.get(`${BASE_URL}product`).then((response) => {
    //   copyArr = response.data.filter((item) =>
    //     item.price >= minRange && item.price <= maxRange
    //   );
    //   console.log(copyArr);
    //   createCard(sliceArr(copyArr));
    // });

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

let favorited = JSON.parse(localStorage.getItem("favorited")) ?? [];
let basket = JSON.parse(localStorage.getItem("basket")) ?? [];

async function favFunc(id) {
  let res = await axios(`${BASE_URL}product/${id}`);
  favorited.push(res.data);

  localStorage.setItem("favorited", JSON.stringify(favorited));
}
async function basketFunc(id) {
  let res = await axios(`${BASE_URL}product/${id}`);
  basket.push(res.data);

  localStorage.setItem("basket", JSON.stringify(basket));
}
