//Variable para el carrusel
const carousel = document.querySelector(".team-carousel");

let isDragging = false, startX, startScrollLeft;

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