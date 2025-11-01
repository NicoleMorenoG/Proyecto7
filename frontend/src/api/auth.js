// src/api/auth.js
import api from "./client";

export const signup = async ({ name, email, password }) => {
    const { data } = await api.post("/auth/signup", { name, email, password });
  return data; // { msg, user, token }
};

export const login = async ({ email, password }) => {
    const { data } = await api.post("/auth/login", { email, password });
  return data; // { msg, user, token }
};
