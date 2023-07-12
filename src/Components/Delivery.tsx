import food from "../assets/images/food.png";
export function Delivery() {
  return (
    <>
      <div className="flex justify-center items-center  ">
        <div className="flex justify-start items-start w-full">
          <img src={food} alt="" className="w-96" />
        </div>
        <div className="flex justify-center items-center flex-col">
          <h2 className="font-semibold text-4xl text-center py-4 text-gray-600">
            NÓS ENTREGAMOS AI <br /> NA SUA CASA!
          </h2>
          <span className="flex justify-center items-center text-center text-gray-600 font-semibold">
            Você nem precisa sair do conforto da sua para poder se deliciar com
            nossos Lanches e Porções
          </span>

          <p className="text-center py-4 text-gray-600">
            E para fazer seu pedido é muito simples: <br />
            <strong> Clicando no botão FOOD</strong> <br /> você vai escolher
            seu Burgão de qualidade <br /> e entregaremos ai na sua casa!
          </p>

          <button className="bg-red-600 text-white w-36 p-3 rounded-md hover:bg-red-300">
            FOOD
          </button>
        </div>
      </div>
    </>
  );
}
