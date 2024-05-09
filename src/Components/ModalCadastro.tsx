import { forwardRef, useEffect, useState } from "react";
import { ModalProps } from "./ModalConfirm";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Slide,
  TextField,
} from "@mui/material";
import { Loader } from "./Loader";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { TransitionProps } from "@mui/material/transitions";
import { api } from "../Api";
import { IToken } from "../Types/token";
import axios from "axios";
import { ICep } from "../Types/cep";
import ModalAlert from "./ModalAlert";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function ModalCadastro({ openModal, close }: ModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [complemento, setComplemento] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cep, setCep] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [message, setMessage] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const formatCep = (value: any) => {
    const numericValue = value.replace(/\D/g, "");
    const formattedCep = numericValue.replace(/(\d{5})(\d{3})/, "$1-$2");
    return formattedCep;
  };

  useEffect(() => {
    setOpen(openModal);
  }, [openModal]);

  const handleClose = () => {
    setOpen(false);
    close();
  };

  const handleChange = (event: any) => {
    const formattedValue = formatCep(event.target.value);
    setCep(formattedValue);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    axios.get(`https://viacep.com.br/ws/${cep}/json`).then((response: ICep) => {
      const result = response.data;
      setComplemento(result.complemento);
      setEndereco(result.logradouro);
    });
  }, [cep]);

  const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoader(true);

    const usuario = {
      email,
      password,
      cep,
      complemento,
      endereco,
      name,
    };
    api
      .post("http://localhost:3000/public/registrar", usuario)
      .then((response: IToken) => {
        localStorage.setItem("token", response.data.access_token);
        setMessage(response.data.message);
        setEmail("");
        setPassword("");
        setCep("");
        setComplemento("");
        setEndereco("");
        setName("");

        setModalOpen(true);
        setTimeout(() => {
          setModalOpen(false);
          setOpen(false);

          //   navigate("/login");
          setLoader(false);
        }, 2000);
      })
      .catch((error) => {
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
              <div className="flex justify-center items-center flex-col ">
                <h2 className="mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-gray-600">
                  Cadastre-se para provar o <br /> melhor do hambúrguer
                  <br />
                  artesanal
                </h2>
              </div>
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
                />
                <form
                  action=""
                  className="flex flex-col gap-3 justify-center items-center w-full pt-2 "
                  onSubmit={handleSubmitForm}
                  autoComplete="npes"
                >
                  <div className="flex justify-center items-center text-center flex-col w-4/5">
                    <Box
                      component="form"
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "38ch" },
                      }}
                      noValidate
                      autoComplete="npes"
                    >
                      <div>
                        <TextField
                          label="Nome"
                          id="outlined-size-small"
                          defaultValue="Nome"
                          size="small"
                          required
                          type="nome"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          autoComplete="npes"
                        />
                        <TextField
                          label="E-mail"
                          id="outlined-size-small"
                          defaultValue="E-mail"
                          size="small"
                          required
                          type="email"
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
                          autoComplete="npes"
                        />

                        <FormControl
                          sx={{ m: 1, width: "38ch" }}
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
                            value={password}
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                            endAdornment={
                              <InputAdornment position="end">
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
                        <TextField
                          label="cep"
                          id="outlined-size-small"
                          defaultValue="Cep"
                          size="small"
                          required
                          type="text"
                          value={cep}
                          onChange={handleChange}
                          autoComplete="npes"
                        />
                        <TextField
                          label="Endereço"
                          id="outlined-size-small"
                          defaultValue="Endereço"
                          size="small"
                          required
                          type="text"
                          value={endereco}
                          onChange={(event) => setEndereco(event.target.value)}
                          autoComplete="npes"
                        />
                        <TextField
                          label="Complemento"
                          id="outlined-size-small"
                          defaultValue="Complemento"
                          size="small"
                          type="text"
                          value={complemento}
                          onChange={(event) =>
                            setComplemento(event.target.value)
                          }
                          autoComplete="npes"
                        />
                      </div>
                    </Box>
                    <div className=" flex justify-around items-center w-full pt-2">
                      <button
                        type="submit"
                        className="w-[37ch] p-2 text-white text-center font-semibold bg-red-600  rounded-md cursor-pointer hover:bg-red-400 disabled:bg-red-300 disabled:cursor-not-allowed"
                        disabled={email === ""}
                      >
                        {loader ? <Loader /> : "Entrar"}
                      </button>
                    </div>
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
