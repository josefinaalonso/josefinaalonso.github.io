//*Declaro constantes, variables y arreglos  necesarios
const ORDER_ASC_BY_PRICE = "AZ";
const ORDER_DESC_BY_PRICE = "ZA";
const ORDER_BY_PROD_REL = "Cant.";
//////////////////////////////////////////
let currentProductsArray = [];
let currentSortProducts = undefined;
let minCount = undefined;
let maxCount = undefined;
let inputSearchProduct = document.getElementById('inputSearch');
/////////////////////////////////////////

//*Función para ordenar el arreglo según criterio alfabético y de costo

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_REL) {
        result = array.sort(function (a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

//*Función para agregar los productos al html

function showProductsList() {

    let htmlContentToAppend = "";
    for (let product of currentProductsArray)
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount))) {

            htmlContentToAppend += `
            <div onclick="ingresarAProducto(${product.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                </div>
                <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name + "-" + product.cost}</h4>
                            <small class="text-muted">${product.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>
                `;
        }

    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}


/**
 * It sorts the categories array and then shows the sorted categories.
 * @param sortCriteria - Criterio de ordenamiento
 * @param categoriesArray - Array of categories to sort.
 * 
 */

//*Función para ordenar y mostrar los productos en el html

function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;

    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//*Eventos para ordenar y mostrar los productos en el html

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data.products);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByCount").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_REL);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductsList();
    });
});

//*Función para redirigir al producto que el usuario seleccione

function ingresarAProducto(id) {
    localStorage.setItem('producto', id);
    window.location.href = `product-info.html`

}

//*Evento para buscar producto por nombre o descripción

inputSearchProduct.addEventListener('input', function (e) {
    fetch(PRODUCTS_URL)
        .then(function (respuesta) {
            return respuesta.json()
        })
        .then(function (datos) {
            result = datos;
            products = result.products
            searchProducts(inputSearchProduct.value, products);

        });
});


//*Función para filtrar producto por nombre o por descripción

function searchProducts(busqueda, array) {
    if (busqueda != '') {
        let arrayfilter = array.filter(n => n.name.toLowerCase().indexOf(busqueda.toLowerCase()) > -1 || n.description.toLowerCase().indexOf(busqueda.toLowerCase()) > -1)
        htmlContentToAppend = '';
        for (let product of arrayfilter) {
            htmlContentToAppend += `
            <div onclick="ingresarAProducto(${product.id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
                </div>
                <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">${product.name + "-" + product.cost}</h4>
                            <small class="text-muted">${product.soldCount} artículos</small>
                        </div>
                        <p class="mb-1">${product.description}</p>
                    </div>
                </div>
            </div>
                `;

            document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
        };
    }
    else {
        sortAndShowProducts(ORDER_ASC_BY_PRICE, array);
    }
}


