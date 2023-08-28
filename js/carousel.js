//Variable para el carrusel
const carousel = document.querySelector(".team-carousel");

let isDragging = false;

const dragStart = () => {
    isDragging = true;
}

//Se mueve a la izquierda cuando se pone el cursor en el carrusel
const dragging = (e) => {
    if(!isDragging) return; 
    carousel.scrollLeft = e.pageX;
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
