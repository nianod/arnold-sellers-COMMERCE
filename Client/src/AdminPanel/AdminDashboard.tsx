import { useState } from "react";
import { FaHome, FaUser, FaInbox, FaShoppingCart, FaLayerGroup, FaBox, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

type MenuItem = {
  to: string;
  label: string;
  icon: any;
};


const menuItems: MenuItem[] = [
  { to: 'minidashboard', label: "Dashboard", icon: <FaHome /> },
   { to: 'products', label: "Products", icon: <FaBox /> },
  { to: 'users', label: "Users", icon: <FaUser /> },
  { to: 'orders', label: "Orders", icon: <FaShoppingCart /> },
  { to: 'messages', label: "Messages", icon: <FaInbox /> },
  { to: 'categories', label: "Categories", icon: <FaLayerGroup /> },
];

const AdminDashboard = () => {

  const [activeTab, setActiveTab] = useState('minidashboard')

  return (
    <>
      <div className="flex">
        <div className="bg-black text-white w-80 min-h-screen p-3">
          <h1 className="font-bold text-2xl mb-6">Admin Dashboard</h1>
          <span className="font-semibold block mb-3 text-blue-300">Menu</span>
          <div className="flex flex-col gap-2">
            {menuItems.map((menu, index) => (
              <Link
                key={index}
                to={menu.to}
                onClick={() => setActiveTab(menu.to)}
                className={`p-[8px] flex items-center gap-2 rounded hover:bg-green-800 hover:text-green-400 transition ${
                  activeTab === menu.to ? "bg-green-600" : ""
                }`}
              >
                {menu.icon} {menu.label}
              </Link>
            ))}
            <div className="mt-24">
              <Link to={'settings'} className="cursor-pointer flex items-center gap-2 p-2 rounded hover:bg-gray-800 hover:text-blue-400 transition w-full">
                <FaCog />
                Settings
              </Link>
              <Link to={'manage'} className="cursor-pointer flex items-center gap-2 p-2 rounded hover:bg-gray-800 hover:text-blue-400 transition w-full">
                <FaSignOutAlt />
                Log Out
              </Link>
            </div>
          </div>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
