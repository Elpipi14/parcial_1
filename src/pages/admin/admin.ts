import { protectRoutes } from "../../utils/guards";
import { initNavbar } from "../../sections/navBar/navBar";
import { logout } from "../../utils/auth";

function initAdminPage(): void {
  protectRoutes();
  initNavbar();

  initLogoutButton();
}

function initLogoutButton(): void {
  const logoutButton = document.querySelector<HTMLButtonElement>("#profile-logout-btn");

  if (!logoutButton) return;

  logoutButton.addEventListener("click", () => {
    logout();
    window.location.href = "/";
  });
}

document.addEventListener("DOMContentLoaded", initAdminPage);