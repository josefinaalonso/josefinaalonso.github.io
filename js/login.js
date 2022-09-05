let nombreDeUsuarioArray = []
let nombreDeUsuario = document.getElementById('email')
let botonDeIngreso = document.getElementById('button')
botonDeIngreso.addEventListener('click', function() {   
    nombreDeUsuarioArray.push(nombreDeUsuario.value) 
    localStorage.setItem('usuario', JSON.stringify(nombreDeUsuarioArray));
    })
