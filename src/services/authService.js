import { AUTH_SERVER_URL } from "../constants";
import http from "../services/httpService";

const loginApiEndpoint = AUTH_SERVER_URL + "login";
const registerApiEndpoint = AUTH_SERVER_URL + "register";

export function login(email, password) {
  http.post(loginApiEndpoint, { email, password });
}

export function register(
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) {
  http.post(registerApiEndpoint, {
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  });
}
