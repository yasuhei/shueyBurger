// CartContext.tsx
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
  addToCart: (item: CartItem | CartItem[]) => void;
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

  const addToCart = (item: CartItem | CartItem[]) => {
    if (Array.isArray(item)) {
      setCartItems((prevItems) => [...prevItems, ...item]);
    } else {
      setCartItems((prevItems) => [...prevItems, item]);
    }
  };

  // Other functions and states as needed

  const value: CartContextType = {
    cartItems,
    addToCart,
    // Other functions and states as needed
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
