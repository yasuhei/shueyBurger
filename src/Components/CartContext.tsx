import { createContext, useContext, useState } from "react";

export interface CartItem {
  description: string;
  condimentacao: string;
  total: number;
  price: number;
  cont: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.description === item.description
    );

    if (existingItemIndex !== -1) {
      // Item already exists in cart, update quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].cont += item.cont;
      updatedCartItems[existingItemIndex].total += item.total;
      setCartItems(updatedCartItems);
    } else {
      // Item does not exist in cart, add it
      setCartItems((prevItems) => [...prevItems, item]);
    }
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
