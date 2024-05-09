import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import ModalLogin from "./ModalLogin";
import { ModalCadastro } from "./ModalCadastro";
import { ShoppingCart, LogOut } from "lucide-react";
import ModalCart from "./Cart";
import { Badge } from "@mui/material";
import { useCart } from "./CartContext";

export function Header() {
  const [openNav, setOpenNav] = useState(false);
  const [isLogged, setIsLogged] = useState(localStorage.getItem("token"));
  const [openLogin, setOpenLogin] = useState(false);
  const [openCartModal, setOpenCartModal] = useState(false);
  const [openCadastro, setOpenCadastro] = useState(false);

  const { cartItems } = useCart();
  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const handleCadastro = () => {
    setOpenCadastro(true);
  };

  const handleLogin = () => {
    setOpenLogin(true);
  };

  const handleGoOut = () => {
    window.location.reload();

    localStorage.clear();
  };
  const handleOpenCart = () => {
    setOpenCartModal(true);
  };

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6  ">
      <Typography as="li" variant="small"  color="blue-gray" className="p-1 font-normal">
        <a href="cardapio" className="flex items-center text-gray-600 font-semibold">
          Cardápio
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center text-gray-600 font-semibold">
          Promoções
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center text-gray-600 font-semibold">
          Onde estamos
        </a>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="mx-auto max-w-screen-xl py-2 px-4 lg:px-8 lg:py-4 border-none  shadow-sm bg-transparent">
      <ModalLogin openModal={openLogin} close={() => setOpenLogin(false)} />;
      <ModalCart
        close={() => setOpenCartModal(false)}
        openModal={openCartModal}
      />
      <ModalCadastro
        openModal={openCadastro}
        close={() => setOpenCadastro(false)}
      />
      <div className="container mx-auto flex items-center justify-between pt-3">
        {/* <img src={logo} alt="" className="w-10 h-10" /> */}
        <a href="/" className="text-red-600 font-semibold">
          Shuey Burguer
        </a>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex justify-center items-center gap-4">
          {isLogged ? (
            <>
              <button onClick={handleOpenCart}>
                <Badge
                  badgeContent={cartItems.length}
                  className="text-red-600 rounded-full  "
                >
                  <ShoppingCart className=" cursor-pointer mr-2" />
                </Badge>
              </button>
              <LogOut
                className="text-red-600 cursor-pointer"
                onClick={handleGoOut}
              />
            </>
          ) : (
            <>
              <button
                className="cursor-pointer text-red-600 font-semibold"
                onClick={handleCadastro}
              >
                Criar conta
              </button>

              <button
                className="p-2 text-white text-center font-semibold bg-red-600 w-24  rounded-md cursor-pointer hover:bg-red-400"
                onClick={handleLogin}
              >
                Entrar
              </button>
            </>
          )}
        </div>
{/* 
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton> */}
      </div>
      {/* <MobileNav open={openNav}>
        <div className="container mx-auto">
          {navList}
          <Button
            variant="gradient"
            size="sm"
            fullWidth
            className="mb-2 bg-blue-300"
          >
            <span>Buy Now</span>
          </Button>
        </div>
      </MobileNav> */}
    </Navbar>
  );
}
