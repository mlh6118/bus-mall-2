/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// Done: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  document.querySelector('tbody').innerHTML = '';
}

// Done: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {

  // Done: Find the table body
  let tbodyShowCart = document.querySelector('tbody');
  
  // Done: Iterate over the items in the cart
  for(let i = 0; i < cart.items.length; i++){
  
    // Done: Create a TR
    let trShowCart = document.createElement('tr');

    // Done: Create a TD for the delete link, quantity,  and the item
    let tdDeleteLink = document.createElement('td');
    let tdQuantity = document.createElement('td');
    let tdItem = document.createElement('td');

    // Add text content.
    tdDeleteLink.innerHTML = `<button class="${i}">X</button>`;
    tdQuantity.textContent = cart.items[i].quantity;
    tdItem.textContent = cart.items[i].product;

    // Append tds to tr.
    trShowCart.append(tdDeleteLink, tdQuantity, tdItem);

    // Done: Add the TR to the TBODY and each of the TD's to the TR
    tbodyShowCart.appendChild(trShowCart);
  }

}

function removeItemFromCart(event) {

  // Done: When a delete link is clicked, use cart.removeItem to remove the correct item
  let buttonDeleteLink = event.target.className;
  cart.removeItem(buttonDeleteLink);

  // Done: Save the cart back to local storage
  cart.saveToLocalStorage();

  // Done: Re-draw the cart table
  renderCart();

}

// This will initialize the page and draw the cart on screen
renderCart();

// table.addEventListener('click', removeItemFromCart);
