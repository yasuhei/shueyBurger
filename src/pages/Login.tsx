import { useState } from "react";
import logo from "../images/logo.jpeg";
import axios from "axios";
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

interface IToken {
  data: { access_token: string };
}
export function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const handleCancel = () => {
    setEmail("");
    setName("");
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const usuario = {
      name,
      email,
    };
    api
      .post("http://localhost:8000/public/registrar", usuario)
      .then((response: IToken) => {
        localStorage.setItem("token", response.data.access_token);
        setEmail("");
        setName("");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <section className="">
        <div className="flex justify-center items-center ">
          <div className="w-screen h-screen bg-[url('./images/background.jpg')] bg-no-repeat bg-center bg-cover"></div>

          <div className="w-[80%] flex justify-center items-center flex-col ">
            <div className=" border border-gray-200 shadow-md w-6/12 h-full flex flex-col justify-center items-center  rounded-sm">
              <div className="flex  flex-col justify-center ">
                <div className="flex justify-center items-center flex-col">
                  <img
                    className="w-32 h-32 rounded-sm"
                    src={logo}
                    alt="Your Company"
                  />
                  <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Falta pouco para <br /> matar sua fome!
                  </h2>
                </div>
              </div>

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
                    </div>
                  </Box>
                </div>
                <div className=" flex justify-around items-center w-full pb-5">
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </Button>
                  <Button variant="outlined" type="submit">
                    Entrar
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
