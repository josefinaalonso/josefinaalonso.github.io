    function saltoDeLinea (){
    let saltoDeLinea = document.createElement("br");
    saltoDeLinea.innerHTML='';
    formulario.appendChild(saltoDeLinea);   
   }
    
    let formulario=document.createElement("form");
    formulario.innerHTML=''
    formulario.setAttribute('id', "form");
    formulario.setAttribute('action', "home.html");
    formulario.setAttribute('class', "text-center p-4");    
    
    let imagen=document.createElement("img");
    imagen.innerHTML=''
    imagen.setAttribute('src',"img/login.png");
    imagen.setAttribute('width',"300px");
    imagen.setAttribute('class',"m-auto");
    formulario.appendChild(imagen);
    
    saltoDeLinea()
    saltoDeLinea()

    let titulo = document.createElement("b");
    titulo.innerHTML='Inicio de sesión'
    titulo.setAttribute('style', "font-size:20px;");
    formulario.appendChild(titulo);

    saltoDeLinea()

    let email = document.createElement("label");
    email.setAttribute('for', "email");
    email.setAttribute('style', "font-size:15px");
    email.innerHTML='Email'
    formulario.appendChild(email);

    saltoDeLinea()

    let usuario = document.createElement("input");
    usuario.setAttribute('id', "email");
    usuario.setAttribute('type', "email");
    usuario.setAttribute('size', "30px");
    usuario.setAttribute('placeholder', "Email");
    usuario.setAttribute('required',"true")
    usuario.innerHTML='<h1>Usuario</h1>';
    formulario.appendChild(usuario);
    
    saltoDeLinea()
    saltoDeLinea()

    let password = document.createElement("label");
    password.setAttribute('for', "password");
    password.setAttribute('style', "font-size:15px;");
    password.innerHTML='Contraseña'
    formulario.appendChild(password);

    saltoDeLinea()

    let contraseña = document.createElement("input");
    contraseña.setAttribute('id', "password");
    contraseña.setAttribute('type', "password");
    contraseña.setAttribute('size', "30px");
    contraseña.setAttribute('placeholder', "Contraseña");
    contraseña.setAttribute('required',"true")
    contraseña.innerHTML='<h1>Contraseña</h1>';
    formulario.appendChild(contraseña);

    saltoDeLinea()
    saltoDeLinea()

    let boton = document.createElement("input");
    boton.setAttribute('id', "boton");
    boton.setAttribute('style', "background-color:#0066cc;border:0px;height:35px;width:80px;color:white;border-radius:3px;font-color:white;");
    boton.setAttribute('type', "submit");
    boton.setAttribute('value', "Ingresar");
    formulario.appendChild(boton);
    
    document.getElementById('container').appendChild(formulario);
