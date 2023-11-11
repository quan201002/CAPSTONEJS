import { ApiPath } from "../../constants/api_path.js";
import * as customerController from "../controller/controller.js";
import { showProgressDialog, popProgressDialog } from "../../utils/utils.js";
import { updateNumberOfCart } from "../../cart/controller/controller.js";

init();

function init() {
  fetchProducts();
  updateNumberOfCart();
}

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
