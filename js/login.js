//*Declaro las variables y constantes necesarias

let nombreDeUsuarioArray = [];
let nombreDeUsuario = document.getElementById('email');
let botonDeIngreso = document.getElementById('button');
const validEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

///////////////////////////////////////////

//*Evento para conservar los datos del usuario una vez que ingresa

botonDeIngreso.addEventListener('click', function () {
    nombreDeUsuarioArray.push(nombreDeUsuario.value)
    if (localStorage.getItem('usuario') == "") {
        localStorage.setItem('usuario', JSON.stringify(nombreDeUsuarioArray));
        localStorage.removeItem('userName');
        localStorage.removeItem('userSurname');
        localStorage.removeItem('recent-image');
    }
    else {
        localStorage.removeItem('usuario');
        localStorage.setItem('usuario', JSON.stringify(nombreDeUsuarioArray));
        localStorage.removeItem('userName');
        localStorage.removeItem('userSurname');
        localStorage.removeItem('recent-image');
    }
});


