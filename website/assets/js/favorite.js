const BASE_URL = "http://localhost:8080/";

let row = document.querySelector(".card-row");

function createCard(arr) {
  row.innerHTML = "";
  arr.forEach((element) => {
    row.innerHTML += `
        <div class="col-12 col-md-6 col-lg-3">
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
  let data = res.data;
  createCard(data)
}
getData();
