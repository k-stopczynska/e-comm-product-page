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
  document.body.appendChild(lightBox);
  const arrows = document.querySelectorAll(".arrow");
  arrows.forEach((arrow) => {
    arrow.addEventListener("click", wrapperImageHandler);
  });
};

const addToCartHandler = (e) => {
  e.preventDefault();
  console.log(e.currentTarget);
};

const thumbImageHandler = (e) => {
  const listOfSlides = mainImageList.getElementsByTagName("li");
  for (const slide of listOfSlides) {
    if (slide.dataset.id === e.target.closest("li").dataset.id) {
      [...listOfSlides].forEach((slide) => slide.classList.remove("active"));
      slide.classList.add("active");
    }
  }
};

hamburger.addEventListener("click", menuHandler);
closeMenu.addEventListener("click", closeMenuHandler);
arrows.forEach((arrow) => {
  arrow.addEventListener("click", wrapperImageHandler);
});
form.addEventListener("submit", addToCartHandler);

mainImageList.addEventListener("click", lightboxHandler);
thumbsImageList.addEventListener("click", thumbImageHandler);
