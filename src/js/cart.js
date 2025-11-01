import { getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

function cartItemTemplate(item) {
  // Use the HTML template from your previous file.
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const listElement = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-footer");

  if (cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    listElement.innerHTML = htmlItems.join("");

    // 1. Calculate the Total Price
    // Use reduce() to sum the FinalPrice of every item
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

    // 2. Display the Total
    document.getElementById("cartTotal").innerText =
      `Total: $${total.toFixed(2)}`;

    // 3. Make the cart total section visible
    if (cartFooter) {
      cartFooter.classList.remove("hide");
    }
  } else {
    // Cart is empty
    listElement.innerHTML = "<li>Your cart is empty!</li>";

    // Optional: Hide the total section if the cart is empty
    if (cartFooter) {
      cartFooter.classList.add("hide");
    }
  }
}

renderCartContents();
