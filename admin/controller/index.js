import * as validate from "./validate.js";
import * as utils from "../../utils/utils.js";
import * as adminController from "./controller.js";
import { ApiPath } from "../../constants/api_path.js";
import * as dictionary from "../../constants/dictionary.js"

var selectedId = null;
var productArray = [];

init();

function init() {
  fetchProducts();

  addProductEvent();
  addSearchEvent();
  addProductModalEvent();
  addSortByPriceEvent();
  updateProductModalEvent();
  resetFormModalEvent();
}

function resetFormModalEvent() {
  var resetFormModalElement = document.getElementById("resetBtn");
  if (resetFormModalElement !== null) {
    resetFormModalElement.addEventListener("click", resetForm);
  }
}

function updateProductModalEvent() {
  var updateProductModalElement = document.getElementById("updateBtn");
  if (updateProductModalElement !== null) {
    updateProductModalElement.addEventListener("click", update);
  }
}

function addSortByPriceEvent() {
  var sortByPriceElement = document.getElementById("sort-price-type");
  if (sortByPriceElement !== null) {
    sortByPriceElement.addEventListener("change", () => {
      adminController.filterListProduct(productArray);
    });
  }
}

function addProductModalEvent() {
  var addProductModalElement = document.getElementById("addBtn");
  if (addProductModalElement !== null) {
    addProductModalElement.addEventListener("click", addProduct);
  }
}

function addProductEvent() {
  var addProductElement = document.getElementById("add-product-btn");
  if (addProductElement !== null) {
    addProductElement.addEventListener("click", addCommand);
  }
}

function addSearchEvent() {
  var searchBtnElement = document.getElementById("search-product-btn");
  if (searchBtnElement !== null) {
    searchBtnElement.addEventListener("click", () => {
      adminController.filterListProduct(productArray);
    });
  }
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
      adminController.renderProductList(
        adminController.getListProductFiltered(res.data.reverse())
      );
      utils.popProgressDialog();
    })
    .catch(function (err) {
      console.log(err);
      utils.popProgressDialog();
    });
}

function getProduct() {
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

export function addProduct() {
  console.log(productArray);
  utils.showProgressDialog();
  var product = getProduct();
  console.log(product);
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
        $("#productModal").modal("hide");
      })
      .catch((err) => {
        utils.popProgressDialog();
        console.log(err);
      });
  }
}

export function deleteProduct(id) {
  utils.showProgressDialog();
  axios({
    url: ApiPath.apiDomain.concat(ApiPath.productEndPoint).concat(`/${id}`),
    method: "DELETE",
  })
    .then((res) => {
      fetchProducts()
    })
    .catch((err) => {
      console.log(err);
      alert(dictionary.errorDeleteFailed)
    });
}

export function addCommand() {
  document.getElementById("addBtn").style.display = "inline-block";
  document.getElementById("updateBtn").style.display = "none";
  document.getElementById("id").disabled = false;
  resetForm();
  $("#productModal").modal("show");
}

export function showUpdateModal(id) {
  document.getElementById("updateBtn").style.display = "inline-block";
  document.getElementById("addBtn").style.display = "none";
  document.getElementById("id").disabled = true;
  selectedId = id;

  axios({
    url: ApiPath.apiDomain.concat(ApiPath.productEndPoint).concat(`/${id}`),
    method: "GET",
  })
    .then((res) => {
      $("#productModal").modal("show");
      adminController.getDataForm(res.data);
    })
    .catch((err) => {
      console.log(err);
      alert(dictionary.errorGetProductFailed)
    });
}

export function update() {
  var product = getProduct();
  var isValid =
    validate.validatePrice(product.price) &&
    validate.validateType(product.type) &&
    validate.validateImg(product.img) &&
    validate.validateDesc(product.desc) &&
    validate.validateBackCamera(product.backCamera) &&
    validate.validateFrontCamera(product.frontCamera) &&
    validate.validateName(product.name);
  console.log(selectedId);

  if (isValid) {
    axios({
      url: ApiPath.apiDomain
        .concat(ApiPath.productEndPoint)
        .concat(`/${selectedId}`),
      method: "PUT",
      data: product,
    })
      .then((res) => {
        fetchProducts();
        $("#productModal").modal("hide");
      })
      .catch((err) => {
        console.log(err);
        alert(dictionary.errorUpdateProductFailed)
      });
  }
}

export function resetForm() {
  document.getElementById("form").reset();
}
