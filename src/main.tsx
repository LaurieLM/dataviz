import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./pages/Root"

import Home from "./pages/Home";
import About from "./pages/About";
import Graphics from "./pages/Graphics";
import ErrorPage from "./pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,        // Layout con navbar + Outlet
    errorElement: <ErrorPage />, // Gestione errori automatica React Router
    children: [
      { index: true, element: <Home /> },          // "/" 
      { path: "about", element: <About /> },       // "/about"
      { path: "graphs", element: <Graphics /> },   // "/graphs"
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
