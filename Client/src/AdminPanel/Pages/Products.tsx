import { useState } from "react"
import axios from "axios";

const Products = () => {
  const [name, setName] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [price, setPrice] = useState<any>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [quantity, setQuantity] = useState<string>('')
 

    const insertToMongo = async () => {
      try {
        await axios.post('http://localhost:8000/api/products', {
          name,
          quantity,
          price,
          image
        })
        alert("Added successully")
      } catch (error: any) {
        setError(error.response?.data.message || "Something went wrong here brother")
      } finally {
        setLoading(false)
      }
      
    }
  


  const submit = (e: any) => {
    if(error) {
      setError(error)
      setLoading(false)
      return
    } else
    e.preventDefault()
    setLoading(true)
    setError('')
    insertToMongo()
    setName("")
    setImage("")
    setPrice(0)
    setQuantity("")
  }

  return (
    <div className="flex items-center">
    <div className="border max-w-md w-full p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-center font-bold text-xl">Add a product</h2>
      <form onSubmit={submit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-2">
            Name:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="enter item name"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-2">
            Quantity:
          </label>
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="enter item quantity"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-2">
            Image Url:
          </label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="enter the image url"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-black mb-2">
            Price:
          </label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="enter the item price"
            required
          />
        </div>
        {error && (
          <p className="text-center text-red-500 text-sm mt-1">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-green-500 p-2 rounded text-white font-semibold ${loading ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:bg-green-600 transition"}`}>
          {loading ? "Adding..." : "Add a Product"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default Products;
