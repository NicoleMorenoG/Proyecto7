// src/api/checkout.js
import api from "./client";

export const createStripeSession = async (items) => {
    const { data } = await api.post("/checkout/stripe/session", { items });
  return data; // { url, id }
};
