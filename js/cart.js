const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
const urlCart = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem('carrito')}.json`
let cart = [];
let cartproduct = [];


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
            <td><input type="number" id="input" style="width: 50px;" value=""></input></td>
            <td><b id="subtotal"></b></td>
        </tr> 
    `;
  document.getElementById('cart').innerHTML += htmlContentToAppend;
  let input = document.getElementById('input');
  let subtotal = document.getElementById('subtotal')
  input.addEventListener('input', function () {
    subtotal.innerHTML = cart.articles[0].currency + " " + input.value * cart.articles[0].unitCost
  })
};


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