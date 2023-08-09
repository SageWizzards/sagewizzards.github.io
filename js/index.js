
// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    
    const GET_STARTED = 'getStarted';
    const GET_STARTED_BUTTON = 'getStartedButton';
    let getStarted = localStorage.getItem(GET_STARTED);

    // Initial 
    if(getStarted === null) {
        localStorage.setItem(GET_STARTED, false);
    }

    if(getStarted === false) {
        
    }
    
    // Obtiene el botón por su id
    let boton = document.getElementById(GET_STARTED_BUTTON);

    // Agrega un evento de clic al botón
    boton.addEventListener("click", function() {
        // Coloca aquí el código que deseas ejecutar al presionar el botón
        console.log("¡Hiciste clic en el botón!");
        
    });
});