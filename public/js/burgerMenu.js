const burgerBtn = document.querySelector(".burger-btn");
const burgerImg = burgerBtn.querySelector("img");
const navList = document.querySelector(".nav-link-list");
const body = document.body;

let isOpen = false;

burgerBtn.addEventListener("click", () => {
    isOpen = !isOpen;

    navList.classList.toggle("open");
    body.classList.toggle("menu-open");

    burgerImg.src = isOpen
        ? "/images/close.png"
        : "/images/burger-bar.png";
});
