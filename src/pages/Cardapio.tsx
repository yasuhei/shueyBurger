import { useEffect, useState } from "react";
import { api } from "../Api";
import { IFood } from "../interfaces/Ifood";
import { imagens, refris } from "../utils/Images";
import { Description } from "../Components/Description";
import ModalQuantity from "../Components/ModalQuantity";

export function Cardapio() {
  const [food, setFood] = useState<IFood[]>([]);
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [condimentacao, setCondimentacao] = useState("");
  const [img, setImg] = useState("");

  const imagensComidas = imagens;
  const imagensBebidas = refris;

  useEffect(() => {
    api
      .get<IFood[]>("/public/foods")
      .then((response) => setFood(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleRowClick = (
    description: string,
    price: number,
    condimentacao: string,
    index: number,
    img: string,
  ) => {
    setDescription(description);
    setPrice(price);
    setCondimentacao(condimentacao);
    setImg(img);
    setOpen(true);
  };

  return (
    <>
      <ModalQuantity
        close={() => setOpen(false)}
        openModal={open}
        condimentacao={condimentacao}
        description={description}
        img={img}
        price={price}
      />
      <h1 className="text-center text-2xl text-gray-600 w-full uppercase font-semibold py-5">
        Os lanches tops das galáxias
      </h1>

      <div className="flex justify-center items-center h-auto py-4">
        <div className="grid grid-cols-2 items-center justify-center w-full ">
          {food[0]?.foods.map((item, index) => (
            <Description
              key={item.id}
              description={item.description}
              price={item.price}
              condimentacao={item.condimentacao}
              img={imagensComidas}
              index={index}
              onClickRow={handleRowClick}
            />
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
              condimentacao=""
              key={item.id}
              description={item.description}
              price={item.price}
              img={imagensBebidas}
              index={index}
              onClickRow={handleRowClick}
            />
          ))}
        </div>
      </div>
    </>
  );
}
