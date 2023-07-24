import { Divider } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { Minus, Plus, X } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import { CartItem, useCart } from "./CartContext";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface ModalProps {
  openModal: boolean;
  close: () => void;
  description: string;
  price: number;
  condimentacao: string;
  img: string;
}

export default function ModalQuantity({
  openModal,
  close,
  description,
  price,
  condimentacao,
  img,
}: ModalProps) {
  const [open, setOpen] = useState(false);
  const [cont, setCont] = useState(1);
  const { addToCart } = useCart();
  const [isLogged, setIsLogged] = useState(localStorage.getItem("token"));

  useEffect(() => {
    setOpen(openModal);
    setCont(1);
  }, [openModal]);

  const handleClose = () => {
    setOpen(false);
    close();
  };

  const handleIncrement = () => {
    setCont(cont + 1);
  };
  const handleDecrement = () => {
    setCont(cont - 1);
  };

  const total = price * cont;

  const handleAddToCart = () => {
    const item: CartItem = {
      description,
      condimentacao,
      total,
      price,
      cont,
    };

    addToCart(item);
    handleClose();
  };

  return (
    <>
      {openModal && (
        <div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <div className="flex justify-end items-center w-full pt-3 ">
              <Button onClick={handleClose}>
                <X className="text-red-600" />
              </Button>
            </div>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-slide-description"
                className="text-center"
              >
                <Divider className="text-gray-300" />

                <div className="flex justify-center items-center   h-[300px]">
                  <div className="mr-9">
                    <img
                      src={img}
                      alt="imagem do lanche"
                      className="w-full rounded-md "
                    />
                  </div>

                  <div className="flex justify-center items-center flex-col ">
                    <p className="text-3xl font-bold mb-6 ">{description}</p>

                    <p>{condimentacao}</p>
                  </div>
                </div>
              </DialogContentText>
            </DialogContent>
            <Divider className="text-gray-300" />
            <DialogActions>
              <div className=" flex justify-center gap-4 mr-4 mb-2">
                <div className="border border-gray-300 p-3 rounded-md gap-4 flex justify-center w-28 ">
                  <button
                    disabled={cont <= 1}
                    onClick={handleDecrement}
                    className="text-red-600 disabled:text-red-300 disabled:cursor-not-allowed cursor-pointer "
                  >
                    <Minus className=" " />
                  </button>

                  <span className="w-7">{cont}</span>
                  <button onClick={handleIncrement}>
                    <Plus className="text-red-600 cursor-pointer" />
                  </button>
                </div>
                <button
                  className="flex justify-center items-center gap-6 bg-red-600 p-3 text-white rounded-md text-sm disabled:bg-red-400 cursor-pointer disabled:cursor-not-allowed hover:bg-red-500"
                  onClick={handleAddToCart}
                  disabled={!isLogged}
                  title={
                    isLogged?.length
                      ? "Você deve fazer o login para comprar"
                      : ""
                  }
                >
                  <p className="font-semibold">Adicionar</p>
                  <p className="font-bold w-20">
                    {total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </button>
              </div>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
}
