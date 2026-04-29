import Swal from 'sweetalert2';
import '../../../style.css';
import { initNavbar } from '../../../sections/navBar/navBar';
import { isLoggedIn } from '../../../utils/auth';
import {
  calculateCartTotal,
  clearCart,
  getCart,
  getCartItemsCount,
  removeFromCart,
  updateCartItemQuantity,
} from '../../../utils/cart';

function formatPrice(price: number): string {
  return `$ ${price.toLocaleString('es-AR')}`;
}

function updateCartCount(): void {
  const cartCount = document.querySelector<HTMLElement>('#cart-count');
  if (cartCount) cartCount.textContent = String(getCartItemsCount());
}

function renderCart(): void {
  const container = document.querySelector<HTMLElement>('#cart-container');
  const totalContainer = document.querySelector<HTMLElement>('#cart-total');
  const clearButton = document.querySelector<HTMLButtonElement>('#clear-cart-btn');

  if (!container || !totalContainer || !clearButton) return;

  const cart = getCart();
  updateCartCount();

  if (cart.length === 0) {
  container.innerHTML = `
    <div class="empty-cart-wrapper">
      <p class="empty-cart">Your cart is empty.</p>

      <a href="../home/home.html"" class="back-home-btn">
        Back to Products
      </a>
    </div>
  `;

  totalContainer.textContent = "Total: $ 0";
  clearButton.classList.add("hidden");
  return;
}

  clearButton.classList.remove('hidden');
  container.innerHTML = '';

  cart.forEach((item) => {
    const article = document.createElement('article');
    article.classList.add('cart-item');

    article.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div>
        <h2>${item.name}</h2>
        <p>Price: ${formatPrice(item.price)}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Subtotal: ${formatPrice(item.price * item.quantity)}</p>
      </div>
      <div class="cart-actions">
        <button type="button" class="decrease-btn">-</button>
        <button type="button" class="increase-btn">+</button>
        <button type="button" class="remove-btn">Remove</button>
      </div>
    `;

    article.querySelector<HTMLButtonElement>('.decrease-btn')?.addEventListener('click', () => {
      updateCartItemQuantity(item.productId, item.quantity - 1);
      renderCart();
    });

    article.querySelector<HTMLButtonElement>('.increase-btn')?.addEventListener('click', () => {
      updateCartItemQuantity(item.productId, item.quantity + 1);
      renderCart();
    });

    article.querySelector<HTMLButtonElement>('.remove-btn')?.addEventListener('click', () => {
      removeFromCart(item.productId);
      renderCart();
    });

    container.appendChild(article);
  });

  totalContainer.textContent = `Total: ${formatPrice(calculateCartTotal(cart))}`;
}

function initCartPage(): void {
  initNavbar();

  if (!isLoggedIn()) {
    window.location.href = '/src/pages/auth/login/login.html';
    return;
  }

  renderCart();

  document.querySelector<HTMLButtonElement>('#clear-cart-btn')?.addEventListener('click', async () => {
    const result = await Swal.fire({
      title: 'Clear cart?',
      text: 'All products will be removed.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, clear it',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      clearCart();
      renderCart();
    }
  });
}

document.addEventListener('DOMContentLoaded', initCartPage);
