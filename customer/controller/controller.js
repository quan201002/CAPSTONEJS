import { formatPrice } from "../../utils/utils.js";
import { addProductToCart } from "./index.js";

export function getProduct() {
  var id = document.getElementById("id").value;
  var price = document.getElementById("price").value;
  var name = document.getElementById("name").value;
  var backCamera = document.getElementById("backCamera").value;
  var frontCamera = document.getElementById("frontCamera").value;
  var img = document.getElementById("img").value;
  var desc = document.getElementById("desc").value;
  var type = document.getElementById("type").value;
  return {
    id: id,
    price: price,
    name: name,
    backCamera: backCamera,
    frontCamera: frontCamera,
    img: img,
    desc: desc,
    type: type,
  };
}

export function getDataForm(product) {
  document.getElementById("id").value = product.id;
  document.getElementById("price").value = product.price;
  document.getElementById("name").value = product.name;
  document.getElementById("backCamera").value = product.backCamera;
  document.getElementById("frontCamera").value = product.frontCamera;
  document.getElementById("img").value = product.img;
  document.getElementById("desc").value = product.desc;
  document.getElementById("type").value = product.type;
}

export function buyNow() {
  console.log("buy now called");
}

export function renderProductList(productArr) {
  console.log(productArr);
  var content = "";
  for (let i = 0; i < productArr.length; i++) {
    var product = productArr[i];
    content += `
    <div class="product-item mx-3 my-3 border border-sky-500 rounded-lg">
          <div class="w-full flex justify-center py-3">
            <img src="${product.img}" alt="" class="w-fit">
          </div>
          
          <div class="desc px-3 pb-3 ">
            <div class="content">
              <h3 class="my-2 text-xl">${product.name}</h3>
              <p class="text-sm text-gray-500 text-justify">${product.desc}</p>
              <h4 class="text-lg">${formatPrice(product.price)}</h4>

              <div class="grid grid-cols-2">
                <button id="add-cart-prod-${i}" class="bg-red-200 rounded-lg mr-3 py-2 text-red-600">Add to cart</button>
                <button onclick="buyNow()" class="bg-red-400 rounded-lg ml-3 py-2 text-white">Buy now</button>
              </div>
            </div>
          </div>
        </div>
    `;
  }

  content = `<div class="grid grid-cols-3">`.concat(content).concat(`</div>`);

  document.getElementById("customer-products-display").innerHTML = content;

  for (let i = 0; i < productArr.length; i++) {
    var func = () => {
      addProductToCart(productArr[i]);
    };

    document
      .getElementById(`add-cart-prod-${i}`)
      .addEventListener("click", func);
  }
}
