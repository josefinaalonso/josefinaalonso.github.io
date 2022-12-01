//*Declaro constantes, variables y arreglos  necesarios

const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
const urlCart = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem('carrito')}.json`;
const cartform = document.getElementById('cart-form');
const validExpiration = /^(0[1-9]|1[0-2])(\/|-)(2[2-9])$/;
////////////////////////////////////////////////////////
let radioCreditPay = document.getElementById("creditCard");
let radioTransferPay = document.getElementById("transfer");
let cardNumberInput = document.getElementById("cardNumber");
let securityNumberInput = document.getElementById("securityNumber");
let cardExpirationInput = document.getElementById("cardExpiration");
let accountNumberInput = document.getElementById("accountNumber");
///////////////////////////////////////////////////////
let cart = [];
let cartproduct = [];
///////////////////////////////////////////////////////

//*Peticion fetch que obtiene la información de carrito de la api 

fetch(url)
  .then(function (respuesta) {
    return respuesta.json()
  })
  .then(function (datos) {
    cart = datos;
    showInfoCart();

  });

//*Función que me procesa la informacón de la api y la agrega al html

function showInfoCart() {
  let htmlContentToAppend = `
        <tr>
            <th scope="row"><img src=${cart.articles[0].image} width="50px"></img></th>
            <td>${cart.articles[0].name}</td>
            <td>${cart.articles[0].currency + " " + cart.articles[0].unitCost}</td>
            <td><input type="number" id="inputarticle" style="width: 50px;" value="" min="1"></input>
            <div class="text-danger small mt-1 visually-hidden" id="checkAlert">
                Debe seleccionar al menos un artículo.
            </div></td>
            <td><b id="subtotal"></b></td>
            <td id="trash"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg></td>
        </tr> 
    `;
  document.getElementById('cart').innerHTML += htmlContentToAppend;

  //*Evento que me elimina el producto del carrito

  document.getElementById("trash").addEventListener('click', function (e) {
    let cartCost = document.getElementById('cartCost');
    let shippingCost = document.getElementById('shippingCost');
    let totalCostCart = document.getElementById('totalCostCart');
    totalCostCart.innerHTML = '';
    cartCost.innerHTML = '';
    shippingCost.innerHTML = '';
    let htmlContentToAppend = '';
    document.getElementById('cart').innerHTML = htmlContentToAppend;

  })
  ////////////////////////////////////////////////////////////////////

  let inputarticle = document.getElementById('inputarticle');
  let subtotal = document.getElementById('subtotal');
  let cartCost = document.getElementById('cartCost');
  let shippingCost = document.getElementById('shippingCost');
  let premiumradio = document.getElementById('premiumradio');
  let expressradio = document.getElementById('expressradio');
  let standardradio = document.getElementById('standardradio');
  let totalCostCart = document.getElementById('totalCostCart');

  /////////////////////////////////////////////////////////////////////

  //*Eventos para los input radio que me modifican el costo de envío y costo total del carrito en dólares

  premiumradio.addEventListener('input', function (e) {
    if (cart.articles[0].currency == 'USD') {
      let subtotalValue = inputarticle.value * cart.articles[0].unitCost
      shippingCost.innerHTML = cart.articles[0].currency + " " + (subtotalValue * 0.15)
      totalCostCart.innerHTML = cart.articles[0].currency + " " + (subtotalValue + (subtotalValue * 0.15))
    }

    else {
      let subtotalValue = inputarticle.value * cart.articles[0].unitCost / 41.8
      shippingCost.innerHTML = 'USD' + " " + (subtotalValue * 0.15)
      totalCostCart.innerHTML = 'USD' + " " + (subtotalValue + (subtotalValue * 0.15))
    }
  })

  //////////////////////////////////////////////////////////////////

  expressradio.addEventListener('input', function (e) {
    if (cart.articles[0].currency == 'USD') {
      let subtotalValue = inputarticle.value * cart.articles[0].unitCost
      shippingCost.innerHTML = cart.articles[0].currency + " " + (subtotalValue * 0.07)
      totalCostCart.innerHTML = cart.articles[0].currency + " " + (subtotalValue + (subtotalValue * 0.07))
    }

    else {
      let subtotalValue = inputarticle.value * cart.articles[0].unitCost / 41.8
      shippingCost.innerHTML = 'USD' + " " + (subtotalValue * 0.07)
      totalCostCart.innerHTML = 'USD' + " " + (subtotalValue + (subtotalValue * 0.07))
    }
  })

  //////////////////////////////////////////////////////////////////
  standardradio.addEventListener('input', function (e) {
    if (cart.articles[0].currency == 'USD') {
      let subtotalValue = inputarticle.value * cart.articles[0].unitCost
      shippingCost.innerHTML = cart.articles[0].currency + " " + (subtotalValue * 0.05)
      totalCostCart.innerHTML = cart.articles[0].currency + " " + (subtotalValue + (subtotalValue * 0.05))
    }

    else {
      let subtotalValue = inputarticle.value * cart.articles[0].unitCost / 41.8
      shippingCost.innerHTML = cart.articles[0].currency + " " + (subtotalValue * 0.05)
      totalCostCart.innerHTML = cart.articles[0].currency + " " + (subtotalValue + (subtotalValue * 0.05))
    }
  })

  ////////////////////////////////////////////////////////////////

  //*Evento para el input de cantidad de producto que me modifica el costo total del carrito en dólares

  inputarticle.addEventListener('input', function (e) {

    if (cart.articles[0].currency == 'USD') {
      let subtotalValue = inputarticle.value * cart.articles[0].unitCost
      subtotal.innerHTML = cart.articles[0].currency + " " + subtotalValue;
      cartCost.innerHTML = cart.articles[0].currency + " " + subtotalValue;

      if (expressradio.checked) {
        shippingCost.innerHTML = cart.articles[0].currency + " " + (subtotalValue * 0.07)
        totalCostCart.innerHTML = cart.articles[0].currency + " " + (subtotalValue + (subtotalValue * 0.07))
      }

      else if (standardradio.checked) {
        shippingCost.innerHTML = cart.articles[0].currency + " " + (subtotalValue * 0.05)
        totalCostCart.innerHTML = cart.articles[0].currency + " " + (subtotalValue + (subtotalValue * 0.05))
      }

      else if (premiumradio.checked) {
        shippingCost.innerHTML = cart.articles[0].currency + " " + (subtotalValue * 0.15)
        totalCostCart.innerHTML = cart.articles[0].currency + " " + (subtotalValue + (subtotalValue * 0.15))
      };
    }

    else {
      let subtotalValue = inputarticle.value * cart.articles[0].unitCost / 41.8
      subtotal.innerHTML = 'USD' + " " + subtotalValue;
      cartCost.innerHTML = 'USD' + " " + subtotalValue;

      if (expressradio.checked) {
        shippingCost.innerHTML = 'USD' + " " + (subtotalValue * 0.07)
        totalCostCart.innerHTML = 'USD' + " " + (subtotalValue + (subtotalValue * 0.07))
      }

      else if (standardradio.checked) {
        shippingCost.innerHTML = 'USD' + " " + (subtotalValue * 0.05)
        totalCostCart.innerHTML = 'USD' + " " + (subtotalValue + (subtotalValue * 0.05))
      }

      else if (premiumradio.checked) {
        shippingCost.innerHTML = 'USD' + " " + (subtotalValue * 0.15)
        totalCostCart.innerHTML = 'USD' + " " + (subtotalValue + (subtotalValue * 0.15))
      };
    }

  })
};
///////////////////////////////////////////////////////////////////////////////////

//*Petición y función para agregar un producto al carrito

/*
fetch(urlCart)
  .then(function (respuesta) {
    return respuesta.json()
  })
  .then(function (datos) {
    cartproduct = datos;
    newCart();
  });

function newCart() {
  let htmlContentToAppend = `
        <tr>
            <th scope="row"><img src=${cartproduct.images[0]} width="50px"></img></th>
            <td>${cartproduct.name}</td>
            <td>${cartproduct.currency + " " + cartproduct.cost}</td>
            <td><input type="number" id="inputproduct" style="width: 50px;" value=""></input></td>
            <td><b id="subtotalproduct"></b></td>
        </tr>
    `;
  document.getElementById('cartproduct').innerHTML += htmlContentToAppend;
  let input = document.getElementById('inputproduct');
  let subtotal = document.getElementById('subtotalproduct')
  input.addEventListener('input', function () {
    subtotal.innerHTML = cartproduct.currency + " " + input.value * cartproduct.cost
  });}
  */

////////////////////////////////////////////////////

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
const form = document.getElementById("cart-info");

//*Evento para la validación de formulario 

form.addEventListener("submit", function (e) {
  e.preventDefault();
  validField(form.adressnumber.value != "", "adressnumber");
  validField(form.adressstreet.value != "", "adressstreet");
  validField(form.adresscorner.value != "", "adresscorner");
  validField(form.inputarticle.value != "" && form.inputarticle.value > 0, "inputarticle");
  validField(form.premiumradio.checked || form.expressradio.checked || form.standardradio.checked, "standardradio");
  if (!document.getElementById("creditCard").checked && !document.getElementById("transfer").checked) {
    document.getElementById("checkbox").classList.add("link-danger")
    validField(false, "creditCard");
    validField(false, "transfer");
    document.getElementById("checkAlert").classList.remove('visually-hidden');
  } else if (document.getElementById("creditCard").checked && !document.getElementById("transfer").checked) {
    if (cardNumberInput.value != "" && securityNumberInput.value != "" && validExpiration.test(cardExpirationInput.value)) { document.getElementById("checkbox").classList.remove("link-danger") };
    validField(true, "creditCard");
    validField(false, "transfer");
    validField(cardNumberInput.value != "", "cardNumber");
    validField(securityNumberInput.value != "", "securityNumber");
    validField(cardExpirationInput.value != "" && cardExpirationInput.value.length < 6 && validExpiration.test(cardExpirationInput.value), "cardExpiration");
    document.getElementById("checkAlert").classList.add('visually-hidden');
  }
  else {
    if (accountNumberInput.value != "") { document.getElementById("checkbox").classList.remove("link-danger") };
    validField(false, "creditCard");
    validField(true, "transfer");
    validField(accountNumberInput.value != "", "accountNumber");
    document.getElementById("checkAlert").classList.add('visually-hidden');

  }
  if (form.adressnumber.value != "" && form.adressstreet.value != "" && form.inputarticle.value != "" && form.inputarticle.value > 0 &&
    form.adresscorner.value != "" && (radioCreditPay.checked || radioTransferPay.checked) &&
    (form.premiumradio.checked || form.expressradio.checked || form.standardradio.checked)
    && ((cardNumberInput.value != "" && securityNumberInput.value != "" && validExpiration.test(cardExpirationInput.value)) || accountNumberInput.value != "")) {
    document.getElementById("good").classList.remove('visually-hidden');
  }
});

//*Eventos que me invalidan/validan los input tipo radio que establecen la forma de pago

radioCreditPay.addEventListener('click', function (e) {
  cardNumberInput.disabled = false;
  securityNumberInput.disabled = false;
  cardExpirationInput.disabled = false;
  accountNumberInput.disabled = true;
});


radioTransferPay.addEventListener('click', function (e) {
  cardNumberInput.disabled = true;
  securityNumberInput.disabled = true;
  cardExpirationInput.disabled = true;
  accountNumberInput.disabled = false;
});

