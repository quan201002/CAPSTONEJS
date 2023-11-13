import { ApiPath } from "../../constants/api_path.js";
import * as customerController from "../controller/controller.js";
import { showProgressDialog, popProgressDialog } from "../../utils/utils.js";
import { updateNumberOfCart } from "../../cart/controller/controller.js";
import { ProductModel } from "../model/product_model.js";

var listProduct = [];
init();

function init() {
  fetchProducts();
  updateNumberOfCart();

  var filterType = document.getElementById("filter-type");
  if (filterType !== null) {
    filterType.addEventListener("change", () => {
      customerController.filterProductByType(listProduct);
    });
  }
}

function fetchProducts() {
  showProgressDialog();
  axios({
    url: ApiPath.apiDomain.concat(ApiPath.productEndPoint),
    method: "GET",
  })
    .then(function (res) {
      console.log(res.data)
      if (res.data !== null) {
        listProduct = res.data.map(
          (item) =>
            new ProductModel({
              id: item.id,
              name: item.name,
              price: item.price,
              img: item.img,
              desc: item.desc,
              screen: item.screen,
              type: item.type,
              frontCamera: item.frontCamera,
              backCamera: item.backCamera,
            })
        );
        customerController.renderProductList(listProduct);
      }

      popProgressDialog();
    })
    .catch(function (err) {
      console.log(err);
      popProgressDialog();
    });
}
