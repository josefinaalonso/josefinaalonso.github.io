let nombreDeUsuarioArray = []
let nombreDeUsuario = document.getElementById('email')
let botonDeIngreso = document.getElementById('button')
botonDeIngreso.addEventListener('click', function () {
    nombreDeUsuarioArray.push(nombreDeUsuario.value)
    if (localStorage.getItem('usuario') == "") {
        localStorage.setItem('usuario', JSON.stringify(nombreDeUsuarioArray));
        localStorage.removeItem('userName')
        localStorage.removeItem('userSurname')
    }
    else {
        localStorage.removeItem('usuario')
        localStorage.setItem('usuario', JSON.stringify(nombreDeUsuarioArray));
        localStorage.removeItem('userName')
        localStorage.removeItem('userSurname')
    }
})
