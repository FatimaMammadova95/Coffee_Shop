const BASE_URL = "http://localhost:8080/";

let form = document.querySelector(".form");
let productName = document.querySelector("#name");
let productDescription = document.querySelector("#description");
let productVolume = document.querySelector("#volume");
let productIngredient = document.querySelector("#ingredient");
let productImage = document.querySelector("#image");
let productEnergy = document.querySelector("#energy");
let productCarbohydrates = document.querySelector("#carbohydrates");
let productFat = document.querySelector("#fat");
let productProtein = document.querySelector("#protein");
let productPrice = document.querySelector("#price");
let productRiboflavin = document.querySelector("#riboflavin");
let productNiacin = document.querySelector("#niacin");
let productMagnesium = document.querySelector("#magnesium");
let productWater = document.querySelector("#water");
let productCaffeine = document.querySelector("#caffeine");
let addEdit = document.querySelector(".add-edit");
let submit = document.querySelector(".submit");

let id = new URLSearchParams(window.location.search).get("id");

if (id) {
  addEdit.innerHTML = "Edit";
  submit.innerHTML = "Edit";
  async function getData() {
    let res = await axios(`${BASE_URL}menu/${id}`);
    let data = res.data;
    productName.value = data.name;
    productDescription.value = data.description;
    productVolume.value = data.volume;
    productIngredient.value = data.ingredient;
    productEnergy.value = data.nutrition.energy;
    productCarbohydrates.value = data.nutrition.carbohydrates;
    productFat.value = data.nutrition.fat;
    productProtein.value = data.nutrition.protein;
    productPrice.value = data.price;
    productRiboflavin.value = data.nutrition.vitamins.riboflavin;
    productNiacin.value = data.nutrition.vitamins.niacin;
    productMagnesium.value = data.nutrition.minerals.magnesium;
    productWater.value = data.nutrition["Other constituents"].water;
    productCaffeine.value = data.nutrition["Other constituents"].caffeine;
  }
  getData();
}
form.addEventListener("submit", async function () {
  let obj = {
    name: productName.value,
    description: productDescription.value,
    image: `../photo/menu/${productImage.value.split("\\")[2]}`,
    volume: productVolume.value,
    ingredient: [productIngredient],
    nutrition: {
      energy: productEnergy.value,
      carbohydrates: productCarbohydrates.value,
      fat: productFat.value,
      protein: productProtein.value,
      vitamins: {
        riboflavin: productRiboflavin.value,
        niacin: productNiacin.value,
      },
      minerals: {
        magnesium: productMagnesium.value,
      },
      "Other constituents": {
        water: productWater.value,
        theobromine: "0 mg",
        caffeine: productCaffeine.value,
      },
    },
    price: productPrice.value,
    popularity: 0,
  };
  if (id) {
    await axios.patch(`${BASE_URL}menu/${id}`, obj);
  } else {
    await axios.post(`${BASE_URL}menu`, obj);
  }
  window.location = "admin.html";
});
