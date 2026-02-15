import axios from "axios";
import { useState, useEffect } from "react";
import type { User } from "../Types/User";
import { FaMap, FaPhone, FaUser, FaEdit, FaTrash } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState<boolean>(true);

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

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      
      console.log("Delete account");
    }
  };

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
    <div className="min-h-screen bg-gray-500 flex flex-col items-center justify-center p-4">
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
            <span>Phone: {" "} {user.mobileNumber || "Not provided"}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <FaMap className="text-amber-600" />
            <span>Address: {user.address || "Not provided"}</span>
          </div>
        </div>

      

        <div className="border-t">
            <p className="text-gray-300 text-sm mt-4">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
        <div className="bg-[#312f2f] mt-4">
          <button
            onClick={handleDeleteAccount}
            className="flex cursor-pointer items-center gap-2 text-red-600 hover:text-red-800 transition-colors"
          >
            <FaTrash size={16} />
            Delete Account
          </button>
        </div>
    </div>
  );
};

export default Profile;
