//Variable para el carrusel
const carousel = document.querySelector(".team-carousel");
const wrapper = document.querySelector(".team-wrapper");
const arrowBtns = document.querySelectorAll(".team-wrapper i");
const firstCardWidth = carousel.querySelector(".team-card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeftm, timeoutId;

//Obtiene el numero de cards que pueden encajar en el carrusel
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

//Carrusel con movimiento infinito
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

//Para que funcionen los botones del carrusel
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        //Mostrar id del boton en consola
        console.log(btn.id);
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
});

const dragStart = () => {
    isDragging = true;
    carousel.classList.add("dragging");
    //Recuerda la posicion inicial del cursor y scrollea el carrusel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

//Se mueve a la izquierda cuando se pone el cursor en el carrusel
const dragging = (e) => {
    if(!isDragging) return; 
    //Actualiza la posicion donde se hace scroll del carrusel
    //Se basa en el movimiento del cursor
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

//Se añade dragStop
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

//Se añade autoplay
//Retornará si la ventana es menor a 800px
const autoPlay = () => {
    if(window.innerWidth < 800) return;
    //Autoplay el carrusel cada 2500 milisegundos
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}

autoPlay();

//Scroll infinito
const infiniteScroll = () => {
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    } else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        //console.log("Fin del lado derecho");
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay;
}

//Draggins
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);