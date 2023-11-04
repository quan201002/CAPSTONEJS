var selectedId = null;
var productArray = [];
document.getElementById("addBtn").style.display = "inline-block";
// var searchArray = JSON.parse(localStorage.getItem("searchArray"));
// var value = JSON.parse(localStorage.getItem("searchValue"));
// console.log(value);
// getArray();
var searchArray = [];
fetchProducts();
var isSearch = false;
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
// var isSearch = JSON.stringify(localStorage.getItem("isSearch"));
// console.log(isSearch);
// if (isSearch) {
//   var searchArray = JSON.parse(localStorage.getItem("searchArray"));
//   renderProductList(searchArray);
// } else {
//   fetchProducts();
// }

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
  if (isSearch) {
    axios({
      url: `https://6531230d4d4c2e3f333c7393.mockapi.io/product/${id}`,
      method: "DELETE",
    })
      .then((res) => {
        var vitri = searchArray.findIndex((item) => {
          return item.id == id;
        });
        searchArray.splice(vitri, 1);
        console.log(isSearch);
        console.log(searchArray);
        renderProductList(searchArray);
        turnOffLoading();
        // searchType();
        // getArray();
        // // renderProductList(productArray);
      })
      .catch((err) => {
        console.log("XOÁ THẤT BẠI", err);
      });
  } else {
    axios({
      url: `https://6531230d4d4c2e3f333c7393.mockapi.io/product/${id}`,
      method: "DELETE",
    })
      .then((res) => {
        fetchProducts();
      })
      .catch((err) => {
        console.log("XOÁ THẤT BẠI", err);
      });
  }
}
function addCommand() {
  document.getElementById("addBtn").style.display = "inline-block";
  document.getElementById("updateBtn").style.display = "none";
}
function sua(id) {
  document.getElementById("updateBtn").style.display = "inline-block";
  document.getElementById("addBtn").style.display = "none";
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
  if (isSearch) {
    var product = getProduct();
    console.log(product);
    axios({
      url: `https://6531230d4d4c2e3f333c7393.mockapi.io/product/${selectedId}`,
      method: "PUT",
      data: product,
    })
      .then((res) => {
        var vitri = searchArray.findIndex((item) => {
          return item.id == selectedId;
        });
        searchArray[vitri] = product;
        renderProductList(searchArray);
        turnOffLoading();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
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
}

// searchType(value);
function searchType() {
  // var isSearch = true;
  // localStorage.setItem("isSearch", JSON.stringify(isSearch));
  // var val = document.getElementById("select").value;
  // localStorage.setItem("searchValue", JSON.stringify(val));
  var value = document.getElementById("select").value;
  console.log("value:", value);
  isSearch = true;
  searchArray = [];
  if (value == "All") {
    // fetchProducts();
    // isSearch = false;

    axios({
      url: `https://6531230d4d4c2e3f333c7393.mockapi.io/product`,
      method: "GET",
    })
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          searchArray.push(res.data[i]);
        }
        renderProductList(searchArray);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("searchArray:", searchArray);
  } else {
    document.querySelector(".product-container").innerHTML = "";
    console.log(value);
    // productArray.map((item) => {
    //   if (item.type == value) {
    //     result.push(item);
    //   }
    // });
    // renderProductList(result);
    // localStorage.setItem("searchArray", JSON.stringify(result));
    axios({
      url: `https://6531230d4d4c2e3f333c7393.mockapi.io/product`,
      method: "GET",
    })
      .then((res) => {
        for (var i = 0; i < res.data.length; i++) {
          console.log(res.data[i].type);
          if (res.data[i].type == value) {
            searchArray.push(res.data[i]);
          }
        }
        console.log(searchArray);
        renderProductList(searchArray);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
function resetForm() {
  document.getElementById("form").reset();
}
