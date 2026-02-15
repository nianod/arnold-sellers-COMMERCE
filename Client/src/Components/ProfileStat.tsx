import { LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import type { User } from "../Types/User";
import axios from "axios";
 
type ProfileProps = {
  showInfo: boolean;
  setShowInfo: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProfileStat: React.FC<ProfileProps> = ({ showInfo, setShowInfo }) => {
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
    } catch (error) {
      console.log("User fetch failed:", error);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

    const logoff = () => {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }

if (loadingUser) {
    return (
      <div className="min-h-screen bg-[black] flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }
  return (
    <>
      {showInfo && (
        <>
          <div className="fixed inset-0" onClick={() => setShowInfo(false)} />

          <div className="fixed top-12 right-4 w-48 bg-white rounded shadow-lg   z-50">
            <div className="px-4 py-3 border-b">
              <p className="font-medium">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-gray-600 truncate">{user?.email}</p>
            </div>

            <div className="py-1">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => setShowInfo(false)}
              >
                Profile
              </Link>
              <Link
                to="/orders"
                className="block px-4 py-2 text-sm hover:bg-gray-100"
                onClick={() => setShowInfo(false)}
              >
                Orders
              </Link>
              <button
                onClick={() => logoff()}                
                className="w-full cursor-pointer text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center gap-2 border-t mt-1"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileStat;
