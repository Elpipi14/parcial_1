# Food Store - Evaluación 1 Programación III

## Descripción General

Food Store es una aplicación frontend desarrollada como evolución del proyecto trabajado durante los Trabajos Prácticos de HTML, CSS, JavaScript y TypeScript de la materia Programación III.

El objetivo principal de esta entrega fue extender la aplicación base incorporando funcionalidades dinámicas de interacción con el catálogo de productos y un carrito de compras persistente, aplicando manipulación del DOM, tipado con TypeScript y almacenamiento local mediante localStorage.

---

## Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript
- TypeScript
- Vite
- SweetAlert2

---

## Funcionalidades Implementadas

### Catálogo Dinámico de Productos

- Renderizado dinámico de productos desde un archivo `data.ts`.
- Generación automática de cards de productos mediante TypeScript.
- Vista de detalle individual de producto.

### Búsqueda y Filtrado

- Búsqueda en tiempo real por nombre de producto.
- Filtrado dinámico por categoría desde menú lateral.
- Posibilidad de volver a visualizar el catálogo completo mediante categoría **All**.
- Mensaje visual cuando no existen coincidencias.

### Carrito de Compras

- Agregado de productos desde catálogo y vista detalle.
- Persistencia completa mediante `localStorage`.
- Actualización automática de cantidad si el producto ya existe.
- Eliminación individual de productos.
- Vaciado completo del carrito.
- Cálculo dinámico de subtotal y total general.
- Vista específica para carrito vacío.

### Autenticación Simulada

- Registro de usuarios con persistencia en `localStorage`.
- Inicio y cierre de sesión.
- Protección de rutas/vistas según autenticación.
- Roles de prueba (`admin` / `client`) para testing de navegación.

---

## Estructura del Proyecto

```text
src/
├── data/
│   └── data.ts
│
├── pages/
│   ├── store/
│   │   ├── home/
│   │   ├── cart/
│   │   └── products/
│   │
│   ├── auth/
│   ├── admin/
│   └── client/
│
├── sections/
│   ├── categories/
│   ├── navBar/
│   └── products/
│
├── types/
│   ├── product.ts
│   ├── category.ts
│   ├── IUser.ts
│   └── rol.ts
│
├── utils/
│   ├── auth.ts
│   ├── cart.ts
│   └── store.ts
```

---

## Instalación

Clonar el repositorio / descomprimir proyecto y ejecutar:

```bash
pnpm install
```

---

## Ejecutar en Desarrollo

```bash
pnpm run dev
```

Servidor local:

```text
http://localhost:5173
```

---

## Build de Producción

```bash
pnpm run build
```

Para previsualizar el build generado:

```bash
pnpm run preview
```

---

## Consideraciones Técnicas

- El proyecto fue desarrollado sin frameworks, respetando la consigna de utilizar únicamente HTML, CSS, JavaScript y TypeScript.
- Se utilizó Vite como bundler/base de desarrollo.
- Toda la lógica de persistencia se maneja en frontend mediante `localStorage`.
- No se implementa backend ni checkout real, conforme a la consigna.

---

## Credenciales / Testing

Para facilitar pruebas de corrección:

### Usuario Administrador

Puede registrarse seleccionando rol **admin** en el formulario de registro.

### Usuario Cliente

Puede registrarse seleccionando rol **client**.

> La selección de rol en registro se dejó habilitada únicamente con fines de prueba académica.

---

## Video de Presentación

El link al video explicativo se encuentra adjunto en el archivo `.txt` solicitado por la consigna.
LINK DEL VIDEO
https://www.youtube.com/watch?v=RtHwgUYaOtw

---

## Autor

**Andrés Piuzzi**

Evaluación 1 – Programación III  
Tecnicatura Universitaria en Programación a Distancia
