let gioHang = [];
if (JSON.parse(localStorage.getItem("gioHang"))) {
  gioHang = JSON.parse(localStorage.getItem("gioHang"));
}
renderGiohang();
function renderProductList(productArr) {
  var content = "";
  for (var i = 0; i < productArr.length; i++) {
    var product = productArr[i];
    content += `
      <div class="card" style="width: 18rem" id="${product.id}">
      <div class="card-header text-center">
      <button class="btn btn-success add" onclick="themvaoGiohang(${product.id})">+</button>
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
function themvaoGiohang(id) {
  axios({
    url: `https://6531230d4d4c2e3f333c7393.mockapi.io/product/${id}`,
    method: "GET",
  })
    .then((res) => {
      var vitri = gioHang.findIndex((item) => {
        return item.id == id;
      });
      console.log(vitri);

      if (vitri != -1) {
        gioHang[vitri].quantity += 1 * 1;
      } else {
        var pro = res.data;
        pro.quantity = 1;
        gioHang.push(pro);
        console.log(gioHang);
      }
      localStorage.setItem("gioHang", JSON.stringify(gioHang));
      renderGiohang();
    })
    .catch((err) => {
      console.log(err);
    });
}
function renderGiohang() {
  let gio = JSON.parse(localStorage.getItem("gioHang"));
  var content = "";
  for (var i = 0; i < gio.length; i++) {
    var product = gio[i];
    content += `
    <div class="card" style="width: 18rem" id="${product.id}">
      <div class="card-header text-center">
          <p class="soluong">Số lượng:${product.quantity}</p>
          <div class="modify">
          <button class="btn btn-success" onclick="tang(${product.id})">+</button>
          <button class="btn btn-danger" onclick="giam(${product.id})">-</button>
          <button class="btn btn-warning" onclick="removeProduct(${product.id})">Remove</button>
      </div>
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
  content += `<div class="giohang-btns">
    <button class="btn btn-success thanhtoan" onclick="thanhToan()">Thanh toán</button>
    <p class="tongTien">Tổng tiền: ${tongTien()} vnđ</p>
  </div>`;
  document.querySelector(".gio-hang").innerHTML = content;
  tongTien();
  function tongTien() {
    var tong = 0;
    gio.map((pro) => {
      tong += pro.price * 1 * pro.quantity;
    });
    return tong;
  }
}
function thanhToan() {
  localStorage.setItem("gioHang", JSON.stringify([]));
  gioHang = [];
  renderGiohang();
}
function tang(id) {
  var gio = JSON.parse(localStorage.getItem("gioHang"));
  var vitri = gio.findIndex((item) => {
    return item.id == id;
  });
  gio[vitri].quantity += 1;
  localStorage.setItem("gioHang", JSON.stringify(gio));
  renderGiohang();
}
function removeProduct(id) {
  var gio = JSON.parse(localStorage.getItem("gioHang"));
  var vitri = gio.findIndex((item) => {
    return item.id == id;
  });
  gio.splice(vitri, vitri + 1);
  gio[vitri] == [];
  console.log(gio);
  localStorage.setItem("gioHang", JSON.stringify(gio));
  renderGiohang();
}
function giam(id) {
  var gio = JSON.parse(localStorage.getItem("gioHang"));
  var vitri = gio.findIndex((item) => {
    return item.id == id;
  });
  if (gio[vitri].quantity == 1) {
    removeProduct(id);
    localStorage.setItem("gioHang", JSON.stringify(gio));
  } else {
    gio[vitri].quantity -= 1;
    localStorage.setItem("gioHang", JSON.stringify(gio));
    renderGiohang();
  }
}
