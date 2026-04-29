import type { Rol } from "./rol";

// Esta interfaz se utiliza para definir el tipo de datos que se espera al registrar un nuevo usuario, 
// asegurando que se proporcionen los campos necesarios y que el rol sea uno de los valores permitidos.

export interface IUser {
  email: string;
  password: string;
  role: Rol;
};