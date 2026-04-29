import { getCurrentUser } from "./auth";

//Aca se maneja la proteccion de rutas, se verifica el path actual y el usuario logueado, y se redirige segun corresponda.
//cada funcion de proteccion de rutas se encarga de verificar si el usuario tiene acceso a la ruta actual, 
// y si no, redirige al usuario a la pagina correspondiente (login, admin o client).

export function protectRoutes(): void {
  const path = window.location.pathname;
  const user = getCurrentUser();

  const isAdminRoute = path.includes("/src/pages/admin/");
  const isUserRoute = path.includes("/src/pages/client/");
  const isAuthRoute =
    path.includes("/src/pages/auth/login/") ||
    path.includes("/src/pages/auth/register/");

  if (!user) {
    if (isAdminRoute || isUserRoute) {
      window.location.href = "/src/pages/auth/login/login.html";
    }
    return;
  }

  if (isAuthRoute) {
    if (user.role === "admin") {
      window.location.href = "/src/pages/admin/admin.html";
    } else {
      window.location.href = "/src/pages/client/user.html";
    }
    return;
  }

  if (isAdminRoute && user.role !== "admin") {
    window.location.href = "/src/pages/client/user.html";
    return;
  }

  if (isUserRoute && user.role !== "client") {
    window.location.href = "/src/pages/admin/admin.html";
    return;
  }
}