// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import Layout from "./components/Layout.jsx";

// Pages
import Products from "./pages/Products.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import Cart from "./pages/Cart.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Success from "./pages/Success.jsx";
import Cancel from "./pages/Cancel.jsx";

// Context
import { CartProvider } from "./context/CartContext.jsx";

// Router 
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // <- Layout con <Outlet/>
    // errorElement opcional: <ErrorPage />
    children: [
      { index: true, element: <Products /> },
      { path: "product/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "success", element: <Success /> },
      { path: "cancel", element: <Cancel /> },
      // fallback opcional:
      // { path: "*", element: <Products /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </React.StrictMode>
);
