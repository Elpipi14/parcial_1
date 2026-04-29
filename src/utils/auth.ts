import type { IUser } from "../types/IUser";
import type { Rol } from "../types/rol";

const USERS_KEY = "users";
const USER_DATA_KEY = "userData";

type AuthResult = {
  ok: boolean;
  message: string;
  user?: IUser;
};

function parseUsers(data: string | null): IUser[] {
  if (!data) return [];

  try {
    return JSON.parse(data) as IUser[];
  } catch {
    localStorage.removeItem(USERS_KEY);
    return [];
  }
}

export function getUsers(): IUser[] {
  return parseUsers(localStorage.getItem(USERS_KEY));
}

export function saveUsers(users: IUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function registerUser(
  email: string,
  password: string,
  role: Rol = "client"
): AuthResult {
  const normalizedEmail = email.trim().toLowerCase();
  const users = getUsers();

  const userExists = users.some((user) => user.email === normalizedEmail);

  if (userExists) {
    return {
      ok: false,
      message: "That email is already registered.",
    };
  }

  const newUser: IUser = {
    email: normalizedEmail,
    password,
    role,
  };

  saveUsers([...users, newUser]);

  return {
    ok: true,
    message: "User registered successfully.",
    user: newUser,
  };
}

export function loginUser(email: string, password: string): AuthResult {
  const normalizedEmail = email.trim().toLowerCase();

  const foundUser = getUsers().find(
    (user) => user.email === normalizedEmail && user.password === password
  );

  if (!foundUser) {
    return {
      ok: false,
      message: "Invalid email or password.",
    };
  }

  localStorage.setItem(USER_DATA_KEY, JSON.stringify(foundUser));

  return {
    ok: true,
    message: "Login successful.",
    user: foundUser,
  };
}

export function getCurrentUser(): IUser | null {
  const data = localStorage.getItem(USER_DATA_KEY);

  if (!data) return null;

  try {
    return JSON.parse(data) as IUser;
  } catch {
    localStorage.removeItem(USER_DATA_KEY);
    return null;
  }
}

export function isLoggedIn(): boolean {
  return getCurrentUser() !== null;
}

export function logout(): void {
  localStorage.removeItem(USER_DATA_KEY);
}