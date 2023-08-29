
// Espera a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {
    
    const SEND_MESSAGE_BUTTON = 'sendMessageButton';
    const url = 'https://api.wizzysage.com/core';
    const DEFAULT_THREAD_KEY = 'uhjsd8092271';
    // const DEFAULT_THREAD_KEY = 'uhjsd' + Math.floor(Math.random() * 1000000) + 1;
    // Initial 

    // links
    let link1 = document.getElementById('link1');
    link1.addEventListener('click', (e) => {
        e.preventDefault()
        this.location.href = '#content'
    })

    let link2 = document.getElementById('link2');
    link2.addEventListener('click', (e) => {
        e.preventDefault()
        this.location.href = '#section2'
    })

    let link3 = document.getElementById('link3');
    link3.addEventListener('click', (e) => {
        e.preventDefault()
        this.location.href = '#section3'
    })

    // Localstorage
    
    let localStorageCounter = localStorage.getItem('count');
    if(localStorageCounter === null) {
        localStorage.setItem('count', 0);
    }

    let counterGlobal = localStorage.getItem('count');

    //
    let menu = document.getElementById('menu');
    let content = document.getElementById('content');

    let menuToggle = document.getElementById('menu-toggle');

    menuToggle.addEventListener('click', () => {
        if(menu.classList.contains('show')) {
            menu.classList.remove('show')
        } else {
            menu.classList.add('show')
        }

        if(content.classList.contains('toggle-padding')) {
            content.classList.remove('toggle-padding')
        } else {
            content.classList.add('toggle-padding')
        }
    });

    var os = "Desconocido";

    if (navigator.userAgent.indexOf("Win") != -1) {
        os = "Windows";
    } else if (navigator.userAgent.indexOf("Mac") != -1) {
        os = "MacOS";
    } else if (navigator.userAgent.indexOf("Linux") != -1) {
        os = "Linux";
    } else if (navigator.userAgent.indexOf("Android") != -1) {
        os = "Android";
    } else if (navigator.userAgent.indexOf("iPhone") != -1 || navigator.userAgent.indexOf("iOS") != -1) {
        os = "iOS";
    }

    var elementHeader = document.getElementById('link-download');

    if(os === 'Windows') {
        const a_link = document.createElement('a');
        a_link.href= 'https://github.com/SageWizzards/sage-app-releases/releases/download/v0.4.6/Sage.App_0.4.6_x64_en-US.msi';
        a_link.classList=['sage-nav-button'];
        a_link.textContent = 'Descarga la app para Windows'
        elementHeader.appendChild(a_link);
    } else if(os === 'MacOS') {
        const a_link = document.createElement('a');
        a_link.href= 'https://github.com/SageWizzards/sage-app-releases/releases/download/v0.4.6/Sage.App_x64.app.tar.gz';
        a_link.classList=['sage-nav-button'];
        a_link.textContent = 'Descarga la app para MacOS'
        elementHeader.appendChild(a_link);
    }
    else if (os === 'iOS') {
        const a_link = document.createElement('a');
        a_link.href= 'https://app.wizzysage.com/login';
        a_link.classList=['sage-nav-button'];
        a_link.textContent = 'Inicia Session'
        elementHeader.appendChild(a_link);
    } else {
        const a_link = document.createElement('a');
        a_link.href= 'https://app.wizzysage.com/login';
        a_link.classList=['sage-nav-button'];
        a_link.textContent = 'Inicia Session'
        elementHeader.appendChild(a_link);
    }

    // Obtiene el botón por su id
    let boton = document.getElementById(SEND_MESSAGE_BUTTON);

    // Agrega un evento de clic al botón
    boton.addEventListener("click", () => {
        let inputMessage = document.getElementById('inputMessage');
        let messages = document.querySelector(".sage-talk-session-chat-content-messages");

        // Coloca aquí el código que deseas ejecutar al presionar el botón
        if(inputMessage.value && localStorage.getItem('count') < 12) {
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