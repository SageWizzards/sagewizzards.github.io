
// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    
    const SEND_MESSAGE_BUTTON = 'sendMessageButton';
    const url = 'https://api.wizzysage.com/core';
    const DEFAULT_THREAD_KEY = 'uhjsd8092271';
    // const DEFAULT_THREAD_KEY = 'uhjsd' + Math.floor(Math.random() * 1000000) + 1;
    // Initial 
    
    let localStorageCounter = localStorage.getItem('count');
    if(localStorageCounter === null) {
        localStorage.setItem('count', 0);
    }

    let counterGlobal = localStorage.getItem('count');

    
    // Obtiene el botón por su id
    let boton = document.getElementById(SEND_MESSAGE_BUTTON);

    // Agrega un evento de clic al botón
    boton.addEventListener("click", () => {
        let inputMessage = document.getElementById('inputMessage');
        let messages = document.querySelector(".sage-talk-session-chat-content-messages");

        // Coloca aquí el código que deseas ejecutar al presionar el botón
        if(inputMessage.value && localStorage.getItem('count') > 12) {
            const user_message_string = inputMessage.value;
            const body = {
                message: user_message_string
            }
            
            const div_message_user = document.createElement('div');
            div_message_user.classList=['sage-talk-session-chat-content-message__user-container']
                const div_user = document.createElement('div');
                div_user.classList = ['sage-talk-session-chat-content-message__user'];
                    const p_user_message = document.createElement('p')
                    p_user_message.textContent = ''+inputMessage.value
                div_user.appendChild(p_user_message);
            div_message_user.appendChild(div_user);
            messages.appendChild(div_message_user);

            messages.scrollTop = messages.scrollHeight;
            inputMessage.value = '';

            fetch(
                `${url}/v1/bots/fakemaga14?thread_lookup_key=${DEFAULT_THREAD_KEY}`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(body),
                }
              ).then((data) => {
                if(data.ok === true) {
                    data.json().then((json) => {
                        let response_bot = json.content;
                        
                            const div_bot = document.createElement('div');
                            div_bot.classList = ['sage-talk-session-chat-content-message__bot'];
                                const p_bot = document.createElement('p')
                                p_bot.textContent = ''+response_bot
                            div_bot.appendChild(p_bot);
                            messages.appendChild(div_bot);

                            localStorage.setItem('count', counterGlobal + 1);

                            messages.scrollTop = messages.scrollHeight;
                    })
                }
                else {
                    console.log('fallo de respuesta')
                }
              }).catch((error) => {
                console.log('error', error);
              })

        }
        console.log("¡Hiciste clic en el botón!", inputMessage.value);
        
    });
});