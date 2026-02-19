import { FaTrash } from "react-icons/fa";
import {  Link } from "react-router-dom";
import { useCart } from "../CartContext";

type SideCartProps = {
  openCart: boolean;
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
};

const SideCart: React.FC<SideCartProps> = ({ openCart, setOpenCart }) => {
  const { cartItems, setCartItems, cartCount } = useCart();

  const removeFromCart = (id: string) => {
    setCartItems((prev: any) => prev.filter((item: any) => item._id !== id));
  };

  const totalPrice = cartItems.reduce((total: number, item:any ) => {
    return total + item.price
  }, 0)
  
   
  return (
    <div>
      {openCart && (
        <div
          className="fixed inset-0 z-20 backdrop-blur-2xl"
          onClick={() => setOpenCart(false)}
        >
          <div
            className={`fixed right-0 top-0 bottom-0 min-w-64 bg-gray-300 mt-15 z-50 transform transition-transform duration-300 ease-in-out ${
              openCart ? "translate-x-0" : "translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-0 right-2 text-gray-700 text-3xl font-bold cursor-pointer hover:rotate-90 transition-transform duration-300"
              onClick={() => setOpenCart(false)}
            >
              ×
            </button>
            <div className="font-semibold mt-4 p-4 overflow-y-auto h-full">
              <p className="text-center text-lg">Your Cart</p>

              {cartItems.length === 0 ? (
                <p className="text-center text-gray-600 mt-4">
                  Your cart is empty
                </p>
              ) : (
                <>
                  {cartItems.map((item: any) => (
                    <div key={item._id} className="mb-4">
                      <div className="flex items-center justify-between gap-2 bg-white p-2 rounded-lg shadow">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 px-2">
                          <p className="font-medium text-gray-800">
                            {item.name}
                          </p>
                          <span className="text-green-700 font-semibold">
                            ${item.price}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item._id)}
                          className="text-red-600 hover:text-red-800 cursor-pointer p-1"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div>
                    <div>
                      <p className="flex justify-between">Total Items: <span>{cartCount}</span></p>
                      <p className="flex justify-between">Total Price: <span>$ {totalPrice} </span></p>
                    </div>
                  <Link
                    to="/checkout"
                    className="block text-center bg-blue-600 text-white px-3 w-full mt-4 py-2 rounded hover:bg-blue-700"
                    onClick={() => setOpenCart(false)}
                  >
                    Proceed to checkout
                  </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideCart;



