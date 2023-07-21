import { Divider } from "@mui/material";
import { estadosDoBrasil } from "../utils/citys";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export function ExplorerCity() {
  return (
    <div className="w-full flex justify-center items-center py-9 ">
      <div className="w-full pl-8">
        <h3 className="text-gray-800 text-xl py-7">Explore por cidades</h3>
        <ul className="grid grid-cols-4 gap-4 w-full">
          {estadosDoBrasil.map((state: string) => (
            <li className="text-gray-600">{state}</li>
          ))}
        </ul>
        <Divider className="text-gray-600 py-4" />
        <div className="grid grid-cols-4 gap-3">
          <div>
            <h3 className="text-gray-800 text-md py-7">Shuey Burguer</h3>
            <ul className="grid grid-cols-1 gap-4 w-full">
              <li className="text-gray-600">Site Institucional</li>
              <li className="text-gray-600">Fale Conosco</li>
              <li className="text-gray-600">Carreiras</li>
              <li className="text-gray-600">Shuey Burguer Internacional</li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-800 text-md py-7">Descubra</h3>
            <ul className="grid grid-cols-1 gap-4 w-full">
              <li className="text-gray-600">Seja um Franqueado</li>
              <li className="text-gray-600">Shuey Shop</li>
              <li className="text-gray-600">Shuey Card</li>
              <li className="text-gray-600">Blog Shuey Empresas</li>
            </ul>
          </div>
          <div>
            <h3 className="text-gray-800 text-md py-7">Redes Sociais</h3>
            <ul className="flex justify-start items-center gap-4 w-full">
              <li className="text-gray-600">
                <Facebook />
              </li>
              <li className="text-gray-600">
                <Twitter />
              </li>
              <li className="text-gray-600">
                <Youtube />
              </li>
              <li className="text-gray-600">
                <Instagram />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
