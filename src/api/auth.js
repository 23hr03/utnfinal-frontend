import api from "./api";

export const loginRequest = (email, password) => {
  return api.post("/auth/login", { email, password });
};

export const registerRequest = (data) => {
  return api.post("/auth/register", data);
};
