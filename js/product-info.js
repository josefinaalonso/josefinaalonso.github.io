//*Defino constantes y arreglos vacíos necesarios

const urlProduct = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("producto")}.json`
const urlComents = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("producto")}.json`;
let product = [];
let coments = [];


//*Peticion fetch que consigue la información de producto de la api y la muestra mediante las funciones 

fetch(urlProduct)
  .then(function (respuesta) {
    return respuesta.json()
  })
  .then(function (datos) {
    product = datos;
    showInfoProduct();
    showRelatedProducts();
  });

//*Función que me agrega al elemento html con id=divinfoproducto la información que quiero mostrar de la api que está definida más arriba

function showInfoProduct() {

  let htmlContentToAppend = `
    <br>
    <div>
    <h1 style="font-size:30px;">${product.name}</h1>
    <input style="margin-left: 80%; width:100px;" type="button" class="btn btn-success" id="btncompra" value="Comprar">
    </div> 
    <br>
    <hr>
    <div>
    <h2><b style="font-size:15px;">Precio</b></h2>
    <p>USD ${product.cost}.</p>   
    </div> 
    <div>
    <h2><b style="font-size:15px;">Descripción</b></h2>
    <p>${product.description}</p>   
    </div> 
    <div>
    <h2><b style="font-size:15px;">Categoría</b></h2>
    <p>${product.category}.</p>   
    </div> 
    <div>
    <h2><b style="font-size:15px;">Cantidad de vendidos</b></h2>
    <p>${product.soldCount} unidades.</p>   
    </div> 
    <h2><b style="font-size:15px;">Imágenes ilustrativas</b></h2>`;

  //*Agrego las imágenes con un formato carrusel de boostrap
  let imagenes = product.images
  htmlContentToAppend += `
    
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
    </div>
    <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="${imagenes[0]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${imagenes[1]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="${imagenes[2]}" class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
    <img src="${imagenes[3]}" class="d-block w-100" alt="...">
  </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
         `;

  let divinfoproducto = document.getElementById('divinfoproducto');
  divinfoproducto.innerHTML += htmlContentToAppend;

  let btnCompra = document.getElementById('btncompra')
  btnCompra.addEventListener('click', function () {
    localStorage.setItem('carrito', product.id);
  })


};

//*Función que me agrega al html los productos relacionados 

function showRelatedProducts() {
  let htmlContentToAppend = `
    <div class="album py-5 bg-light" id="album">
    <div class="container" >
      <div class="row"id="contenedoralbum">
      <h2>Productos Relacionados</h2>
        <div class="col-md-4" id="elementoalbumuno" onclick="ingresarAProductoRelacionado(${product.relatedProducts[0].id})" >
          <div class="card mb-4 shadow-sm custom-card cursor-active" >
            <img class="bd-placeholder-img card-img-top"  src="${product.relatedProducts[0].image}"
              alt="">
            <h3 class="m-3">${product.relatedProducts[0].name}</h3>
          </div>
        </div>
        <div class="col-md-4" id="elementoalbumdos" onclick="ingresarAProductoRelacionado(${product.relatedProducts[1].id})" >
          <div class="card mb-4 shadow-sm custom-card cursor-active" >
            <img class="bd-placeholder-img card-img-top"  src="${product.relatedProducts[1].image}">
            <h3 class="m-3">${product.relatedProducts[1].name}</h3>
          </div>
        </div>
      </div>
`;

  let divproductosrelacionados = document.getElementById('productosrelacionados');
  divproductosrelacionados.innerHTML += htmlContentToAppend;
}

//*Petición fetch para utilizar y mostrar la información de la api de comentarios

fetch(urlComents)
  .then(function (response) {
    return response.json()
  })
  .then(function (data) {
    coments = data;
    showComentaries(coments);

  });

//*Función que me agrega al html los comentarios

function showComentaries(array) {
  let htmlContentToAppend = `
<br>
<br>
<h4>Comentarios</h4>
`;
  for (let comentario of array) {
    htmlContentToAppend += `
<ul class="list-group mb-3">
    <li class="list-group-item d-flex justify-content-between lh-condensed">
        <div>
            <h6 id="encabezado" class="my-0">
                <b>${comentario.user}</b>
                <span class="text-muted" id="comissionText">-</span>
                ${comentario.dateTime}
                <span class="text-muted" id="comissionText">-</span>`

    //*Condicional para formato de estrellas

    if (comentario.score == 5) {
      htmlContentToAppend +=
        `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>`
    };
    if (comentario.score == 4) {
      htmlContentToAppend +=
        `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>`
    };
    if (comentario.score == 3) {
      htmlContentToAppend += `<span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star checked"></span>
    <span class="fa fa-star"></span>
    <span class="fa fa-star"></span>`
    };

    if (comentario.score == 2) {
      htmlContentToAppend += `<span class="fa fa-star checked"></span>
        <span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    };
    if (comentario.score == 1) {
      htmlContentToAppend += `<span class="fa fa-star checked"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    };
    if (comentario.score == 0) {
      htmlContentToAppend += `<span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>
        <span class="fa fa-star"></span>`
    };
    htmlContentToAppend += `
            </h6>
          <td>
      </td>
            <small class="text-muted">${comentario.description}</small>
        </div>
    </li>
</ul>`;
  };

  let divinfocomentario = document.getElementById('divinfocomentario');
  divinfocomentario.innerHTML += htmlContentToAppend;
};

//*Función para redirigirme a la página del producto relacionado una vez que haga click 

function ingresarAProductoRelacionado(id) {
  localStorage.setItem('producto', id);
  window.location.href = `product-info.html`

}

