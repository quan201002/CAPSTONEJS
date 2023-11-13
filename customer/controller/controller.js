import { formatPrice, shortenText } from "../../utils/utils.js";
import { addProductToCart } from "../../cart/controller/index.js";
import { typeAll } from "../../constants/constants.js";

export function renderProductList(productArr) {
  console.log(productArr);
  var content = "";
  for (let i = 0; i < productArr.length; i++) {
    var product = productArr[i];
    content += `
    <div class="product-item mx-3 my-3 border border-sky-500 rounded-lg">
          <div class="w-full flex justify-center py-3" id="product-item-${i}" data-bs-toggle="modal" data-bs-target="#product-details-modal">
            <img src="${product.img}" alt="" class="w-fit">
          </div>
          
          <div class="desc px-3 pb-3 ">
            <div class="content">
              <div id="product-info-${i}" data-bs-toggle="modal" data-bs-target="#product-details-modal">
                <h3 class="my-2 text-xl">${product.name}</h3>
                <p class="text-sm text-gray-500 text-justify">${shortenText(
                  product.desc
                )}</p>
              </div>
              

              <div class="mt-2 flex">
                <h4 class="text-lg w-3/4 flex">${formatPrice(
                  product.price
                )}</h4>
                <div class="w-1/4 flex justify-end">
                  <button id="add-cart-prod-${i}" class="bg-red-400 rounded-lg text-white w-fit px-3">Buy</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    `;
  }

  content = `<div class="grid grid-cols-3">`.concat(content).concat(`</div>`);

  document.getElementById("customer-products-display").innerHTML = content;

  for (let i = 0; i < productArr.length; i++) {
    /// add event view product details
    var showProductDetailsFunc = () => {
      displayProductDetails(productArr[i]);
    };
    document
      .getElementById(`product-item-${i}`)
      .addEventListener("click", showProductDetailsFunc);

    document
      .getElementById(`product-info-${i}`)
      .addEventListener("click", showProductDetailsFunc);

    /// add event add product to cart
    var addProductFunc = () => {
      addProductToCart(productArr[i]);
    };
    document
      .getElementById(`add-cart-prod-${i}`)
      .addEventListener("click", addProductFunc);
  }
}

function displayProductDetails(product) {
  $("#product-details-modal").modal("show");
  console.log("displayProductDetails called");
  let content = `
    <div class="w-full flex justify-center py-3">
      <img src="${product.img}" alt="" class="w-fit">
    </div>

    <div class="desc px-3 pb-3 ">
      <div class="content">
        <h3 class="my-2 text-xl font-bold">${product.name}</h3>
        <p class="text-lg font-bold text-justify">${formatPrice(
          product.price
        )}</p>
        <p class="text-sm text-gray-500 text-justify">${product.desc}</p>
        <p class="text-sm text-gray-500 text-justify">Screen: ${
          product.screen
        }</p>
        <p class="text-sm text-gray-500 text-justify">Front camera: ${
          product.frontCamera
        }</p>
        <p class="text-sm text-gray-500 text-justify">Back camera: ${
          product.backCamera
        }</p>
        <p class="text-sm text-gray-500 text-justify">Type: <span class="border rounded-lg px-2 py-1 bg-blue-500 text-white">${
          product.type
        }</span></p>
      </div>
    </div>
  `;

  var productDetailsElement = document.getElementById("product-details-body");
  if (productDetailsElement !== null) {
    productDetailsElement.innerHTML = content;
  }
}

export function getProductByType({ listProduct = [], type }) {
  if (listProduct.length == 0) return [];
  return listProduct.filter((value, index) => {
    return value.type == type;
  });
}

export function filterProductByType(listProduct) {
  let type = document.getElementById("filter-type").value;
  if (type == typeAll) {
    renderProductList(listProduct);
  } else {
    let filteredProductType = getProductByType({
      listProduct: listProduct,
      type: type,
    });
    renderProductList(filteredProductType);
  }
}
