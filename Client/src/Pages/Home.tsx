import { useState, useEffect } from "react";

import axios from "axios";
import type { Product } from "../Types/Product";
import useSound from "use-sound";
import Cookies from "../Components/Cookies";

import { useCart } from "../CartContext";

const Home = () => {
  const { setCartCount, searchItem, setCartItems } = useCart();

  const [products, setProducts] = useState<Product[]>([]);
  const [cookiesModal, setCookiesModal] = useState<boolean>(true);
  const fetchProducts = async () => {
    try {
      const apiUrl = import.meta.env.VITE_HEROKU_URL;
      const response = await axios.get<Product[]>(`${apiUrl}/api/products`);
      setProducts(response.data);
      //console.log(response.data)
    } catch (error) {
      console.error("error occurred", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const filteredItems = (Array.isArray(products) ? products : []).filter(
    (product) =>
      (product.name ?? "")
        .toLowerCase()
        .includes((searchItem ?? "").toLowerCase()),
  );

  const [play] = useSound("/mixkit-mouse-click-close-1113.wav");

  return (
    <div className="flex items-center justify-center flex-col overflow-x-hidden">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-9 px-3 py-5">
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
              className="bg-[#14144d] p-2 px-2 w-full text-white font-bold cursor-pointer hover:bg-fuchsia-600 transition-colors duration-500"
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
      <Cookies cookiesModal={cookiesModal} setCookiesModal={setCookiesModal} />
    </div>
  );
};

export default Home;
