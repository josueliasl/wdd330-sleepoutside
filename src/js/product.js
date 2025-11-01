import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

const dataSource = new ProductData("tents");

/**
 * Adds a product to the shopping cart array in Local Storage.
 * @param {Object} product - The product object to add.
 */
function addProductToCart(product) {
  // 1. **Get** the current cart data from localStorage.
  //    Default to an empty array if no cart exists yet (null result).
  const cart = getLocalStorage("so-cart") || [];

  // 2. **Add** the new product to the cart array.
  cart.push(product);

  // 3. **Save** the updated array back to localStorage.
  setLocalStorage("so-cart", cart);

  // OPTIONAL: Call a function here to update the cart badge count instantly
  // updateCartIcon();
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// Function to set up event listeners
function initProductPage() {
  // We wait for DOMContentLoaded to ensure the button exists.
  document
    .getElementById("addToCart")
    .addEventListener("click", addToCartHandler);
}

// Call the function once the document is ready
document.addEventListener("DOMContentLoaded", initProductPage);
