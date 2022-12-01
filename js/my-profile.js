//*Declaro las variables necesarios

var userName = JSON.parse(localStorage.getItem('userName'));
var userSurname = JSON.parse(localStorage.getItem('userSurname'));
var email = JSON.parse(localStorage.getItem('usuario'));
//////////////////////////////////////////
var inputUserName = document.getElementById('userName');
var inputUserSurname = document.getElementById('userSurname');
var inputemail = document.getElementById('userEmail');
var inputImage = document.getElementById('userImage');
//////////////////////////////////////////
var form = document.getElementById("profile-info");

//*Evento para conservar los datos ya ingresados por el usuario

window.addEventListener('DOMContentLoaded',
    function (event) {
        if (userName != "") {
            inputUserName.value = userName
        };
        if (userSurname != "") {
            inputUserSurname.value = userSurname
        };
        if (email != "") {
            inputemail.value = email
        };
        if (inputImage != "") {
            const recentImage = localStorage.getItem('recent-image');
            if (recentImage) {
                document.querySelector("#img").setAttribute("src", recentImage)
            }
        };
    });

//*Función para la validación de formulario mediante boostrap

function validField(ok, field) {
    if (ok) {
        document.getElementById(`${field}`).classList.remove('is-invalid');
        document.getElementById(`${field}`).classList.add('is-valid');
    } else {
        document.getElementById(`${field}`).classList.remove('is-valid');
        document.getElementById(`${field}`).classList.add('is-invalid');
    };
}

//*Evento para la validación de formulario

form.addEventListener("submit", function (e) {
    e.preventDefault();
    validField(inputUserName.value != "", "userName");
    validField(inputUserSurname.value != "", "userSurname");
    validField(inputemail.value != "", "userEmail");
    if (inputUserName != "") {
        let userName = [];
        userName.push(inputUserName.value)
        localStorage.setItem('userName', JSON.stringify(userName))
    };
    if (inputUserSurname != "") {
        let userSurname = [];
        userSurname.push(inputUserSurname.value)
        localStorage.setItem('userSurname', JSON.stringify(userSurname))
    };
    if (inputemail != "") {
        email = [];
        email.push(inputemail.value)
        localStorage.setItem('usuario', JSON.stringify(email))

    };
    if (inputUserName.value != "" && inputUserSurname.value != "" && inputemail.value != "") {
        document.getElementById("good").classList.remove('visually-hidden');
    }
});

document.querySelector("#userImage").addEventListener('change', function () {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
        localStorage.setItem('recent-image', reader.result);
    })
    reader.readAsDataURL(this.files[0]);
})