export function renderListCart(listCart) {
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
              <h4 class="text-lg flex w-1/3 justify-center">${listCart[i].price}</h4>
              <!-- Quantity -->
              <h4 class="text-lg flex w-1/3 justify-center">
                <span class="ml-1">
                  <button class="border rounded-lg py-1 px-2">
                    <i class="fa fa-minus text-green-500"></i>
                  </button>
                  <span id="cart-item-${i}" class="mx-2">${listCart[i].quantity}</span>
                  <button class="border rounded-lg py-1 px-2">
                    <i class="fa fa-plus text-green-500"></i>
                  </button>
                </span>
              </h4>
              <!-- Button delete -->
              <div class="w-1/3 justify-center flex">
                <button
                  class="border rounded-lg py-1 px-2 bg-red-500 text-white w-fit"
                >
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        `;
  }
  document.getElementById("cart-list").innerHTML = content;
}
