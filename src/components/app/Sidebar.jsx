import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi'; // Only import HiMenu
import { FiPlusCircle, FiList, FiShoppingCart } from 'react-icons/fi'; // Icons for items
import { RxDashboard } from "react-icons/rx";
import {  Tooltip } from 'antd';
import { TfiLayoutSlider } from "react-icons/tfi";
import { FaUsers, FaUsersCog } from 'react-icons/fa';

const Sidebar = ({collapsed,toggleSidebar,activeButton, setActiveButton}) => {
  const location = useLocation(); // gets the current location

  useEffect(() => {
    const path = location.pathname;
    console.log(path)
    if (path.includes("/ADDproduct")) {
      setActiveButton("/ADDproduct");
   } else if (path.includes("/Orders")) {
      setActiveButton("/Orders");
    } else if (path.includes("/listProducts")) {
      setActiveButton("/listProducts");
    } else if (path.includes("/HomeBunners")) {
      setActiveButton("/HomeBunners");
    } else if (path.includes("/ManageAdmins")) {
      setActiveButton("/ManageAdmins");
    } else if (path.includes("/ManageUsers")) {
      setActiveButton("/ManageUsers");
    } else  setActiveButton("/");

  }, [location.pathname,activeButton]);
  const sidebarItems = [
  { label: 'Dashboard', path: '/', icon: <RxDashboard /> },
  { label: 'Add Product', path: '/ADDproduct', icon: <FiPlusCircle /> },
  { label: 'List Products', path: '/listProducts', icon: <FiList /> },
  { label: 'Orders', path: '/Orders', icon: <FiShoppingCart /> },
  { label: 'Home Bnners', path: '/HomeBunners', icon: <TfiLayoutSlider /> },
  { label: 'Manage Admins', path: '/ManageAdmins', icon: <FaUsersCog /> },
  { label: 'Manage Customers', path: '/ManageUsers', icon: <FaUsers /> },
];
  return (
    <div
      className={`flex ${collapsed ? 'w-16' : 'w-64'} rounded-2xl text-gray-800 transition-all duration-300 `}
    >
      {/* Sidebar Content */}
      <div className="flex flex-col items-center  w-full">
        {/* Logo and Toggle Button  */}
        <div className="flex items-center justify-between p-4 w-full">
          {/* Button to toggle the sidebar */}
          <Tooltip trigger={"hover"}  placement="right" title="Menu" color="#5c0011">
          <button
            onClick={toggleSidebar}
            className={`text-xl text-gray-800 p-2 transform transition-transform duration-300  hover:bg-slate-200 hover:text-red-500 rounded-lg ${
              collapsed ? 'rotate-0' : 'rotate-180'
            }`}
          >
            <HiMenu />
          </button>
          </Tooltip>

          {/* Display Logo if not collapsed */}
          {!collapsed && (
            <div className="text-2xl font-bold text-gray-800" >Logo</div>
          )}
        </div>

        {/* <div className='flex  flex-col space-y-[280px] fadeIn'> */}
        {/* Navigation Items */}
        <div className="flex flex-col space-y-4 mt-6 w-full pl-4 pr-2 animate-fadeIn">
        {sidebarItems.map(({ label, path, icon }) => (
          <Tooltip
            key={path}
            trigger="hover"
            title={collapsed ? label : ''}
            placement="right"
            color="#120338"
          >
            <Link
              to={path}
              onClick={()=>setActiveButton(path)}
              className={`flex items-center p-2 w-full text-left h-12 rounded-lg font-semibold transform duration-300 hover:text-blue-500 ${
                activeButton === path ? 'bg-blue-100' : 'hover:bg-blue-100'
              }`}
            >
              <span className="text-xl">{icon}</span>
              {!collapsed && <span className="ml-4 animate-fadeIn">{label}</span>}
            </Link>
          </Tooltip>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Sidebar;
