import { forwardRef, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { useCart } from "./CartContext";
import { Minus, Plus, X } from "lucide-react";
import { Divider } from "@mui/material";

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
}

export default function ModalCart({ openModal, close }: ModalProps) {
  const [open, setOpen] = useState(false);
  const [cont, setCont] = useState(1);
  const taxaService = 0.99;

  const { cartItems } = useCart();

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  const handleDecrement = (index: number) => {
    const updatedItems = [...cartItems];
    if (updatedItems[index].cont > 1) {
      updatedItems[index].cont -= 1;
      setCont(cont - 1);
      updatedItems[index].total =
        updatedItems[index].cont * updatedItems[index].price;
    }
  };

  const handleIncrement = (index: number) => {
    const updatedItems = [...cartItems];
    updatedItems[index].cont += 1;
    setCont(cont + 1);
    updatedItems[index].total =
      updatedItems[index].cont * updatedItems[index].price;
  };

  const handleClose = () => {
    setOpen(false);
    close();
  };

  const getTotalPedido = () => {
    const subtotal = cartItems.reduce((acc, item) => acc + item.total, 0);
    return subtotal + taxaService;
  };

  const handleFinalize = () => {
    cartItems.splice(0, cartItems.length);
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
            <div className="flex justify-between items-center pt-3 pr-4">
              <p className="pl-6 text-gray-900 font-bold">Total do pedido</p>
              <Button onClick={handleClose}>
                <X className="text-red-600" />
              </Button>
            </div>
            <DialogContent className=" w-[600px]">
              <DialogContentText
                id="alert-dialog-slide-description"
                className="text-center"
              >
                <Divider className="text-gray-300" />

                {cartItems.map((item, index) => (
                  <>
                    <div className="flex justify-between items-center w-full">
                      <p className="text-gray-600">
                        {item.cont}x {item.description}
                      </p>
                      <div className=" flex justify-center gap-4 mr-4 mb-2">
                        <div className=" p-3 rounded-md gap-4 flex justify-center w-28 ">
                          <button
                            // disabled={cont <= 1}
                            onClick={() => handleDecrement(index)}
                            className="text-red-600 disabled:text-red-300 disabled:cursor-not-allowed cursor-pointer "
                          >
                            <Minus className=" " />
                          </button>

                          <span className="text-gray-600">
                            {item.total.toFixed(2)}
                          </span>
                          <button onClick={() => handleIncrement(index)}>
                            <Plus className="text-red-600 cursor-pointer" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </DialogContentText>
            </DialogContent>
            <Divider className="text-gray-300" />
            <div className="flex flex-col  w-full justify-center items-center gap-2 px-5 py-4">
              <div className="flex  w-full justify-between items-center">
                <p className="text-sm text-gray-600">Subtotal</p>
                <span className="pr-4 text-gray-600 ">
                  {getTotalPedido().toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
              <div className="flex  w-full justify-between items-center">
                <p className="text-sm text-gray-600">Taxa de serviço</p>
                <span className="pr-4 text-gray-600 ">R$ {taxaService}</span>
              </div>
              <div className="flex  w-full justify-between items-center">
                <p className="text-sm text-gray-600">Taxa de entrega</p>
                <span className="pr-4 text-green-600 ">Grátis</span>{" "}
              </div>
            </div>
            <Divider className="text-gray-300" />

            <DialogActions className="flex flex-col w-full">
              <div className="flex justify-between items-center w-full pr-4">
                <p className="pl-3 text-gray-900 font-bold">Total</p>
                <span className="pr-4 text-gray-900 font-bold">
                  {getTotalPedido().toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
              <button
                className="flex justify-center items-center gap-6 bg-red-600 p-3 text-white rounded-md text-sm disabled:bg-red-400 cursor-pointer disabled:cursor-not-allowed hover:bg-red-500 w-full mt-4"
                onClick={handleFinalize}

                // disabled
              >
                <p className="font-semibold">Finalizar</p>
              </button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
}
