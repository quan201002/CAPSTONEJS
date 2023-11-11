import { formatPrice } from "../../utils/utils.js";
import * as localStorageService from "../../services/local_storage_services.js";
import { keyListCart } from "../../constants/constants.js";
import {
  deleteCartItem,
  decreaseQuantityCartItem,
  increaseQuantityCartItem,
  fetchCart,
} from "./index.js";

export function purchase() {
  localStorageService.saveObject(keyListCart, []);
  fetchCart();
  updateNumberOfCart()
  $("#cartModal").modal('hide')
}

export function showReceipt(listCart) {
  console.log(`purchase list cart = ${listCart}`);
  let content = "";
  let total = 0;
  for (let i = 0; i < listCart.length; i++) {
    total += listCart[i].totalCost();
    content += `
    <div class="my-3 flex">
      <h6 class="w-1/4 flex">
        ${listCart[i].name}
      </h6>
      <h6 class="w-1/4 flex justify-center">
        ${listCart[i].quantity}
      </h6>
      <h6 class="w-1/4 flex justify-center">
        ${listCart[i].price}
      </h6>
      <h6 class="w-1/4 flex justify-center">
        ${listCart[i].totalCost()}
      </h6>
    </div>
    `;
  }

  content += `
    <div class="flex mt-3">
      <h5 class="flex w-3/4"> Tổng cộng
      </h5>
      <h6 class="flex w-1/4 justify-center"> ${total}
      </h6>
    </div>
  `;
  document.getElementById("receipt").innerHTML = content;
}

export function updateNumberOfCart() {
  let listCart = localStorageService.getObjectByKey(keyListCart);
  if (listCart !== null && listCart.length !== null) {
    document.getElementById(
      "cart-icon"
    ).innerHTML = `<span> (${listCart.length}) </span>`;
  }
}

export function renderListCart(listCart) {
  console.log("render list cart");
  let content = "";
  for (let i = 0; i < listCart.length; i++) {
    content += `
        <div
          class="product-item my-3 border border-sky-500 rounded-lg flex items-center"
        >
          <div class="w-2/5 flex">
            <!-- Image -->
            <div class="cart-img w-2/5 justify-center flex">
              <img
                src="${listCart[i].img}"
                alt=""
                class="px-3 py-3 w-fit rounded-lg flex justify-center items-center"
              />
            </div>

            <!-- Name-->
            <h4 class="text-lg flex items-center w-3/5 justify-start ml-3">
              ${listCart[i].name}
            </h4>
          </div>

          <div class="desc w-3/5">
            <div class="content flex">
              <!-- Price -->
              <h4 class="text-lg flex w-1/3 justify-center">${formatPrice(
                listCart[i].price
              )}</h4>
              <!-- Quantity -->
              <h4 class="text-lg flex w-1/3 justify-center">
                <span class="ml-1">
                  <button class="border rounded-lg py-1 px-2" id="dec-quantity-${i}">
                    <i class="fa fa-minus text-green-500"></i>
                  </button>
                  <span id="cart-item-${i}" class="mx-2">${
      listCart[i].quantity
    } </span>
                  <button class="border rounded-lg py-1 px-2" id="inc-quantity-${i}">
                    <i class="fa fa-plus text-green-500"></i>
                  </button>
                </span>
              </h4>
              <!-- Button delete -->
              <div class="w-1/3 justify-center flex">
                <button
                  class="border rounded-lg py-1 px-2 bg-red-500 text-white w-fit" id="delete-cart-${i}"
                >
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        `;
  }

  if (document.getElementById("cart-list") !== null) {
    document.getElementById("cart-list").innerHTML = content;

    for (let i = 0; i < listCart.length; i++) {
      var deleteItemFunc = () => {
        deleteCartItem(listCart[i].id);
      };

      var decQuantityFunc = () => {
        decreaseQuantityCartItem(listCart[i].id);
      };

      var incQuantityFunc = () => {
        increaseQuantityCartItem(listCart[i].id);
      };

      document
        .getElementById(`delete-cart-${i}`)
        .addEventListener("click", deleteItemFunc);

      document
        .getElementById(`dec-quantity-${i}`)
        .addEventListener("click", decQuantityFunc);

      document
        .getElementById(`inc-quantity-${i}`)
        .addEventListener("click", incQuantityFunc);
    }
  }
}
