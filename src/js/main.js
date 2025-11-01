import ProductData from "./ProductData.mjs";
import { qs } from "./utils.mjs";

const dataSource = new ProductData("tents");

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/product_pages.html?product=${product.Id}"> 
      <img
        src="./images/tents/${product.Image}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.Name}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

function renderList(list, element, template) {
  // Clear the static list items first
  element.innerHTML = "";
  const htmlStrings = list.map(template);
  element.insertAdjacentHTML("afterbegin", htmlStrings.join(""));
}

async function getProducts() {
  const products = await dataSource.getData();
  const element = qs(".product-list");
  renderList(products, element, productCardTemplate);
}

getProducts();
