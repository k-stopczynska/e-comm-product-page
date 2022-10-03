const hamburger = document.querySelector('.wrapper__hamburger');
const menu = document.querySelector('.wrapper__menu');
const overlay = document.querySelector('.overlay');
const closeMenu = document.querySelector('.wrapper__close__menu');

const menuHandler = () => {
menu.classList.add('active');
overlay.classList.add('active');
}

const closeMenuHandler = () => {
    menu.classList.remove('active');
    overlay.classList.remove('active');
}


hamburger.addEventListener('click', menuHandler);
closeMenu.addEventListener('click', closeMenuHandler);