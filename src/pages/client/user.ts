import Swal from "sweetalert2";
import { getCurrentUser, logout } from "../../utils/auth";
import type { IUser } from "../../types/IUser";

function initUserPanel(): void {
  const currentUser = getCurrentUser();

  if (!currentUser) {
    window.location.href = "/src/pages/auth/login/login.html";
    return;
  }

  renderProfile(currentUser);
  renderOrders();
  initLogoutButton();
  initEditForm(currentUser);
}

function renderProfile(user: IUser): void {
  const emailSpan = document.querySelector<HTMLElement>("#profile-email");
  const roleSpan = document.querySelector<HTMLElement>("#profile-role");

  if (emailSpan) emailSpan.textContent = user.email;
  if (roleSpan) roleSpan.textContent = user.role;
}

function renderOrders(): void {
  const ordersList = document.querySelector<HTMLElement>("#orders-list");
  if (!ordersList) return;

  const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  if (!Array.isArray(orders) || orders.length === 0) {
    ordersList.innerHTML = `<p class="empty-message">You have no orders yet.</p>`;
    return;
  }

  ordersList.innerHTML = orders
    .map(
      (order: { productName: string; quantity: number; total: number }) => `
        <div class="order-item">
          <p><strong>Product:</strong> ${order.productName}</p>
          <p><strong>Quantity:</strong> ${order.quantity}</p>
          <p><strong>Total:</strong> $${order.total}</p>
        </div>
      `
    )
    .join("");
}

function initLogoutButton(): void {
  const logoutBtn = document.querySelector<HTMLButtonElement>("#profile-logout-btn");

  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", () => {
    logout();
    window.location.href = "/";
  });
}

function initEditForm(currentUser: IUser): void {
  const form = document.querySelector<HTMLFormElement>("#edit-user-form");
  const emailInput = document.querySelector<HTMLInputElement>("#new-email");
  const passwordInput = document.querySelector<HTMLInputElement>("#new-password");

  if (!form || !emailInput || !passwordInput) return;

  emailInput.value = currentUser.email;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newEmail = emailInput.value.trim();
    const newPassword = passwordInput.value.trim();

    if (!newEmail) {
      await Swal.fire({
        icon: "error",
        title: "Invalid email",
        text: "Email cannot be empty.",
      });
      return;
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]") as IUser[];

    const emailAlreadyExists = users.some(
      (user) => user.email === newEmail && user.email !== currentUser.email
    );

    if (emailAlreadyExists) {
      await Swal.fire({
        icon: "error",
        title: "Email in use",
        text: "That email is already registered.",
      });
      return;
    }

    const updatedUsers = users.map((user) => {
      if (user.email === currentUser.email) {
        return {
          ...user,
          email: newEmail,
          password: newPassword ? newPassword : user.password,
        };
      }

      return user;
    });

    const updatedUser: IUser = {
      ...currentUser,
      email: newEmail,
      password: newPassword ? newPassword : currentUser.password,
    };

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("userData", JSON.stringify(updatedUser));

    renderProfile(updatedUser);
    passwordInput.value = "";

    await Swal.fire({
      icon: "success",
      title: "Updated",
      text: "Your profile was updated successfully.",
    });
  });
}

document.addEventListener("DOMContentLoaded", initUserPanel);