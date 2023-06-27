import { createBrowserRouter } from "react-router-dom";
import { Cadastro } from "../pages/Cadastro";
import { Login } from "../pages/Login";
import { Home } from "../pages/Home";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    children: [],
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
    children: [],
  },
  {
    path: "/home",
    element: <Home />,
    children: [],
  },
]);
