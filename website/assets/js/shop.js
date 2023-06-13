const BASE_URL = "http://localhost:8080/";

let range = document.querySelectorAll(".range-slider span input");
let progress = document.querySelector(".range-slider .progress");
let inputValue = document.querySelectorAll(".numberVal input");
let row = document.querySelector(".card-row");
let searchInput = document.querySelector("#search");
let sortBtn = document.querySelector("#sort");
let load = document.querySelector(".load-more");

let dataArr = [];
let copyArr = [];
let sortedArr = [];

let gap = 0.1;
let max = 9;
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
          <div class="add">Add to Basket</div>
        </div>
        <div class="card-text">
          <h1>${element.name}</h1>
          <div class="stars" style="--rating: ${element.rating}"></div>
          <div class="price">${element.price}$</div>
        </div>

        <a href="#" class="favorite"
          ><i class="fa-regular fa-bookmark"></i
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
  createCard(sliceArr(copyArr));
}
getData();

function sliceArr(arr) {
  return arr.slice(0, max);
}

// Range
range.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minRange = parseInt(range[0].value);
    let maxRange = parseInt(range[1].value);

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
