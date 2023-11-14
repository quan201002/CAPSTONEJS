const maxTextLength = 50;

export function showProgressDialog() {
  document.getElementById("progressDialog").innerHTML = `
    <div
      class="modal fade"
      data-bs-backdrop='static'
      id="inProgressDialog"
      tabindex="-1"
      role="dialog"
      aria-labelledby="inProgressDialogLabel"
      data-backdrop="false"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-body text-center">
            <div id="spinner" class="mt-2">
              <div class="spinner-border text-warning" role="status">
              </div>
              <p class="mt-2">Loading...</p>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  $("#progressDialog").modal("show");
}

export function popProgressDialog() {
  $("#progressDialog").modal("hide");
}

export function formatPrice(price, shoudAddUnit = true) {
  let priceNum = price * 1.0;
  let unit = "";
  if (shoudAddUnit) {
    unit = "VND ";
  }
  if (isNaN(priceNum)) return unit.concat("---");
  return unit.concat(new Intl.NumberFormat("en-US").format(priceNum));
}

export function shortenText(text) {
  if (text == null) return "";
  if (text.length <= maxTextLength) {
    return text;
  }
  return text.substring(0, maxTextLength - 3).concat("...");
}
