import { useState, useEffect } from "react";
import { FaSearch, FaUser, FaCartPlus, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import SideCart from "../SideCart";
import type { Product } from "../../Types/Product";
import Logout from "../Logout";
import axios from "axios";
import type { User } from "../../Types/User";
import ProfileStat from "../ProfileStat";
import { ChevronDown, ChevronUp } from "lucide-react"
 
 
const Header = () => {
  const [search, setSearch] = useState<string>("");
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [cartCount] = useState<number>(0);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  // const [searchItem, setSearchItem] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [leave, setLeave] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [showInfo, setShowInfo] = useState<boolean>(false)

  const token = localStorage.getItem("token");

  const fetchCurrentUser = async () => {
    if (!token) {
      setLoadingUser(false);
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_HEROKU_URL;

      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setLoadingUser(false);
        return;
      }

      const response = await axios.get(`${apiUrl}/api/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
    } catch (error) {
      console.log("User fetch failed:", error);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  
  const headerStuff = {
    logo: "/download.jpg",
    title: "ARNOLD-SELLERS",
  };

  return (
    <>
      <div className="flex items-center justify-between top-0 fixed w-full bg-[#382d33] px-4 sm:px-6 py-3 shadow-md z-50">
        <button
          className="md:hidden cursor-pointer text-white text-xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className="flex items-center gap-2">
          <img
            src={headerStuff.logo}
            alt={headerStuff.title}
            className="h-8 w-8 sm:h-10 sm:w-10 rounded-full object-cover"
          />
          <Link
            className="font-bold text-lg sm:text-xl text-white"
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {headerStuff.title}
          </Link>
        </div>

        <div className="hidden md:flex flex-1 mx-4 lg:mx-8 relative gap-2 items-center max-w-lg">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search for products, Brands, Categories..."
            className="p-2 pl-10 w-full rounded bg-[#414145] border-gray-300 text-[#f3e6f3] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="  absolute left-4 text-blue-500 " />
          <button className="cursor-pointer bg-amber-300 p-2 text-gray-700 font-semibold shadow-2xl rounded hover:bg-amber-400 transition duration-300">
            Search
          </button>
        </div>

        <div className="hidden md:flex items-center gap-7">
          <button
            className="ml-4 relative cursor-pointer text-white text-2xl"
            onClick={() => setOpenCart(true)}
          >
            <FaCartPlus />
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          </button>

          <button
            className="bg-[#22201b] flex items-center cursor-pointer p-2 rounded hover:bg-[#292326]"
            onClick={() => setShowInfo(!showInfo)}
          >
            <p className="text-white text-sm flex gap-2 items-center">
              <span className="bg-amber-600 rounded-full p-1">
                <FaUser />
              </span>
              {loadingUser ? (
                <span className="text-sm animate-pulse">...</span>
              ) : user?.firstName ? (
                user.firstName
              ) : (
                "Guest"
              )}
            </p>
            {showInfo ? (
              <ChevronUp className="text-white" size={15} />
            ) : (
              <ChevronDown className="text-white text-sm" size={15}/>
            )}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-4">
          <button
            className="relative cursor-pointer text-white text-xl"
            onClick={() => setOpenCart(true)}
          >
            <FaCartPlus />
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold px-1.5 py-0.5 rounded-full">
              {cartCount}
            </span>
          </button>

          <button
            className="text-white text-xl bg-[#22201b] cursor-pointer p-2 rounded hover:bg-[#3c3a3b]"
            onClick={() => setShowInfo(true)}
          >
            {loadingUser ? (
              <span className="text-sm animate-pulse">...</span>
            ) : user?.firstName ? (
              <p className="font-semibold text-sm flex gap-2">
                <span className="bg-amber-600 rounded-full p-1">
                  <FaUser />
                </span>
                {user.firstName}
              </p>
            ) : (
              <span className="font-semibold text-sm">ARNOLD-SELLERS</span>
            )}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        <div
          className={`fixed top-0 left-0 h-full w-64 bg-[#382d33] transform transition-transform duration-300 z-50 md:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-6 border-b border-gray-600">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={headerStuff.logo}
                alt={headerStuff.title}
                className="h-10 w-10 rounded-full object-cover"
              />
              <span className="font-bold text-xl text-white">
                {headerStuff.title}
              </span>
            </div>

            <div className="relative mb-4">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full p-2 pl-10 rounded bg-[#414145] border-gray-300 text-[#f3e6f3] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-3 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      <SideCart
        openCart={openCart}
        setOpenCart={setOpenCart}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
      <Logout leave={leave} setLeave={setLeave} />

    
      <ProfileStat showInfo={showInfo} setShowInfo={setShowInfo} />
       
    </>
  );
};

export default Header;
