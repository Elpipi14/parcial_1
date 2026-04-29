import Swal from "sweetalert2";
import { registerUser } from "../../../utils/auth";
import type { Rol } from "../../../types/rol";

// Aca hacemos toda la logica de registro, obteniendo los datos del formulario, validandolos y llamando a la funcion registerUser para 
// registrar el nuevo usuario.
// En esta funcion escuchamos el submit del formulario, prevenimos su comportamiento por defecto, 
// obtenemos los valores de los campos email, password y role,
// validamos que no estén vacíos y que la contraseña tenga al menos 8 caracteres,
// si hay algún error, mostramos un mensaje de error usando SweetAlert2 y salimos de la función. 
// Si todo es correcto, llamamos a la función registerUser con los datos obtenidos y mostramos un mensaje de éxito o error según el resultado. 
// Finalmente, redirigimos al usuario a la página de login.

export function initRegister(): void {
  const form = document.querySelector<HTMLFormElement>("#register-form");
  if (!form) return;
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const emailInput = document.querySelector<HTMLInputElement>("#email");
    const passwordInput = document.querySelector<HTMLInputElement>("#password");
    const roleSelect = document.querySelector<HTMLSelectElement>("#select-role");

    if (!emailInput || !passwordInput || !roleSelect) return;

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const role = roleSelect.value as Rol;

    if (!email || !password || !role) {
      await Swal.fire({
        icon: "error",
        title: "Campos incompletos",
        text: "Completá todos los campos."
      });
      return;
    }

    if (password.length < 8) {
      await Swal.fire({
        icon: "error",
        title: "Contraseña inválida",
        text: "La contraseña debe tener al menos 8 caracteres."
      });
      return;
    }

    const result = registerUser(email, password, role);

    if (!result.ok) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: result.message
      });
      return;
    }

    await Swal.fire({
      icon: "success",
      title: "Registro exitoso",
      text: result.message
    });

    window.location.href = "/src/pages/auth/login/login.html";
  });
};

document.addEventListener("DOMContentLoaded", initRegister);