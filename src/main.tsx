import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/ReactHookForm/Login/LoginPage";
import ToDoListPage from "./pages/Recoil/ToDoList/ToDoListPage";
import UseEffectPage from "./pages/ReactHook/UseEffectPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/todolist",
    element: <ToDoListPage />,
  },
  {
    path: "/react-hook",
    element: <UseEffectPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
