import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Loader } from "./Loader";
import { IToken } from "../Types/token";
import { api } from "../Api";
import ModalAlert from "./ModalAlert";
import { ModalProps } from "./ModalConfirm";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalLogin({ openModal, close }: ModalProps) {
  const [open, setOpen] = React.useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  //   const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  React.useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  const handleClose = () => {
    setOpen(false);
    close();
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoader(true);
    const usuario = {
      name,
      email,
    };
    api
      .post("public/login", usuario)
      .then((response: IToken) => {
        localStorage.setItem("token", response.data.access_token);

        setEmail("");
        setName("");
        setTimeout(() => {
          setLoader(false);
          window.location.reload();

          //   navigate("/");
        }, 2000);
      })

      .catch((error) => {
        setMessage(error.response.data.message);
        setAlert(error.response.data.alert);

        setModalOpen(true);
        setTimeout(() => {
          setLoader(false);
          setModalOpen(false);
        }, 3000);

      });
  };

  return (
    <>
      {openModal && (
        <div>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle className="flex justify-center items-center ">
              <p className="text-3xl text-gray-700 pt-4">
                Falta pouco para <br /> matar sua fome !!
              </p>
            </DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-slide-description"
                className="text-center"
              >
                <ModalAlert
                  openModal={modalOpen}
                  close={() => setModalOpen(false)}
                  message={message}
                  alert={alert}
                />
                <form
                  action=""
                  className="flex flex-col gap-3 justify-center items-center w-full pt-2"
                  onSubmit={handleSubmit}
                >
                  <div className="flex justify-center items-center text-center flex-col w-4/5">
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "35ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <div>
                        <TextField
                          label="E-mail"
                          id="outlined-size-small"
                          defaultValue="E-mail"
                          size="small"
                          required
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                        />

                        <FormControl
                          sx={{ m: 1, width: "35ch" }}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-password">
                            Password
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            size="small"
                            required
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            endAdornment={
                              <InputAdornment position="start">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Password"
                          />
                        </FormControl>
                      </div>
                    </Box>
                  </div>
                  <div className=" flex justify-around items-center w-full pb-5">
                    <button
                      type="submit"
                      className="w-[34ch] p-2 text-white text-center font-semibold bg-red-600   rounded-md cursor-pointer hover:bg-red-400 disabled:bg-red-300 disabled:cursor-not-allowed"
                      disabled={(email && name) === ""}
                    >
                      {loader ? <Loader /> : "Entrar"}
                    </button>
                  </div>
                </form>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="error">
                Fechar
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
  );
}
