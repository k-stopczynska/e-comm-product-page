const hamburger = document.querySelector(".wrapper__hamburger");
const menu = document.querySelector(".wrapper__menu");
const overlay = document.querySelector(".overlay");
const closeMenu = document.querySelector(".wrapper__close__menu");
const wrapperImage = document.querySelector(".wrapper__image__main");
const mainImageList = wrapperImage.querySelector("ul");
const thumbsImageList = document.querySelector(".wrapper__thumbs");
const lightbox = document.querySelector(".lightbox");
const arrows = document.querySelectorAll(".arrow");
const form = document.querySelector(".wrapper__add__product");
const wrapperCart = document.querySelector(".wrapper__cart");
const cart = wrapperCart.querySelector(".cart");
let cartObject = { name: "", price: 0, value: 0 };
cart.innerHTML = `
<h4>Cart</h4>
<p>Your cart is empty.</p>`

const menuHandler = () => {
  menu.classList.add("active");
  overlay.classList.add("active");
};

const closeMenuHandler = () => {
  menu.classList.remove("active");
  overlay.classList.remove("active");
};

const wrapperImageHandler = (e) => {
  const offset = e.currentTarget.classList.contains("arrow__right") ? 1 : -1;
  const slides = e.currentTarget.closest("div").children[0];
  const currentSlide = slides.querySelector(".active");
  let newSlide = [...slides.children].indexOf(currentSlide) + offset;
  if (newSlide > slides.children.length - 1) newSlide = 0;
  if (newSlide < 0) newSlide = slides.children.length - 1;
  const thumbsImageList = e.target.closest("div").nextElementSibling;
  for (const slide of [...thumbsImageList.children]) {
    slide.classList.remove("checked");
    if (slide.dataset.id === slides.children[newSlide].dataset.id) {
      slide.classList.add("checked");
    }
  }
  currentSlide.classList.remove("active");
  slides.children[newSlide].classList.add("active");
};

const lightboxHandler = () => {
  overlay.classList.add("active");
  const lightBox = lightbox.cloneNode(true);
  lightBox.classList.add("visible");
  const closeLightBox = document.createElement("button");
  closeLightBox.classList.add("button__close__lightbox");
  lightBox.appendChild(closeLightBox);
  document.body.appendChild(lightBox);
  closeLightBox.addEventListener("click", closeLightboxHandler);
  const arrows = document.querySelectorAll(".arrow");
  arrows.forEach((arrow) => {
    arrow.addEventListener("click", wrapperImageHandler);
  });
  const thumbsImageList = document.querySelectorAll(".wrapper__thumbs");
  thumbsImageList.forEach((list) =>
    list.addEventListener("click", thumbImageHandler)
  );
};

const closeLightboxHandler = () => {
  overlay.classList.remove("active");
  const lightBox = document.querySelector(".visible");
  lightBox.remove();
};

const thumbImageHandler = (e) => {
  const elements = e.currentTarget.children;
  [...elements].forEach((elem) => elem.classList.remove("checked"));
  e.target.closest("li").classList.add("checked");
  const listOfSlides =
    e.currentTarget.previousElementSibling.getElementsByTagName("li");
  for (const slide of listOfSlides) {
    if (slide.dataset.id === e.target.closest("li").dataset.id) {
      [...listOfSlides].forEach((slide) => slide.classList.remove("active"));
      slide.classList.add("active");
    }
  }
};

const removeCartItems = () => {
  cart.innerHTML = `
  <h4>Cart</h4>
  <p>Your cart is empty.</p>`
  sessionStorage.removeItem("cart");
  wrapperCart.removeChild(wrapperCart.children[1]);
};

const checkout = () => {
  removeCartItems();
  const thanks = document.createElement("h3");
  thanks.innerText = `Thank you for your order!`;
  cart.appendChild(thanks);
};

const calculateCartSum = (price, value) => {
  return (parseInt(price) * value).toFixed(2);
};

const createCartThumb = (value) => {
  const cartThumb = document.createElement("div");
  cartThumb.classList.add("cart__thumb");
  cartThumb.innerText = `${value}`;
  wrapperCart.appendChild(cartThumb);
};

const createCart = () => {
  const cartObj = JSON.parse(sessionStorage.getItem('cart'));
  cart.innerHTML =
    ` <h4>Cart</h4>
    <div class="wrapper__cart__inside">
         <div class="wrapper__cart__image">${cartObj.thumb}</div>
         <div>
           <h4>${cartObj.name}</h4>
           <p>$${cartObj.price} x <span>${cartObj.value} </span><span>$${calculateCartSum(
      cartObj.price,
      cartObj.value
    )}</span></p>
         </div>
        <button class="button__trash"></button>
      </div>
    <button class="button__checkout">Checkout</button>`
  ;
  createCartThumb(cartObj.value);
  const buttonTrash = cart.querySelector(".button__trash");
  const buttonCheckout = cart.querySelector(".button__checkout");
  wrapperCart.appendChild(cart);
  buttonTrash.addEventListener("click", removeCartItems);
  buttonCheckout.addEventListener("click", checkout);
};

const renderCart = () => {
  if (JSON.parse(sessionStorage.getItem('cart'))) {
    createCart();
  }
}
renderCart();

const addToCartHandler = (e) => {

  e.preventDefault();
  e.stopPropagation();
  const thumb = thumbsImageList.children[0].innerHTML;
  const title = document.querySelector("h1").innerText;
  const price = form.previousElementSibling.children[0].dataset.value;
  let value = form.children[0].children[1].value;
  cartObject = {
    thumb: thumb,
    name: title,
    price: price,
    value: value,
}
if (JSON.parse(sessionStorage.getItem('cart'))) {
    const updatedCart = JSON.parse(sessionStorage.getItem('cart'))
     cartObject = {...cartObject, value: +updatedCart.value + +value}
    }
  sessionStorage.setItem("cart", JSON.stringify(cartObject));

  value < 1
    ? alert("You cannot purchase less than 1 item")
    : createCart();

  resetInput();
};

const showCartHandler = () => {
  cart.classList.toggle("visible");
};

const resetInput = () => {
  form.querySelector("#input__add__product").value = 0;
};

const manageProductsValue = (e) => {
  e.preventDefault();
  e.stopPropagation();
  const valueOffset = e.target.classList.contains("button__plus")
    ? 1
    : e.target.classList.contains("button__minus")
    ? -1
    : addToCartHandler(e);
  let inputValue = parseInt(form.querySelector("#input__add__product").value);
  if (valueOffset) {
    inputValue += valueOffset;
    form.querySelector("#input__add__product").value = inputValue;
  }
};

hamburger.addEventListener("click", menuHandler);
closeMenu.addEventListener("click", closeMenuHandler);
overlay.addEventListener("click", closeMenuHandler);
arrows.forEach((arrow) => {
  arrow.addEventListener("click", wrapperImageHandler);
});
form.addEventListener("submit", addToCartHandler);
form.addEventListener("click", manageProductsValue);
if (document.body.clientWidth > 920) {
  mainImageList.addEventListener("click", lightboxHandler);
}

thumbsImageList.addEventListener("click", thumbImageHandler);
overlay.addEventListener("click", closeLightboxHandler);
wrapperCart.addEventListener("click", showCartHandler);

