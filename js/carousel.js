//Variable para el carrusel
const carousel = document.querySelector(".team-carousel");
const arrowBtns = document.querySelectorAll(".team-wrapper i");
const firstCardWidth = carousel.querySelector(".team-card").offsetWidth;

let isDragging = false, startX, startScrollLeft;

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

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);