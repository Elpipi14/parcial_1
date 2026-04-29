import Swal from "sweetalert2";
import { loginUser } from "../../../utils/auth";

export function initLogin(): void {
  const form = document.querySelector<HTMLFormElement>("#login-form");
  if (!form) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const emailInput = document.querySelector<HTMLInputElement>("#email");
    const passwordInput = document.querySelector<HTMLInputElement>("#password");

    if (!emailInput || !passwordInput) return;

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      await Swal.fire({
        icon: "error",
        title: "Missing fields",
        text: "Complete email and password.",
      });
      return;
    }

    const result = loginUser(email, password);

    if (!result.ok || !result.user) {
      await Swal.fire({
        icon: "error",
        title: "Login error",
        text: result.message,
      });
      return;
    }

    await Swal.fire({
      icon: "success",
      title: "Welcome",
      text: "Login successful.",
    });

    window.location.href = result.user.role === "admin" ? "/src/pages/admin/admin.html" : "/";
  });
}

document.addEventListener("DOMContentLoaded", initLogin);
