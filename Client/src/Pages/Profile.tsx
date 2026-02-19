import axios from "axios";
import { useState, useEffect } from "react";
import type { User } from "../Types/User";
import { FaMap, FaPhone, FaUser, FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [deleteAccount, setDeleteAccount] = useState<boolean>(false)

  const token = localStorage.getItem("token");
  const navigate = useNavigate()

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
      
      localStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      console.log("User fetch failed:", error);
    } finally {
      setLoadingUser(false);
    }
  };

 
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const deleteAcc = () => {
    navigate('/login')
  }
  

  if (loadingUser) {
    return (
      <div className="min-h-screen bg-[black] flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[black] flex items-center justify-center">
        <p className="text-white text-xl">Please log in to view profile</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[black] flex flex-col items-center justify-center ">
      <div className="bg-[#312f2f] w-full rounded-lg shadow-xl  max-w-md p-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-amber-600 p-3 rounded-full">
              <FaUser className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-300">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-300 text-sm">{user.email}</p>
            </div>
          </div>
          <button className="text-blue-600 cursor-pointer hover:text-blue-800 flex items-center gap-1">
            <FaEdit /> Edit
          </button>
        </div>

        <div className="py-4 space-y-3">
          <div className="flex items-center gap-3 text-gray-300">
            <FaPhone className="text-amber-600" />
            <span>Phone: {user.mobileNumber || "Not provided"}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <FaMap className="text-amber-600" />
            <span>Address: {user.address || "Not provided"}</span>
          </div>
        </div>

        <div className="border-t">
          <p className="text-gray-300 text-sm mt-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
      <div className="bg-[#312f2f] w-full  max-w-md p-2 rounded flex justify-center mt-4">
        <button
          onClick={() => setDeleteAccount(true)}
          className="flex cursor-pointer items-center gap-2 text-red-600 hover:text-red-800 transition-colors"
        >
          <FaTrash size={16} />
          Delete Account
        </button>
      </div>

      {deleteAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-sm px-4">
          <div className="relative w-full max-w-2xl bg-neutral bg-gray-600 text-neutral-content rounded-2xl shadow-xl p-6 sm:p-8 animate-in fade-in zoom-in">
            <button
              onClick={() => setDeleteAccount(false)}
              className="absolute top-4 right-4 text-neutral-400 cursor-pointer hover:text-red-500 transition"
              aria-label="Close dialog"
            >
              ✕
            </button>

            <h2 className="text-center text-xl sm:text-2xl font-bold text-red-500 mb-4">
              Delete Your Account
            </h2>

            <p className="text-base sm:text-lg leading-relaxed text-neutral-300">
              Are you sure you want to permanently delete your account? This
              action cannot be undone. <br /> <span className="text-sm"> Once deleted: <br />You will lose access to
              your order history and digital receipts. <br />Any unused rewards
              points, store credits, or gift cards will be permanently lost. <br />
              Your active subscriptions or recurring orders will be cancelled. <br />
              Personalized recommendations and saved 'Wishlist' items will be
              erased</span>
            </p>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setDeleteAccount(false)}
                className="cursor-pointer bg-gray-700 font-semibold text-white p-2 rounded px-4"
              >
                Close
              </button>
              <button
                onClick={() => {setDeleteAccount(false), deleteAcc()}}
                className="cursor-pointer bg-red-700 font-semibold text-white p-2 rounded px-3"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

 