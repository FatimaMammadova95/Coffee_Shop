const BASE_URL = "http://localhost:8080/";

let row = document.querySelector(".menu-row");

function createCard(arr) {
  row.innerHTML = "";
  arr.forEach((element) => {
    row.innerHTML += `
    <div class="col-12 col-md-6">
    <div class="coffee-image">
      <img
        src="${element.image}"
        alt=""
      />
    </div>
    <div class="coffee-text">
      <div class="coffee-name">
        <h1>${element.name}</h1>
        <div class="line"></div>
        <div class="price">${element.price}$</div>
      </div>
      <div class="description">
        <p><span>Ingredient: </span>${element.ingredient}</p>
      </div>
    </div>
    <div class="nutrition card">
      <h1>Nutrition information</h1>
      <ul>
        <li><span>Energy: </span>${element.nutrition.energy}</li>
        <li><span>Carbohydrates: </span>${element.nutrition.carbohydrates}</li>
        <li><span>Fat: </span>${element.nutrition.fat}</li>
        <li><span>Protein: </span>${element.nutrition.protein}</li>
        <li><span>Water: </span>${element.nutrition["Other constituents"].water}</li>
        <li><span>Caffeine: </span>${element.nutrition["Other constituents"].caffeine}</li>
      </ul>
      <p>
        * 2,000 calories a day is used for general nutrition advice,
        but calorie needs vary.
      </p>
    </div>
  </div>
            `;
  });
}

async function getData() {
  let res = await axios(`${BASE_URL}menu`);
  data = res.data;
  createCard(data);
}
getData();
