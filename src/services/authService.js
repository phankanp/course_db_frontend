import { AUTH_SERVER_URL } from "../constants";
import http from "../services/httpService";

const loginApiEndpoint = AUTH_SERVER_URL + "login";
const registerApiEndpoint = AUTH_SERVER_URL + "register";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: loginResponse } = await http.post(loginApiEndpoint, {
    email,
    password
  });

  localStorage.setItem("token", loginResponse.token);
  localStorage.setItem("firstName", loginResponse.firstName);
  localStorage.setItem("lastName", loginResponse.lastName);
}

export function register(
  firstName,
  lastName,
  email,
  password,
  confirmPassword
) {
  return http.post(registerApiEndpoint, {
    firstName,
    lastName,
    email,
    password,
    confirmPassword
  });
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("firstName");
  localStorage.removeItem("lastName");
}

export function getCurrentUser() {
  if (localStorage.firstName !== undefined) {
    const user = {
      firstName: localStorage.firstName,
      lastName: localStorage.lastName
    };
    return user;
  } else {
    return null;
  }
}

export function getJwt() {
  return "Bearer " + localStorage.token;
}

export default {
  login,
  logout,
  getCurrentUser,
  getJwt
};
