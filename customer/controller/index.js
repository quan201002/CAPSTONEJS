import { ApiPath } from "../../constants/api_path.js";
import * as customerController from "../controller/controller.js";
import { showProgressDialog, popProgressDialog } from "../../utils/utils.js";
import { updateNumberOfCart } from "../../cart/controller/controller.js";
import { keyListCart } from "../../constants/constants.js";
import {
  getObjectByKey,
  saveObject,
} from "../../services/local_storage_services.js";
// import * as localStorageServices from "../../services/local_storage_services.js";

var listCart = [];

function fetchProducts() {
  showProgressDialog();
  axios({
    url: ApiPath.apiDomain.concat(ApiPath.productEndPoint),
    method: "GET",
  })
    .then(function (res) {
      customerController.renderProductList(res.data.reverse());
      popProgressDialog();
    })
    .catch(function (err) {
      console.log(err);
      popProgressDialog();
    });
}

export function addProductToCart(product) {
  listCart.push(product);
  saveObject(keyListCart, listCart);
  updateNumberOfCart();
}

function initListCart() {
  listCart = getObjectByKey(keyListCart) || [];
}

function init() {
  initListCart();
  fetchProducts();
  updateNumberOfCart();
}

init();
