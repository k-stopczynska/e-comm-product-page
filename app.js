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
    const thumbsImageList = document.querySelectorAll(".wrapper__thumbs");
    thumbsImageList.forEach((list) =>
      list.addEventListener("click", thumbImageHandler)
    );
  });
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
  cart.children[1].style.display = "flex";
  cart.removeChild(cart.children[2]);
  cart.removeChild(cart.children[2]);
  wrapperCart.removeChild(wrapperCart.children[1]);
};

const checkout = () => {
  removeCartItems();
  const thanks = document.createElement("h3");
  thanks.innerText = "Thank you for your order!";
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

const createCart = (thumb, title, price, value) => {
  cart.children[1].style.display = "none";
  cart.insertAdjacentHTML(
    "beforeend",
    `  <div class="wrapper__cart__inside">
         <div class="wrapper__cart__image">${thumb}</div>
         <div>
           <h4>${title}</h4>
           <p>$${price} x <span>${value} </span><span>$${calculateCartSum(
      price,
      value
    )}</span></p>
         </div>
        <button class="button__trash"></button>
      </div>
    <button class="button__checkout">Checkout</button>`
  );
  createCartThumb(value);
  const buttonTrash = cart.querySelector(".button__trash");
  const buttonCheckout = cart.querySelector(".button__checkout");
  wrapperCart.appendChild(cart);
  buttonTrash.addEventListener("click", removeCartItems);
  buttonCheckout.addEventListener("click", checkout);
};

const addToCartHandler = (e) => {
  e.preventDefault();
  const thumb = thumbsImageList.children[0].innerHTML;
  const title = document.querySelector("h1").innerText;
  const price = e.target.previousElementSibling.children[0].dataset.value;
  const value = e.target.children[0].children[1].value;
  if (e.target.children[1]) {
    createCart(thumb, title, price, value);
  }
};

showCartHandler = () => {
  cart.classList.add("visible");
};

hamburger.addEventListener("click", menuHandler);
closeMenu.addEventListener("click", closeMenuHandler);
arrows.forEach((arrow) => {
  arrow.addEventListener("click", wrapperImageHandler);
});
form.addEventListener("submit", addToCartHandler);
mainImageList.addEventListener("click", lightboxHandler);
thumbsImageList.addEventListener("click", thumbImageHandler);
overlay.addEventListener("click", closeLightboxHandler);
if (lightbox.classList.contains("visible")) {
  lightbox
    .querySelector("button")
    .addEventListener("click", closeLightboxHandler);
}
wrapperCart.addEventListener("click", showCartHandler);
