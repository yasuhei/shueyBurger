import { useEffect, useState } from "react";
import logo from "../images/logo.jpeg";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";
import { api } from "../Api";
import { IToken } from "../Types/token";
import axios from "axios";
import { ICep } from "../Types/cep";
import ModalConfirm from "../Components/ModalConfirm";

export function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [complemento, setComplemento] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cep, setCep] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const formatCep = (value: any) => {
    // Remove todos os caracteres não numéricos
    const numericValue = value.replace(/\D/g, "");

    // Formata o valor do CEP
    const formattedCep = numericValue.replace(/(\d{5})(\d{3})/, "$1-$2");

    return formattedCep;
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

  const handleCancel = () => {
    setEmail("");
    setName("");
    setCep("");
    setComplemento("");
    setEndereco("");
    setModalOpen(true);
  };

  useEffect(() => {
    axios.get(`https://viacep.com.br/ws/${cep}/json`).then((response: ICep) => {
      const result = response.data;
      setComplemento(result.complemento);
      setEndereco(result.logradouro);
    });
  }, [cep]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const usuario = {
      name,
      email,
      complemento,
      endereco,
      cep,
    };
    api
      .post("http://localhost:8000/public/registrar", usuario)
      .then((response: IToken) => {
        localStorage.setItem("token", response.data.access_token);
        setEmail("");
        setName("");
        setCep("");
        setComplemento("");
        setEndereco("");

        setModalOpen(true);
        setTimeout(() => {
          setModalOpen(false);
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <section className="">
      <div className="flex justify-center items-center bg-[url('./images/back2.jpg')] ">
        <div className="w-screen h-screen bg-[url('./images/background.jpg')] bg-no-repeat bg-center bg-cover"></div>

        <div className="w-[80%] flex justify-center items-center flex-col ">
          <div className=" border border-gray-200 shadow-md w-8/12 h-full flex flex-col justify-center items-center  rounded-sm bg-white">
            <div className="flex  flex-col justify-center bg-white">
              <div className="flex justify-center items-center flex-col ">
                <img
                  className="w-32 h-32 rounded-sm"
                  src={logo}
                  alt="Your Company"
                />
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Cadastre-se para provar o <br /> melhor do hambúrguer
                  <br />
                  artesanal
                </h2>
              </div>
            </div>

            <form
              action=""
              className="flex flex-col gap-3 justify-center items-center w-full pt-2 "
              onSubmit={handleSubmit}
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
                        value={name}
                        onChange={(event) => setName(event.target.value)}
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
                      label="Cep"
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
                      onChange={(event) => setComplemento(event.target.value)}
                      autoComplete="npes"
                    />
                  </div>
                </Box>
                <div className=" flex justify-around items-center w-full py-5">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </Button>
                  <Button variant="outlined" type="submit">
                    Cadastrar
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ModalConfirm openModal={modalOpen} close={() => setModalOpen(false)} />
    </section>
  );
}
