import { getCurrentUser, logout } from "../../utils/auth";

export function initNavbar(): void {
  const userLink = document.querySelector<HTMLAnchorElement>("#user-link");
  const dropdown = document.querySelector<HTMLElement>("#user-dropdown");
  const profileLink = document.querySelector<HTMLAnchorElement>("#profile-link");
  const logoutButton = document.querySelector<HTMLButtonElement>("#logout-button");
  const userMenuContainer = document.querySelector<HTMLElement>("#user-menu-container");
  const adminNavItem = document.querySelector<HTMLElement>("#admin-nav-item");

  if (!userLink || !dropdown || !profileLink || !logoutButton || !userMenuContainer) return;

  const currentUser = getCurrentUser();

  if (!currentUser) {
    dropdown.classList.add("hidden");
    userLink.href = "/src/pages/auth/login/login.html";

    if (adminNavItem) {
      adminNavItem.classList.add("hidden");
    }

    return;
  }

  userLink.href = "#";

  if (currentUser.role === "admin") {
    profileLink.href = "/src/pages/client/user.html";

    if (adminNavItem) {
      adminNavItem.classList.remove("hidden");
    }
  } else {
    profileLink.href = "/src/pages/client/user.html";

    if (adminNavItem) {
      adminNavItem.classList.add("hidden");
    }
  }

  userLink.addEventListener("click", (e) => {
    e.preventDefault();
    dropdown.classList.toggle("hidden");
  });

  logoutButton.addEventListener("click", () => {
    logout();
    window.location.href = "/";
  });

  document.addEventListener("click", (event) => {
    const target = event.target as Node;
    if (!userMenuContainer.contains(target)) {
      dropdown.classList.add("hidden");
    }
  });
}