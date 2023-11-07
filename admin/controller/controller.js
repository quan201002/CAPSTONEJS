export function renderProductList(productArr) {
    var content = "";
    for (var i = 0; i < productArr.length; i++) {
      var product = productArr[i];
      content += `
      <div class="product-item my-3 border border-sky-500 rounded-lg flex">
          <img src="${product.img}" alt="" class="px-3 py-3 w-1/4 flex rounded-lg">
          <div class="desc px-3 pt-3 w-3/4 ">
            <div class="content">
              <!-- Name with actions-->
              <div class="title-with-actions flex">
                <h3 class="mb-2 text-xl w-full flex">${product.name}</h3>
                <div class="product-action flex h-8 ml-2">
                  <button class="bg-red-200 rounded-lg px-2 text-red-600"><i class="fa fa-edit"></i></button>
                  <button class="bg-red-400 rounded-lg px-2 text-white ml-2" onclick="deleteProduct('${product.id}')"><i class="fa fa-trash"></i></button>
                </div>
              </div>
              
              <!-- Price -->
              <h4 class="text-lg">${product.price}</h4>
              <!-- Description -->
              <p class="text-sm text-gray-500 text-justify">${product.desc}</p>
              <!-- Specs -->
              <p class="text-sm text-gray-500">
                Type: <span class="border rounded-md px-2 py-1 bg-blue-400 text-white">${product.type}</span>
                <br>
                Screen: ${product.screen}
                <br>
                Back camera: ${product.backCamera}
                <br>
                Front camera: ${product.frontCamera}
              </p>
            </div>
          </div>
        </div>
        `;
    }
    document.getElementById("admin-products-display").innerHTML = content;
  }