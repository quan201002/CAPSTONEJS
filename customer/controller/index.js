import { ApiPath } from "../../constants/api_path.js";
import { renderProductList } from "../controller/controller.js";
import { showProgressDialog, popProgressDialog } from "../../utils/utils.js";

function fetchProducts() {
  showProgressDialog();
  axios({
    url: ApiPath.apiDomain.concat(ApiPath.productEndPoint),
    method: "GET",
  })
    .then(function (res) {
      renderProductList(res.data.reverse());
      popProgressDialog();
    })
    .catch(function (err) {
      console.log(err);
      popProgressDialog();
    });
}

// turnOffLoading();
fetchProducts();

function addProduct() {}
