const BASE_URL = "http://localhost:8080/";

let related = document.querySelector(".related-row");
let product = document.querySelector(".product-row");

let basket = JSON.parse(localStorage.getItem("basket")) ?? [];
let account = localStorage.getItem("account");

let id = new URLSearchParams(window.location.search).get("id");

function productDetails(data) {
  product.innerHTML = `
  <div class="col-6">
  <div class="img-magnifier-container">
    <img id="myimage" src="${data.image}" />
  </div>
</div>
<div class="col-6 information-col">
  <h1 class="name">${data.name}</h1>
  <h2 class="price">$${data.price}.00</h2>
  <div class="stars" style="--rating: ${data.rating}"></div>
  <p>${data.description}</p>
  <button onclick=basketFunc(${data.id})>Add to Cart</button>
  <p><span>Sku:</span>${data.sku}</p>
  <p><span>Category:</span>${data.category}</p>
  <p><span>Tags:</span>${data.tags}</p>
  <p>
    <span>Share:</span>
    <i class="fa-brands fa-facebook-f"></i>
    <i class="fa-brands fa-twitter"></i>
    <i class="fa-brands fa-instagram"></i>
    <i class="fa-brands fa-whatsapp"></i>
  </p>
  <div class="additional">
    <div class="details-link">
      <a href="#details"> ADDITIONAL INFORMATION</a>
    </div>
    <div class="details-content">
      <p><span>Weight:</span> ${data["additional information"].weight} kg</p>
      <p><span>Length:</span> ${data["additional information"].dimensions.length} cm</p>
      <p><span>Width:</span> ${data["additional information"].dimensions.width} cm</p>
      <p><span>Height:</span> ${data["additional information"].dimensions.height} cm</p>

    </div>
  </div>
</div>
  `;
}

function relatedProduct(arr) {
  related.innerHTML = "";
  arr.forEach((element) => {
    related.innerHTML += `
    <div class="col-3">
    <img src=${element.image} alt="" />
    <h2>${element.name}</h2>
    <h3>${element.price}$</h3>
  </div>
    `;
  });
}

async function getDataById() {
  let res = await axios(`${BASE_URL}product/${id}`);
  let data = res.data;
  console.log(data);
  productDetails(data);
}
getDataById();

async function getData() {
  let res = await axios(`${BASE_URL}product`);
  let data = res.data;
  relatedProduct(data.slice(0,4));
}
getData()

async function basketFunc(id) {
  if (account) {
    let res = await axios(`${BASE_URL}product/${id}`);
    if (basket.find((item) => item.product.id == id)) {
      let obj = basket.find((item) => item.product.id == id);
      obj.count += 1;
      console.log(basket);
      console.log(obj);
    } else {
      let obj = {
        count: 1,
        product: res.data,
      };
      basket.push(obj);
    }
    localStorage.setItem("basket", JSON.stringify(basket));
  } else {
    alert("Hesaba daxil ol");
  }
}

// Magnify
function magnify(imgID, zoom) {
  var img, glass, w, h, bw;
  img = document.getElementById(imgID);
  /*create magnifier glass:*/
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");
  /*insert magnifier glass:*/
  img.parentElement.insertBefore(glass, img);
  /*set background properties for the magnifier glass:*/
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize =
    img.width * zoom + "px " + img.height * zoom + "px";
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;
  /*execute a function when someone moves the magnifier glass over the image:*/
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);
  /*and also for touch screens:*/
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);
  function moveMagnifier(e) {
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image*/
    e.preventDefault();
    /*get the cursor's x and y positions:*/
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /*prevent the magnifier glass from being positioned outside the image:*/
    if (x > img.width - w / zoom) {
      x = img.width - w / zoom;
    }
    if (x < w / zoom) {
      x = w / zoom;
    }
    if (y > img.height - h / zoom) {
      y = img.height - h / zoom;
    }
    if (y < h / zoom) {
      y = h / zoom;
    }
    /*set the position of the magnifier glass:*/
    glass.style.left = x - w + "px";
    glass.style.top = y - h + "px";
    /*display what the magnifier glass "sees":*/
    glass.style.backgroundPosition =
      "-" + (x * zoom - w + bw) + "px -" + (y * zoom - h + bw) + "px";
  }
  function getCursorPos(e) {
    var a,
      x = 0,
      y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = img.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }
}

setTimeout(() => {
  magnify("myimage", 3);
}, 1000);
