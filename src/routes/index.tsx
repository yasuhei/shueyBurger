import { createBrowserRouter } from "react-router-dom";
import { Cadastro } from "../pages/Cadastro";
import { Home } from "../pages/Home";
import { Cardapio } from "../pages/Cardapio";

export const router = createBrowserRouter([
  {
    path: "/cardapio",
    element: <Cardapio />,
    children: [],
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
    children: [],
  },
  {
    path: "/",
    element: <Home />,
    children: [],
  },
]);
