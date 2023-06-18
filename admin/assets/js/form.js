const BASE_URL = "http://localhost:8080/";

let form = document.querySelector(".form");
let productName = document.querySelector("#name");
let productDescription = document.querySelector("#description");
let productCategory = document.querySelector("#category");
let productTags = document.querySelector("#tags");
let productImage = document.querySelector("#image");
let productRoasting = document.querySelector("#roasting");
let productBody = document.querySelector("#product-body");
let productSweetness = document.querySelector("#sweetness");
let productAcidity = document.querySelector("#acidity");
let productPrice = document.querySelector("#price");
let productWeight = document.querySelector("#weight");
let productLength = document.querySelector("#length");
let productWidth = document.querySelector("#width");
let productHeight = document.querySelector("#height");
let productSku = document.querySelector("#sku");
let addEdit = document.querySelector(".add-edit");
let submit = document.querySelector(".submit");

let id = new URLSearchParams(window.location.search).get("id");

if (id) {
  addEdit.innerHTML = "Edit";
  submit.innerHTML = "Edit";
  async function getData() {
    let res = await axios(`${BASE_URL}product/${id}`);
    let data = res.data;    
    productName.value = data.name;
    productDescription.value = data.description;
    productCategory.value = data.category;
    productRoasting.value = data.feature["roasting level"];
    productBody.value = data.feature.body;
    productSweetness.value = data.feature.sweetness;
    productAcidity.value = data.feature.acidity;
    productPrice.value = data.price;
    productWeight.value = data["additional information"].weight;
    productLength.value = data["additional information"].dimensions.length;
    productWidth.value = data["additional information"].dimensions.width;
    productHeight.value = data["additional information"].dimensions.height;
    productSku.value = data.sku;
  }
  getData();
}

form.addEventListener("submit", async function () {
  let obj = {
    name: productName.value,
    description: productDescription.value,
    image: `../photo/product/${productImage.value.split("\\")[2]}`,
    feature: {
      "roasting level": productRoasting.value,
      body: productBody.value,
      sweetness: productSweetness.value,
      acidity: productAcidity.value,
    },
    "additional information": {
      weight: productWeight.value,
      dimensions: {
        length: productLength.value,
        width: productWidth.value,
        height: productHeight.value,
      },
    },
    category: productCategory.value,
    tags: [productTags.value],
    rating: 0,
    popularity: 0,
    reviews: [],
    price: productPrice.value,
    sku: productSku.value,
  };
  if (id) {
    await axios.patch(`${BASE_URL}product/${id}`, obj);
  } else {
    await axios.post(`${BASE_URL}product`, obj);
  }
  window.location = "admin.html";
});
