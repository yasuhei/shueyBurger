import { createContext, useState } from "react";
import { CarouselFood } from "../Components/Carousel";

export const UserContext = createContext<string>("");
export function Home() {
  return (
    <>
      <div className=" flex justify-center items-center  h-screen ">
        <CarouselFood />
        {/* <h1 className="text-3xl">Home</h1> */}
      </div>
    </>
  );
}
