import Swal from "sweetalert2";
import { products } from "../../data/data";
import type { Product } from "../../types/products";
import { getSelectedCategory } from "../../utils/store";
import { isLoggedIn } from "../../utils/auth";
import { addToCart, getCartItemsCount } from "../../utils/cart";

export function initProducts(): void {
  initSearch();
  renderProducts();
  updateCartCount();
}

export function renderProducts(): void {
  const container = document.querySelector<HTMLElement>("#container-products");
  const searchInput = document.querySelector<HTMLInputElement>("#search");

  if (!container) return;

  const selectedCategory = getSelectedCategory();
  const searchText = searchInput?.value.trim().toLowerCase() ?? "";

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" ||
      product.categories.some((category) => category.name === selectedCategory);

    const matchesSearch = product.name.toLowerCase().includes(searchText);

    return !product.deleted && matchesCategory && matchesSearch;
  });

  if (filteredProducts.length === 0) {
    container.innerHTML = `<p class="no-products">No products found.</p>`;
    return;
  }

  const fragment = document.createDocumentFragment();

  filteredProducts.forEach((product) => {
    fragment.appendChild(createProductCard(product));
  });

  container.replaceChildren(fragment);
}

function createProductCard(product: Product): HTMLDivElement {
  const card = document.createElement("div");
  card.classList.add("card");

  const categoryName = product.categories[0]?.name ?? "No category";
  const stockText = product.available ? `Stock: ${product.stock}` : "Not available";

  card.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <div class="card-body">
      <span class="product-category-label">${categoryName}</span>
      <h2>${product.name}</h2>
      <h3>${product.description}</h3>
      <p><strong>$ ${product.price}</strong></p>
      <p>${stockText}</p>

      <div class="card-buttons">
        <button type="button" class="view-btn">View</button>
        <button type="button" class="add-btn" ${!product.available ? "disabled" : ""}>
          ${product.available ? "Add to cart" : "Not available"}
        </button>
      </div>
    </div>
  `;

  card.querySelector<HTMLButtonElement>(".view-btn")?.addEventListener("click", () => {
    handleViewProduct(product.id);
  });

  card.querySelector<HTMLButtonElement>(".add-btn")?.addEventListener("click", () => {
    void handleAddToCart(product);
  });

  return card;
}

async function requireLogin(message: string): Promise<boolean> {
  if (isLoggedIn()) return true;

  const result = await Swal.fire({
    title: "You need an account",
    text: message,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Login",
    cancelButtonText: "Sign up",
  });

  if (result.isConfirmed) {
    window.location.href = "/src/pages/auth/login/login.html";
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    window.location.href = "/src/pages/auth/register/register.html";
  }

  return false;
}

async function handleViewProduct(productId: number): Promise<void> {
  const canContinue = await requireLogin(
    "Please log in or sign up to view product details."
  );

  if (!canContinue) return;

  window.location.href = `/src/pages/store/products/product.html?id=${productId}`;
}

async function handleAddToCart(product: Product): Promise<void> {
  if (!product.available || product.stock <= 0) return;

  const canContinue = await requireLogin(
    "Please log in or sign up before adding products to the cart."
  );

  if (!canContinue) return;

  addToCart(product);
  updateCartCount();

  await Swal.fire({
    title: "Added to cart",
    text: `${product.name} was added successfully.`,
    icon: "success",
    confirmButtonText: "OK",
  });
}

function initSearch(): void {
  const form = document.querySelector<HTMLFormElement>("#search-form");
  const searchInput = document.querySelector<HTMLInputElement>("#search");

  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    renderProducts();
  });

  searchInput?.addEventListener("input", renderProducts);
}

function updateCartCount(): void {
  const cartCount = document.querySelector<HTMLElement>("#cart-count");
  if (cartCount) {
    cartCount.textContent = String(getCartItemsCount());
  }
}