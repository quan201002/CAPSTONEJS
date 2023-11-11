import * as utils from "../../utils/utils.js";
import * as cartController from "./controller.js";
import { ApiPath } from "../../constants/api_path.js";
import { getObjectByKey } from "../../services/local_storage_services.js";
import { keyListCart } from "../../constants/constants.js";

var listCart = [];

fetchCart();

/**
 * Temporarily get from products
 */
function fetchCart() {
  //   utils.showProgressDialog()
  // axios({
  //   url: ApiPath.apiDomain.concat(ApiPath.productEndPoint),
  //   method: "GET",
  // })
  //   .then(function (res) {
  //     listCart = [];
  //     for (var i = 0; i < res.data.length; i++) {
  //       listCart.push(res.data[i]);
  //     }
  //     cartController.renderListCart(res.data.reverse());
  //   //   utils.popProgressDialog()
  //   })
  //   .catch(function (err) {
  //     console.log(err);
  //   //   utils.popProgressDialog()
  //   });
  listCart = getObjectByKey(keyListCart);
  cartController.renderListCart(listCart.reverse());
}
