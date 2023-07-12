export interface IFood {
  foods: [
    {
      id: number;
      description: string;
      condimentacao: string;
      price: number;
    },
  ];
  bebidas: [
    {
      id: number;
      description: string;
      price: number;
    },
  ];
}
