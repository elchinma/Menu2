let titles = document.querySelectorAll(".title");
document.addEventListener("DOMContentLoaded", function () {
  let basketStr = localStorage.getItem("basket"); //"[]"
  let basket = JSON.parse(basketStr); //[]

  if (!basket || !basket.length) {
    localStorage.setItem("basket", JSON.stringify([]));
  } else {
    ShowProductCount(basket);
    ShowTotalPrice(basket);
  }
});

titles.forEach((title) => {
  if (title.innerText.length > 15) {
    title.setAttribute("data-title", title.innerText);
    title.innerText = title.innerText.substring(0, 15) + "...";
  }
});

let buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      localStorage.setItem("basket", JSON.stringify([]));
      basket = JSON.parse(localStorage.getItem("basket"));
    }
    let product = GetProductDatas(this);
    let existedProduct = basket.find((pro) => {
      return pro.id == product.id;
    });
    if (!existedProduct) {
      basket.push(product);
    } else {
      existedProduct.count++;
    }
    ShowProductCount(basket);
    ShowTotalPrice(basket);
    let basketStr = JSON.stringify(basket);
    localStorage.setItem("basket", basketStr);
  });
});

function GetProductDatas(product) {
  let parent = product.parentElement.parentElement.parentElement;
  let id = parent.getAttribute("data-id");
  let price = parent.querySelector(".price").innerText;
  let title = parent.querySelector(".title").getAttribute("data-title");
  let desc = parent.querySelector("p").innerText;
  let src = parent.querySelector("img").src;
  let result = { id, price, title, desc, src, count: 1 };
  return result;
}

function ShowProductCount(basket) {
  let basketCount = document.querySelector(".basket-count");
  basketCount.innerText = basket.reduce((total, product) => {
    return (total += product.count);
  }, 0);
}

function ShowTotalPrice(basket) {
  let total = document.querySelector(".total-price");
  total.innerText = basket.reduce((total, product) => {
    return (total += parseInt(product.price * product.count));
  }, 0);
}

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
if (!event.target.matches('.dropbtn')) {

  var dropdowns = document.getElementsByClassName("dropdown-content");
  var i;
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
    }
  }
}
}