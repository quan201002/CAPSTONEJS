import * as validate from "./validate.js";
import * as utils from "../../utils/utils.js";
import {
  getProduct,
  getDataForm,
} from "../../customer/controller/controller.js";
import * as adminController from "./controller.js";
import { ApiPath } from "../../constants/api_path.js";

var selectedId = null;
var productArray = [];
var searchArray = [];
var isSearch = false;

init();

function init() {
  document
    .getElementById("add-product-btn")
    .addEventListener("click", addCommand);

  fetchProducts();
}

function fetchProducts() {
  utils.showProgressDialog();
  axios({
    url: ApiPath.apiDomain.concat(ApiPath.productEndPoint),
    method: "GET",
  })
    .then(function (res) {
      productArray = [];
      for (var i = 0; i < res.data.length; i++) {
        productArray.push(res.data[i]);
      }
      adminController.renderProductList(res.data.reverse());
      utils.popProgressDialog();
    })
    .catch(function (err) {
      console.log(err);
      utils.popProgressDialog();
    });
}

function addProduct() {
  let product = getProduct();

  var isValid =
    validate.validateId(product.id, productArray) &&
    validate.validatePrice(product.price) &&
    validate.validateType(product.type) &&
    validate.validateImg(product.img) &&
    validate.validateDesc(product.desc) &&
    validate.validateBackCamera(product.backCamera) &&
    validate.validateFrontCamera(product.frontCamera) &&
    validate.validateName(product.name);
  if (isValid) {
    utils.showProgressDialog();
    axios({
      url: ApiPath.apiDomain.concat(ApiPath.productEndPoint),
      method: "POST",
      data: product,
    })
      .then((res) => {
        fetchProducts();
        searchType();
      })
      .catch((err) => {
        utils.popProgressDialog();
        console.log(err);
      });
  }
}

export function deleteProduct(id) {
  utils.showProgressDialog();
  if (isSearch) {
    axios({
      url: ApiPath.apiDomain.concat(ApiPath.productEndPoint).concat(`/${id}`),
      method: "DELETE",
    })
      .then((res) => {
        var vitri = searchArray.findIndex((item) => {
          return item.id == id;
        });
        searchArray.splice(vitri, 1);
        console.log(isSearch);
        console.log(searchArray);
        renderProductList(searchArray);
        // turnOffLoading();
        // searchType();
        // getArray();
        // // renderProductList(productArray);
      })
      .catch((err) => {
        console.log("XOÁ THẤT BẠI", err);
      });
  } else {
    axios({
      url: ApiPath.apiDomain.concat(ApiPath.productEndPoint).concat(`/${id}`),
      method: "DELETE",
    })
      .then((res) => {
        fetchProducts();
      })
      .catch((err) => {
        console.log("XOÁ THẤT BẠI", err);
      });
  }
}

export function addCommand() {
  document.getElementById("addBtn").style.display = "inline-block";
  document.getElementById("updateBtn").style.display = "none";

  $("#productModal").modal("show");
}

export function sua(id) {
  document.getElementById("updateBtn").style.display = "inline-block";
  document.getElementById("addBtn").style.display = "none";
  selectedId = id;

  axios({
    url: ApiPath.apiDomain.concat(ApiPath.productEndPoint).concat(`/${id}`),
    method: "GET",
  })
    .then((res) => {
      $("#productModal").modal("show");
      getDataForm(res.data);
    })
    .catch((err) => {
      console.log("Can't get product");
    });
}

function update() {
  console.log(selectedId);
  // turnOnLoading();
  if (isSearch) {
    var product = getProduct();
    console.log(product);
    axios({
      url: ApiPath.apiDomain
        .concat(ApiPath.productEndPoint)
        .concat(`/${selectedId}`),
      method: "PUT",
      data: product,
    })
      .then((res) => {
        var vitri = searchArray.findIndex((item) => {
          return item.id == selectedId;
        });
        searchArray[vitri] = product;
        renderProductList(searchArray);
        // turnOffLoading();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    var product = getProduct();
    console.log(product);
    axios({
      url: ApiPath.apiDomain
        .concat(ApiPath.productEndPoint)
        .concat(`/${selectedId}`),
      method: "PUT",
      data: product,
    })
      .then((res) => {
        fetchProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// searchType(value);
function searchType() {
  var value = document.getElementById("select").value;
  console.log("value:", value);
  isSearch = true;
  searchArray = [];
  if (value == "All") {
    axios({
      url: ApiPath.apiDomain.concat(ApiPath.productEndPoint),
      method: "GET",
    })
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          searchArray.push(res.data[i]);
        }
        renderProductList(searchArray);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("searchArray:", searchArray);
  } else {
    document.getElementById("admin-products-display").innerHTML = "";
    console.log(value);
    axios({
      url: ApiPath.apiDomain.concat(ApiPath.productEndPoint),
      method: "GET",
    })
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          console.log(res.data[i].type);
          if (res.data[i].type == value) {
            searchArray.push(res.data[i]);
          }
        }
        console.log(searchArray);
        renderProductList(searchArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

function resetForm() {
  document.getElementById("form").reset();
}
