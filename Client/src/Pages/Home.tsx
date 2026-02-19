import { useState, useEffect } from "react";

import axios from "axios";
import type { Product } from "../Types/Product";
import useSound from "use-sound";
import Cookies from "../Components/Cookies";

import { useCart } from "../CartContext";
import { Link } from "react-router-dom";

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
    <div className="min-h-[500px] w-full bg-[#10b981] flex flex-col items-center justify-center  px-6 lg:px-20 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl gap-12 mb-16">
        <div className="flex-1 space-y-6 text-center lg:text-left">
          <h1 className="text-{#14144d} text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
            Everything You Need,
            <br />
            <span className="text-yellow-300">Just One Click Away.</span>
          </h1>
          <p className="text-emerald-50 text-lg max-w-lg opacity-90">
            Discover premium products from verified sellers. Enjoy fast <br />
            delivery, transparent pricing, and 24/7 support.
          </p>

          <div className="flex flex-wrap gap-4 pt-4 justify-center lg:justify-start">
            <Link className="bg-[#14144d] text-[white] px-8 cursor-pointer py-3 rounded-md font-semibold hover:transition-colors shadow-lg" to="/products">
              Start Shopping →
            </Link>
       
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="relative group">
            <img
              src="/pexels-apples-1841132_1920.jpg"
              alt="selling"
              className="w-full max-w-md h-[400px] object-cover rounded-[2rem] shadow-2xl border-8 border-white/10 transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-yellow-300/20 rounded-full blur-2xl -z-10"></div>
          </div>
        </div>
      </div>

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
                className="bg-[#14144d] rounded p-2 px-2 w-full text-white font-bold cursor-pointer hover:bg-[#2f2f4f] "
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
        <Cookies
          cookiesModal={cookiesModal}
          setCookiesModal={setCookiesModal}
        />
      </div>
    </div>
  );
};

export default Home;
