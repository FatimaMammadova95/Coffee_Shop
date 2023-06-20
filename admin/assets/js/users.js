const BASE_URL = "http://localhost:8080/";

const tBody = document.querySelector("tbody");
const searchInput = document.querySelector("#simple-search");
let load = document.querySelector("#load");
load.style.display = "none";

let dataArr = [];
let copyArr = [];
let sortedArr = [];



function createCard(arr) {
  tBody.innerHTML = "";
  arr.forEach((element, index) => {
    tBody.innerHTML += `
<tr>
<td>${index+1}</td>
<td>${element.username}</td>
<td class="description">${element.email}</td>
<td>${element.password}</td>
</tr>`;
  });
}

async function getData() {
  load.style.display = "block";
  try {
    let res = await axios(`${BASE_URL}users`);
    dataArr = res.data;
    copyArr = searchInput.value || copyArr.length ? copyArr : res.data;
    load.style.display = "none";

    createCard(copyArr);
  } catch (error) {
    console.log(error);
  }
}
getData();

searchInput.addEventListener("input", function (e) {
  copyArr = sortedArr.length ? sortedArr : dataArr;
  copyArr = copyArr.filter((item) =>
    item.username.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
  );
  createCard(copyArr);
});
