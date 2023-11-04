function getProduct() {
  var id = document.getElementById("id").value;
  var price = document.getElementById("price").value;
  var name = document.getElementById("name").value;
  var backCamera = document.getElementById("backCamera").value;
  var frontCamera = document.getElementById("frontCamera").value;
  var img = document.getElementById("img").value;
  var desc = document.getElementById("desc").value;
  var type = document.getElementById("type").value;
  return {
    id: id,
    price: price,
    name: name,
    backCamera: backCamera,
    frontCamera: frontCamera,
    img: img,
    desc: desc,
    type: type,
  };
}
function getDataForm(product) {
  document.getElementById("id").value = product.id;
  document.getElementById("price").value = product.price;
  document.getElementById("name").value = product.name;
  document.getElementById("backCamera").value = product.backCamera;
  document.getElementById("frontCamera").value = product.frontCamera;
  document.getElementById("img").value = product.img;
  document.getElementById("desc").value = product.desc;
  document.getElementById("type").value = product.type;
}
turnOffLoading();
function turnOnLoading() {
  document.getElementById("spinner").style.display = "flex";
}
function turnOffLoading() {
  document.getElementById("spinner").style.display = "none";
}
