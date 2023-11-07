import * as dict from "../../constants/dictionary.js";

function validateDesc(desc) {
  if (desc.trim() == "") {
    document.getElementById("spanDesc").innerText = dict.notEmptyDesc;
    return false;
  } else {
    document.getElementById("spanDesc").innerText = "";
    return true;
  }
}

function validateName(name) {
  if (name.trim() == "") {
    document.getElementById("spanName").innerText = dict.notEmptyName;
    return false;
  } else {
    document.getElementById("spanName").innerText = "";
    return true;
  }
}

function validateFrontCamera(frontCamera) {
  if (frontCamera.trim() == "") {
    document.getElementById("spanfrontCamera").innerText =
      dict.notEmptyFrontCam;
    return false;
  } else {
    document.getElementById("spanfrontCamera").innerText = "";
    return true;
  }
}

function validateBackCamera(backCamera) {
  if (backCamera.trim() == "") {
    document.getElementById("spanbackCamera").innerText = dict.notEmptyBackCam;
    return false;
  } else {
    document.getElementById("spanbackCamera").innerText = "";
    return true;
  }
}

function validateImg(img) {
  var res = /^(ftp|http|https):\/\/[^ "]+$/;
  var isValid = res.test(img);
  if (img.trim() == "") {
    document.getElementById("spanImage").innerText = dict.notEmptyImage;
    return false;
  } else if (!isValid) {
    document.getElementById("spanImage").innerText = dict.invalidImage;
    return false;
  } else {
    document.getElementById("spanImage").innerText = "";
    return true;
  }
}

function validateType(type) {
  if (type.trim() == "") {
    document.getElementById("spanType").innerText = dict.notEmptyType;
    return false;
  } else if (type != "Samsung" && type != "Iphone") {
    document.getElementById("spanType").innerText = dict.invalidTypeValue;
    return false;
  } else {
    document.getElementById("spanType").innerText = "";
    return true;
  }
}

function validatePrice(price) {
  if (price.trim() == "") {
    document.getElementById("spanPrice").innerText = dict.notEmptyPrice;
    return false;
  } else if (isNaN(price)) {
    document.getElementById("spanPrice").innerText = dict.invalidPrice;
    return false;
  } else {
    document.getElementById("spanPrice").innerText = "";
    return true;
  }
}

function validateId(id) {
  var isErr = false;
  for (var i = 0; i < productArray.length; i++) {
    if (productArray[i].id == id) {
      isErr = true;
    }
  }
  if (id.trim() == "") {
    document.getElementById("spanId").innerText = dict.notEmptyId;
    return false;
  } else if (isErr) {
    document.getElementById("spanId").innerText = dict.duplicatedId;
    return false;
  } else {
    document.getElementById("spanId").innerText = "";
    return true;
  }
}


export {
    validateBackCamera,
    validateDesc,
    validateFrontCamera,
    validateId,
    validateImg,
    validateName,
    validatePrice,
    validateType,
}