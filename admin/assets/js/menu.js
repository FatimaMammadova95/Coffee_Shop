const BASE_URL = "http://localhost:8080/";

let id = localStorage.getItem("admin")

if(!id){
  document.body.innerHTML=''
}

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
<td>${index+1}</td>
<td><img src=${element.image} width="70px"></td>
<td>${element.name}</td>
<td class="description">${element.description}</td>
<td>${element.price}</td>
<td>${element.ingredient}</td>
<td class="process">
<a href="#" onclick=deleteFunc(${element.id})><i class="fa-solid fa-trash"></i></a>
<a href="menuForm.html?id=${element.id}"><i class="fa-solid fa-pen"></i></a>
</td>
</tr>`;
  });
}

async function getData() {
  let res = await axios(`${BASE_URL}menu`);
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
  await axios.delete(`${BASE_URL}menu/${id}`);
}
