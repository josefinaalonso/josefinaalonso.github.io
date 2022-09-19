const urlProduct = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("producto")}.json`
const urlComents = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("producto")}.json`;
let product = [];
let coments = [];

//let estrellas = [];
fetch(urlProduct)
.then (function(respuesta){
    return respuesta.json()
})
.then (function (datos){
    product = datos;
    showInfoProduct();
    });
    
function showInfoProduct(){
    
    let  htmlContentToAppend = `
    <br>
    <div>
    <h1 style="font-size:30px;">${product.name}</h1>
    </div> 
    <br>
    <hr>
    <div>
    <h2><b style="font-size:15px;">Precio</b></h2>
    <p>${product.cost}</p>   
    </div> 
    <div>
    <h2><b style="font-size:15px;">Descripción</b></h2>
    <p>${product.description}</p>   
    </div> 
    <div>
    <h2><b style="font-size:15px;">Categoría</b></h2>
    <p>${product.category}</p>   
    </div> 
    <div>
    <h2><b style="font-size:15px;">Cantidad de vendidos</b></h2>
    <p>${product.soldCount}</p>   
    </div> 
    <h2><b style="font-size:15px;">Imágenes ilustrativas</b></h2>`;
    
    let imagenes = product.images
    for (let imagen of imagenes){ htmlContentToAppend += `
    
    <img src=${imagen} width="150px"></img>   
    </div>
         `; 
}
    
    let divinfoproducto= document.getElementById('divinfoproducto');
    divinfoproducto.innerHTML += htmlContentToAppend;  
}


fetch(urlComents)
.then (function(response){
    return response.json()
})
.then (function (data){
    coments = data;
    showComentaries(coments);
 
    });
    
function showComentaries(array){
let  htmlContentToAppend = `
<br>
<br>
<h4 class="mb-3">Comentarios</h4>
`;
for (let comentario of array){ 
    htmlContentToAppend += `
<ul class="list-group mb-3">
    <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
            <h6 id="encabezado" class="my-0">
                <b>${comentario.user}</b>
                <span class="text-muted" id="comissionText">-</span>
                ${comentario.dateTime}
                <span class="text-muted" id="comissionText">-</span>`
     if (comentario.score==5)
     { 
        htmlContentToAppend += 
        `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>`
};
    if (comentario.score==4){  
        htmlContentToAppend += 
        `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>`
};
   if (comentario.score==3){ 
    htmlContentToAppend += `<span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>`
};

    if (comentario.score==2){
        htmlContentToAppend += `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
};
    if (comentario.score==1){ 
        htmlContentToAppend += `<span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
};
  if  (comentario.score==0){
    htmlContentToAppend += `<span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
};
htmlContentToAppend +=               `
            </h6>
          <td>
      </td>
            <small class="text-muted">${comentario.description}</small>
        </div>
    </li>
</ul>`; };

let divinfocomentario= document.getElementById('divinfocomentario');
divinfocomentario.innerHTML += htmlContentToAppend;   
};


 
