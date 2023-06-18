const BASE_URL = "http://localhost:8080/";


const tBody = document.querySelector("tbody");
const searchInput = document.querySelector("#simple-search");

let dataArr = [];
let copyArr = [];
let sortedArr = [];

function createCard(arr) {
  tBody.innerHTML = "";
  arr.forEach((element, index) => {
    tBody.innerHTML += `
<tr>
<td>${index}</td>
<td><img src=${element.image} width="70px"></td>
<td>${element.name}</td>
<td class="description">${element.description}</td>
<td>${element.price}</td>
<td>${element.rating}</td>
<td class="process">
<a href="#" onclick=deleteFunc(${element.id})><i class="fa-solid fa-trash"></i></a>
<a href="form.html?id=${element.id}"><i class="fa-solid fa-pen"></i></a>
</td>
</tr>`;
  });
}

async function getData() {
  let res = await axios(`${BASE_URL}product`);
  dataArr = res.data;
  copyArr = searchInput.value || copyArr.length ? copyArr : res.data;

  createCard(copyArr);
}
getData();

// Search
searchInput.addEventListener("input", function (e) {
  copyArr = sortedArr.length ? sortedArr : dataArr;
  copyArr = copyArr.filter((item) =>
    item.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  createCard(copyArr);
});

async function deleteFunc(id) {
  await axios.delete(`${BASE_URL}product/${id}`);
}
