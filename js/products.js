const url = 'https://japceibal.github.io/emercado-api/cats_products/101.json';
let productsArray = [];
fetch(url)
.then(function(respuesta) {
    return respuesta.json()
})
.then(function(datos) {
    productsArray = datos.products;
    let divListaProducts = document.getElementById('container');
    let htmlContentToAppend = '';
    for (let i = 0; i < productsArray.length; i++) {
        htmlContentToAppend += `
    <div onclick="setCatID(${productsArray[i].id})" class="list-group-item list-group-item-action cursor-active">
    <div class="row">
        <div class="col-3">
            <img src="${productsArray[i].image}" alt="${productsArray[i].description}" class="img-thumbnail">
        </div>
        <div class="col">
                <div class="d-flex w-100 justify-content-between">
                    <h4 class="mb-1">${productsArray[i].name+"-"+productsArray[i].cost}</h4>
                    <small class="text-muted">${productsArray[i].soldCount} artículos</small>
                </div>
                <p class="mb-1">${productsArray[i].description}</p>
            </div>
        </div>
    </div>
        `; 
    } 
    divListaProducts.innerHTML += htmlContentToAppend;  
    console.log(productsArray)
    });
    