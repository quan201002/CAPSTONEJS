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