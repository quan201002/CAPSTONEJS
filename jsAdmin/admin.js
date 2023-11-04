var selectedId = null;
var productArray = [];
var searchArray = JSON.parse(localStorage.getItem("searchArray"));
var value = JSON.parse(localStorage.getItem("searchValue"));
console.log(value);
getArray();
function renderProductList(productArr) {
  var content = "";
  for (var i = 0; i < productArr.length; i++) {
    var product = productArr[i];
    content += `
      <div class="card" style="width: 25rem; height: 49rem" id="${product.id}">
      <div class="card-header">
      <button  type="button"
      class="btn btn-primary ml-5 btn btn-success"
      data-toggle="modal"
      data-target="#exampleModal" onclick="sua(${product.id})">Sửa sản phẩm</button>
      <button class="btn btn-danger " onclick="xoa(${product.id})">xoá sản phẩm</button>
      </div>
      <div class="list-group-item" id="name">${product.name}</div>
      <div class="list-group-item" id="price">${product.price}</div>
      <div class="list-group-item" id="screen">${product.screen}</div>
      <div class="list-group-item" id="blackCamera">${product.backCamera}</div>
      <div class="list-group-item" id="frontCamera">${product.frontCamera}</div>
      <div class="list-group-item" id="img"><img src="${product.img}"></div>
      <div class="list-group-item" id="desc">${product.desc}</div>
      <div class="list-group-item" id="type">${product.type}</div>
    </div>
      `;
  }
  document.querySelector(".product-container").innerHTML = content;
}
var isSearch = JSON.stringify(localStorage.getItem("isSearch"));
console.log(isSearch);
if (isSearch) {
  var searchArray = JSON.parse(localStorage.getItem("searchArray"));
  renderProductList(searchArray);
} else {
  fetchProducts();
}

function fetchProducts() {
  turnOnLoading();
  axios({
    url: `https://6531230d4d4c2e3f333c7393.mockapi.io/product`,
    method: "GET",
  })
    .then(function (res) {
      renderProductList(res.data.reverse());
      turnOffLoading();
    })
    .catch(function (err) {
      console.log(err);
    });
}

function addProduct() {
  var product = getProduct();
  axios({
    url: `https://6531230d4d4c2e3f333c7393.mockapi.io/product`,
    method: "POST",
    data: product,
  })
    .then((res) => {
      fetchProducts();
      productArray.push(product);
      searchType();
    })
    .catch((err) => {
      console.log(err);
    });
}
function xoa(id) {
  turnOnLoading();
  axios({
    url: `https://6531230d4d4c2e3f333c7393.mockapi.io/product/${id}`,
    method: "DELETE",
  })
    .then((res) => {
      fetchProducts();
      var vitri = productArray.findIndex((item) => {
        return item.id == id;
      });
      productArray.splice(vitri, 1);
      console.log(isSearch);
      console.log(searchArray);
      if (isSearch) {
        renderProductList(searchArray);
      }
      // searchType();
      // getArray();
      // // renderProductList(productArray);
    })
    .catch((err) => {
      console.log("XOÁ THẤT BẠI", err);
    });
}

function sua(id) {
  selectedId = id;

  axios({
    url: `https://6531230d4d4c2e3f333c7393.mockapi.io/product/${id}`,
    method: "GET",
  })
    .then((res) => {
      getDataForm(res.data);
    })
    .catch((err) => {
      console.log("Can't get product");
    });
}

function update() {
  console.log(selectedId);
  turnOnLoading();
  var product = getProduct();
  console.log(product);
  axios({
    url: `https://6531230d4d4c2e3f333c7393.mockapi.io/product/${selectedId}`,
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
function getArray() {
  axios({
    url: `https://6531230d4d4c2e3f333c7393.mockapi.io/product`,
    method: "GET",
  })
    .then((res) => {
      for (var i = 0; i < res.data.length; i++) {
        productArray.push(res.data[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
searchType(value);
function searchType(value) {
  var isSearch = true;
  localStorage.setItem("isSearch", JSON.stringify(isSearch));
  var val = document.getElementById("select").value;
  localStorage.setItem("searchValue", JSON.stringify(val));
  if (val == "All") {
    fetchProducts();
    isSearch = false;
  } else {
    document.querySelector(".product-container").innerHTML = "";
    var result = [];
    productArray.map((item) => {
      if (item.type == value) {
        result.push(item);
      }
    });
    renderProductList(result);
    localStorage.setItem("searchArray", JSON.stringify(result));
  }
}
