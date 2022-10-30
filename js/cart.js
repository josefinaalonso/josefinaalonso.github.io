const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
const urlCart = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem('carrito')}.json`;
const cartform = document.getElementById('cart-form');
let radioCreditPay = document.getElementById("creditCard");
let radioTransferPay = document.getElementById("transfer");
let cardNumberInput = document.getElementById("cardNumber");
let securityNumberInput = document.getElementById("securityNumber");
let cardExpirationInput = document.getElementById("cardExpiration");
let accountNumberInput = document.getElementById("accountNumber");
let cart = [];
let cartproduct = [];
const validExpiration= /^(0[1-9]|1[0-2])(\/|-)(2[2-9])$/;

fetch(url)
  .then(function (respuesta) {
    return respuesta.json()
  })
  .then(function (datos) {
    cart = datos;
    showInfoCart();

  });


function showInfoCart() {
  let htmlContentToAppend =  `
        <tr>
            <th scope="row"><img src=${cart.articles[0].image} width="50px"></img></th>
            <td>${cart.articles[0].name}</td>
            <td>${cart.articles[0].currency + " " + cart.articles[0].unitCost}</td>
            <td><input type="number" id="inputarticle" style="width: 50px;" value="" min="1"></input>
            <div class="text-danger small mt-1 visually-hidden" id="checkAlert">
                Debe seleccionar al menos un artículo.
            </div></td>
            <td><b id="subtotal"></b></td>
        </tr> 
    `;
  document.getElementById('cart').innerHTML += htmlContentToAppend;
  let input = document.getElementById('inputarticle');
  let subtotal = document.getElementById('subtotal');
  let cartCost = document.getElementById('cartCost');
  let shippingCost = document.getElementById('shippingCost');
  let premiumradio = document.getElementById('premiumradio');
  let expressradio = document.getElementById('expressradio');
  let standardradio = document.getElementById('standardradio');
  let totalCostCart = document.getElementById('totalCostCart');
  premiumradio.addEventListener('input', function (e){
    if(cart.articles[0].currency=='USD'){
    let subtotalValue = input.value * cart.articles[0].unitCost
    shippingCost.innerHTML = cart.articles[0].currency + " " +(subtotalValue*0.15)
    totalCostCart.innerHTML = cart.articles[0].currency + " " +(subtotalValue+(subtotalValue*0.15))
  }
  else {
    let subtotalValue = input.value * cart.articles[0].unitCost /41.8
    shippingCost.innerHTML = 'USD' + " " +(subtotalValue*0.15)
    totalCostCart.innerHTML = 'USD' + " " +(subtotalValue+(subtotalValue*0.15))
  }
  })
  expressradio.addEventListener('input', function(e){
    if(cart.articles[0].currency=='USD'){
    let subtotalValue = input.value * cart.articles[0].unitCost
    shippingCost.innerHTML = cart.articles[0].currency + " " +(subtotalValue*0.07)
    totalCostCart.innerHTML = cart.articles[0].currency + " " +(subtotalValue+(subtotalValue*0.07))
  }
  else{
    let subtotalValue = input.value * cart.articles[0].unitCost/41.8
    shippingCost.innerHTML = 'USD' + " " +(subtotalValue*0.07)
    totalCostCart.innerHTML = 'USD' + " " +(subtotalValue+(subtotalValue*0.07))
  }
  })
  standardradio.addEventListener('input', function(e){
    if(cart.articles[0].currency=='USD'){
    let subtotalValue = input.value * cart.articles[0].unitCost
    shippingCost.innerHTML = cart.articles[0].currency + " " +(subtotalValue*0.05)
    totalCostCart.innerHTML = cart.articles[0].currency + " " +(subtotalValue+(subtotalValue*0.05))
  }
  else{
    let subtotalValue = input.value * cart.articles[0].unitCost/41.8
    shippingCost.innerHTML = cart.articles[0].currency + " " +(subtotalValue*0.05)
    totalCostCart.innerHTML = cart.articles[0].currency + " " +(subtotalValue+(subtotalValue*0.05))
  }
  })
  
  input.addEventListener('input', function (e) { 
    if(cart.articles[0].currency=='USD'){
    let subtotalValue = input.value * cart.articles[0].unitCost
    subtotal.innerHTML = cart.articles[0].currency + " " + subtotalValue;
    cartCost.innerHTML = cart.articles[0].currency + " " + subtotalValue;
    if (expressradio.checked)
    {
      shippingCost.innerHTML = cart.articles[0].currency + " " +(subtotalValue*0.07)
      totalCostCart.innerHTML = cart.articles[0].currency + " " +(subtotalValue+(subtotalValue*0.07))
    }
    else if (standardradio.checked){
      shippingCost.innerHTML = cart.articles[0].currency + " " +(subtotalValue*0.05)
      totalCostCart.innerHTML = cart.articles[0].currency + " " +(subtotalValue+(subtotalValue*0.05))
    }
   else if (premiumradio.checked){
    shippingCost.innerHTML = cart.articles[0].currency + " " +(subtotalValue*0.15)
    totalCostCart.innerHTML = cart.articles[0].currency + " " +(subtotalValue+(subtotalValue*0.15))
   };
  }
  else{
    let subtotalValue = input.value * cart.articles[0].unitCost/41.8
    subtotal.innerHTML = 'USD' + " " + subtotalValue;
    cartCost.innerHTML = 'USD' + " " + subtotalValue;
    if (expressradio.checked)
    {
      shippingCost.innerHTML = 'USD' + " " +(subtotalValue*0.07)
      totalCostCart.innerHTML = 'USD' + " " +(subtotalValue+(subtotalValue*0.07))
    }
    else if (standardradio.checked){
      shippingCost.innerHTML = 'USD' + " " +(subtotalValue*0.05)
      totalCostCart.innerHTML = 'USD' + " " +(subtotalValue+(subtotalValue*0.05))
    }
   else if (premiumradio.checked){
    shippingCost.innerHTML = 'USD' + " " +(subtotalValue*0.15)
    totalCostCart.innerHTML = 'USD' + " " +(subtotalValue+(subtotalValue*0.15))
   };
  }

  })
};

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

  function validField(ok,field){
      if (ok) {
        document.getElementById(`${field}`).classList.remove('is-invalid');
        document.getElementById(`${field}`).classList.add('is-valid');
      } else {
        document.getElementById(`${field}`).classList.remove('is-valid');
        document.getElementById(`${field}`).classList.add('is-invalid');
      };
  }
  const form=document.getElementById("cart-info");
  form.addEventListener("submit", function(e){
      e.preventDefault();
      validField(form.adressnumber.value!="","adressnumber");
      validField(form.adressstreet.value!="","adressstreet");
      validField(form.adresscorner.value!="","adresscorner");
      validField(form.inputarticle.value!=""&&form.inputarticle.value>0,"inputarticle");
      validField(form.premiumradio.checked||form.expressradio.checked||form.standardradio.checked,"standardradio");
      if (!document.getElementById("creditCard").checked&&!document.getElementById("transfer").checked) {
        document.getElementById("checkbox").classList.add("link-danger")
        validField(false,"creditCard");
        validField(false,"transfer");
        document.getElementById("checkAlert").classList.remove('visually-hidden');
    } else if(document.getElementById("creditCard").checked&&!document.getElementById("transfer").checked){
        if(cardNumberInput.value!=""&&securityNumberInput.value!=""&&validExpiration.test(cardExpirationInput.value))
        {document.getElementById("checkbox").classList.remove("link-danger")};
        validField(true,"creditCard");
        validField(false,"transfer");
        validField(cardNumberInput.value!="","cardNumber");
        validField(securityNumberInput.value!="","securityNumber");
        validField(cardExpirationInput.value!=""&&cardExpirationInput.value.length<6&&validExpiration.test(cardExpirationInput.value),"cardExpiration");
        document.getElementById("checkAlert").classList.add('visually-hidden');
    }
    else{
      if(accountNumberInput.value!="")
        {document.getElementById("checkbox").classList.remove("link-danger")};
      validField(false,"creditCard");
      validField(true,"transfer");
      validField(accountNumberInput.value!="","accountNumber");
      document.getElementById("checkAlert").classList.add('visually-hidden');

    }
    if (form.adressnumber.value!=""&&form.adressstreet.value!=""&&form.inputarticle.value!=""&&form.inputarticle.value>0&&
    form.adresscorner.value!=""&&(radioCreditPay.checked||radioTransferPay.checked)&&
    (form.premiumradio.checked||form.expressradio.checked||form.standardradio.checked)
    &&((cardNumberInput.value!=""&&securityNumberInput.value!=""&&validExpiration.test(cardExpirationInput.value))||accountNumberInput.value!=""))
    {
    document.getElementById("good").classList.remove('visually-hidden'); 
  }});
  
  
  radioCreditPay.addEventListener('click', function(e) {
    cardNumberInput.disabled = false; 
    securityNumberInput.disabled = false;
    cardExpirationInput.disabled = false;
    accountNumberInput.disabled = true;
  });
  
  
   radioTransferPay.addEventListener('click', function(e) {
    cardNumberInput.disabled = true; 
    securityNumberInput.disabled = true;
    cardExpirationInput.disabled = true;
    accountNumberInput.disabled = false;
  });

  