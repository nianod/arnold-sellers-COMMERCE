 import { useState, useEffect } from "react";
import type { Product } from "../Types/Product";
import axios from "axios";
import useSound from "use-sound";
import { useCart } from "../CartContext";

const AllProducts = () => {
    const { setCartCount, searchItem, setCartItems } = useCart();
    const [allProducts, setAllProducts] = useState<Product[]>([])
    
      const fetchProducts = async () => {
    try {
      const apiUrl = import.meta.env.VITE_HEROKU_URL;
      const response = await axios.get<Product[]>(`${apiUrl}/api/products`);
      setAllProducts(response.data);
      //console.log(response.data)
    } catch (error) {
      console.error("error occurred", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredItems = (Array.isArray(allProducts) ? allProducts : []).filter(
    (product) =>
      (product.name ?? "")
        .toLowerCase()
        .includes((searchItem ?? "").toLowerCase()),
  );

  const [play] = useSound("/mixkit-mouse-click-close-1113.wav")
  
  return (
    <div className="p-3">
        <div className="w-full max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredItems.map((product) => (
            <div key={product._id}>
              <img
                src={product.image}
                alt={product.name}
                className="h-50 rounded w-50 object-cover"
              />
              <p className="text-lg text-white font-semibold capitalize ">
                {product.name}
              </p>
              <span className="text-lg text-amber-300 font-bold mb-1.5">
                $ {product.price}
              </span>{" "}
              <br />
              <button
                className="bg-[#14144d] rounded p-2 px-2 w-full text-white font-bold cursor-pointer hover:bg-[#2f2f4f]"
                onClick={() => {
                  setCartCount((prev) => prev + 1);
                  setCartItems((prev) => [...prev, product]);
                  play();
                }}
              >
                Add to cart
              </button>
            </div>
          ))}
        </div>
         
      </div>
    </div>
  )
}

export default AllProducts