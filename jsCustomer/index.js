function renderProductList(productArr) {
  var content = "";
  for (var i = 0; i < productArr.length; i++) {
    var product = productArr[i];
    content += `
      <div class="card" style="width: 18rem" id="${product.id}">
      <div class="card-header text-center">
      <button class="btn btn-success">+</button>
          <span>Product</span>
      </div>
      <div class="list-group-item" id="name">${product.name}</div>
      <div class="list-group-item" id="price">${product.price}</div>
      <div class="list-group-item" id="screen">${product.screen}</div>
      <div class="list-group-item" id="backCamera">${product.backCamera}</div>
      <div class="list-group-item" id="frontCamera">${product.frontCamera}</div>
      <div class="list-group-item" id="img"><img src="${product.img}"></div>
      <div class="list-group-item" id="desc">${product.desc}</div>
      <div class="list-group-item" id="type">${product.type}</div>
    </div>
      `;
  }
  document.querySelector(".product-container").innerHTML = content;
}
function fetchProducts() {
  axios({
    url: `https://6531230d4d4c2e3f333c7393.mockapi.io/product`,
    method: "GET",
  })
    .then(function (res) {
      renderProductList(res.data.reverse());
    })
    .catch(function (err) {
      console.log(err);
    });
}
fetchProducts();
function addProduct(){
  
}
