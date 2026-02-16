 
import { createContext, useContext, useState } from "react";
import type { Product } from "./Types/Product";
import type { ReactNode } from "react";

type CartContextType = {
  cartCount: number;
  searchItem: string;  
  setSearchItem: React.Dispatch<React.SetStateAction<string>>;
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [searchItem, setSearchItem] = useState("");  

  return (
    <CartContext.Provider
      value={{
        cartCount,
        setCartCount,
        cartItems,
        setCartItems,
        searchItem,
        setSearchItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
