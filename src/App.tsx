import { Outlet, RouterProvider } from "react-router";
import { router } from "./routes";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { CartProvider } from "./Components/CartContext";

function App() {
  return (
    <>
      <CartProvider>
        <div className=" mx-auto max-w-screen-xl ">
          <Header />
          <Outlet />
          <RouterProvider router={router} />
          <Footer />
        </div>
      </CartProvider>
    </>
  );
}

export default App;
