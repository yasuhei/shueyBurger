import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";

function App() {
  return (
    <>
      <div className=" mx-auto max-w-screen-xl ">
        <Header />
        <RouterProvider router={router} />
        <Footer />
      </div>
    </>
  );
}

export default App;
