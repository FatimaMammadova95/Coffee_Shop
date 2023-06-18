const BASE_URL = "http://localhost:8080/";

const tBody = document.querySelector("tbody");
const searchInput = document.querySelector("#simple-search");

let id = localStorage.getItem("admin")

if(!id){
  document.body.innerHTML=''
}

let dataArr = [];
let copyArr = [];
let sortedArr = [];

function createCard(arr) {
  tBody.innerHTML = "";
  arr.forEach((element, index) => {
    tBody.innerHTML += `
<tr>
<td>${index+1}</td>
<td>${element.numberOfCustomer}</td>
<td class="description">${element.selectTime}</td>
</tr>`;
  });
}

async function getData() {
  let res = await axios(`${BASE_URL}reservation`);
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
