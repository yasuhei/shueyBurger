export interface IItens {
  description: string;
  condimentacao: string;
  price: number;
  img: string[];
  index: number;

  onClickRow: (
    description: string,
    price: number,
    condimentacao: string,
    index: number,
    img: string,
  ) => void;
}

export function Description({
  description,
  condimentacao,
  price,
  img,
  index,
  onClickRow,
}: IItens) {
  const priceNumber = price;

  return (
    <div
      className=" shadow-sm hover:shadow-xl border border-gray-200 rounded-md h-48 gap-4 m-2 cursor-grabbing"
      onClick={() =>
        onClickRow(description, price, condimentacao, index, img[index])
      }
    >
      <div className="flex justify-center items-center ">
        <div className="flex justify-center items-start flex-col pl-4 w-full ">
          <h3 className="text-gray-600 text-2xl font-semibold pt-3">
            {description}
          </h3>
          <p className="text-gray-500 text-sm break-words py-4 w-96">
            {condimentacao}
          </p>
          <p className="text-gray-500 text-sm pt-10">
            {priceNumber.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>
        <div className="w-64 pr-4 ">
          <img src={img[index]} alt="" className="w-full rounded-md" />
        </div>
      </div>
    </div>
  );
}
