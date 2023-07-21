import { createContext, useEffect, useState } from "react";
import { CarouselFood } from "../Components/Carousel";
import { Delivery } from "../Components/Delivery";
import { ExplorerCity } from "../Components/ExplorerCity";

export const UserContext = createContext<string>("");
export function Home() {
  return (
    <>
      <main className="pb-4">
        <h1 className="text-5xl text-gray-600 uppercase leading-tight text-center py-8">
          Os mais pedidos <br /> da semana
        </h1>
        <div className=" flex justify-center items-center  ">
          <CarouselFood />
        </div>
        <div className="w-full flex justify-center items-center my-20">
          <button className="w-96 bg-red-600 text-white py-8  rounded-md hover:bg-red-400">
            Quero um desses meu chapa!!
          </button>
        </div>

        <Delivery />
        <ExplorerCity />
      </main>
    </>
  );
}
