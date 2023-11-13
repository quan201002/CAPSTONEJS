import * as cartController from "./controller.js";
import {
  getObjectByKey,
  saveObject,
} from "../../services/local_storage_services.js";
import { keyListCart } from "../../constants/constants.js";
import { CartItemModel } from "../model/cart_item_model.js";
import { messageAddToCart } from "../../constants/dictionary.js";
import { showReceipt, purchase } from "./controller.js";

var listCart = [];

init();

function init() {
  cartController.updateNumberOfCart();
  fetchCart();

  var openCartModalBtn = document.getElementById("open-cart-modal-btn");
  if (openCartModalBtn !== null) {
    openCartModalBtn.addEventListener("click", () => {
      showReceipt(listCart);
    });
  }

  var purchaseBtn = document.getElementById("purchase-btn");
  if (purchaseBtn !== null) {
    purchaseBtn.addEventListener("click", () => {
      purchase();
    });
  }
}

export function fetchCart() {
  let list = getObjectByKey(keyListCart) || [];

  listCart = list.map(
    (item) =>
      new CartItemModel({
        id: item.id,
        name: item.name,
        price: item.price,
        img: item.img,
        quantity: item.quantity,
      })
  );

  cartController.renderListCart(listCart.reverse());
}

export function deleteCartItem(productId) {
  listCart = listCart.filter((item) => item.id !== productId);
  saveObject(keyListCart, listCart);
  cartController.renderListCart(listCart);
  cartController.updateNumberOfCart();
}

export function increaseQuantityCartItem(productId) {
  for (let i = 0; i < listCart.length; i++) {
    if (listCart[i].id == productId) {
      listCart[i].quantity += 1;
      break;
    }
  }
  cartController.renderListCart(listCart);
}

export function decreaseQuantityCartItem(productId) {
  let index = 0;
  for (let i = 0; i < listCart.length; i++) {
    if (listCart[i].id == productId) {
      listCart[i].quantity -= 1;
      index = i;
      break;
    }
  }
  if (listCart[index].quantity == 0) {
    deleteCartItem(productId);
  } else {
    saveObject(keyListCart, listCart);
    cartController.renderListCart(listCart);
  }
}

export function addProductToCart(product) {
  let listCartLength = listCart.length;
  if (listCartLength == 0) {
    listCart.push(
      new CartItemModel({
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img,
        quantity: 1,
      })
    );
  } else {
    let isExist = false;
    for (let i = 0; i < listCartLength; i++) {
      if (listCart[i].id == product.id) {
        listCart[i].quantity += 1;
        isExist = true;
        break;
      }
    }

    if (!isExist) {
      listCart.push(
        new CartItemModel({
          id: product.id,
          name: product.name,
          price: product.price,
          img: product.img,
          quantity: 1,
        })
      );
    }
  }

  console.log(listCart);
  saveObject(keyListCart, listCart);
  cartController.updateNumberOfCart();

  setTimeout(() => {
    alert(`${messageAddToCart}: ${product.name}`);
  }, 500);
}
