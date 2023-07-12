import { useEffect, useState } from "react";
import { api } from "../Api";
import { IFood } from "../interfaces/Ifood";
import { imagens, refris } from "../utils/Images";
import { Description } from "../Components/Description";

export function Cardapio() {
  const [food, setFood] = useState<IFood[]>([]);

  useEffect(() => {
    api
      .get<IFood[]>("/public/foods")
      .then((response) => setFood(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <h1 className="text-center text-2xl text-gray-600 w-full uppercase font-semibold py-5">
        Os lanches tops das galáxias
      </h1>

      <div className="flex justify-center items-center h-auto py-4">
        <div className="grid grid-cols-2 items-center justify-center w-full ">
          {food[0]?.foods.map((item, index) => (
            // <div
            //   className=" shadow-sm hover:shadow-xl border border-gray-200 rounded-md h-48 gap-4 m-2"

            // >
            <Description
              key={item.id}
              description={item.description}
              price={item.price}
              condimentacao={item.condimentacao}
              img={imagens}
              index={index}
            />
            // </div>
          ))}
        </div>
      </div>

      <h1 className="text-center text-2xl text-gray-600 w-full uppercase font-semibold py-5 ">
        As bebidas mais refrescantes das galáxias
      </h1>

      <div className="flex justify-center items-center h-auto py-4 ">
        <div className="grid grid-cols-2 items-center justify-center w-full   ">
          {food[0]?.bebidas.map((item, index) => (
            <Description
              key={item.id}
              description={item.description}
              price={item.price}
              img={refris}
              index={index}
            />
          ))}
        </div>
      </div>
    </>
  );
}
