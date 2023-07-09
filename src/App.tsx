import { RouterProvider } from "react-router";
import { router } from "./routes";
import { Header } from "./Components/Header";

function App() {
  return (
    <>
      <div className=" mx-auto max-w-screen-xl">
        <Header />
        <RouterProvider router={router} />;
      </div>
    </>
  );
}

export default App;
