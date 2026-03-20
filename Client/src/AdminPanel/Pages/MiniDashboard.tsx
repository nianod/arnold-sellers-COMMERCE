import type { Product } from "../../Types/Product";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaPen, FaTrash, FaRoad, FaPlus } from "react-icons/fa";
import { DeleteProduct } from "./DeleteProduct"
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const MiniDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true)

  const API = import.meta.env.VITE_HEROKU_URL
  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await axios.get<Product[]>(
        `${API}/api/products`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("error occurred", error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const editProduct = () => {};

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete(`${API}/api/products/${id}`);
      setProducts((prev) => prev.filter((product) => product._id !== id));
      setConfirmDelete(false);
    } catch (err) {
      console.error("A certain error occurred", err);
    }
  };

  const pinProduct = () => {};

 if (loading) {
  return (
    <div className="flex justify-center items-center h-screen m-auto">
      <Loader2 className="animate-spin" size={48} /> Feching...
    </div>
  );
}

  return (
    <>
      <div>
        <h2 className="text-center text-lg font-bold text-black">
          Available Products to the clients
        </h2>
        <div className="flex items-center justify-center flex-col overflow-x-hidden">
          <div className="grid md:grid-cols-5 sm:grid-cols-1 gap-9 px-3 py-5">
            {products.map((product) => (
              <div key={product._id} className="">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-50 rounded w-50 object-cover"
                />
                <p className="text-md text-white font-semibold capitalize ">
                  <span>{product.name}</span>-{" "}
                  <span className="text-gray-900 text-sm">$ {product.price}</span>
                </p>
                <div className="flex">
                  <button
                    onClick={editProduct}
                    className=" p-2 px-2 w-full text-gray-900 font-bold cursor-pointer hover:text-gray-300 duration-200"
                    title="Edit"
                  >
                    <FaPen />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedProductId(product._id);
                      setConfirmDelete(true);
                    }}
                    className=" p-2 px-2 w-full text-gray-900 font-bold cursor-pointer hover:text-gray-300 duration-200"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                  <button
                    onClick={pinProduct}
                    className=" p-2 px-2 w-full text-gray-900 font-bold cursor-pointer hover:text-gray-300 duration-200"
                    title="Pin to top"
                  >
                    <FaRoad />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Link 
            to="/admin/dashboard/products"
            className="flex items-center gap-1.5 bg-blue-600 p-2 px-5 mb-5 rounded-3xl font-semibold hover:bg-blue-700 transition text-white"
          >
            Add More Products <FaPlus />
          </Link>
        </div>
      </div>

      <DeleteProduct
        confirmDelete={confirmDelete}
        setConfirmDelete={setConfirmDelete}
        onConfirm={() => {
          if (selectedProductId) deleteProduct(selectedProductId);
        }}
      />
    </>
  );
};

export default MiniDashboard;
