import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  FaHome,
  FaBoxOpen,
  FaThList,
  FaShoppingCart,
  FaUser,
} from 'react-icons/fa';
import { appStore } from '../store/app.store';
import { useContext } from 'react';

const Sidebar = () => {

  return (
    <div className="border-r border-gray-300 w-[200px] h-[calc(100vh-50px)] overflow-hidden bg-white">
      <div className="flex flex-col gap-3 p-5">

        <SideLink to="/" label="Home" icon={<FaHome />} />
        <SideLink to="/products" label="Products" icon={<FaBoxOpen />} />
        <SideLink to="/categories" label="Categories" icon={<FaThList />} />
        <SideLink to="/orders" label="Orders" icon={<FaShoppingCart />} />
        <SideLink to="/users" label="Users" icon={<FaUser />} />

      </div>
    </div>
  );
};

const SideLink = ({ to, label, icon }) => {
  const {closeSideber} = useContext(appStore)

  const location = useLocation();
  const isActive = location.pathname === to;
  

  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
        isActive
          ? 'bg-blue-100 text-blue-600 font-semibold'
          : 'text-gray-700 hover:text-blue-600 hover:bg-gray-100'
      }`}onClick={closeSideber}>
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export default Sidebar;
