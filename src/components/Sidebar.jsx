import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi'; // Only import HiMenu
import { FiPlusCircle, FiList, FiShoppingCart } from 'react-icons/fi'; // Icons for items
import { RxDashboard } from "react-icons/rx";
import { BiLogOut } from "react-icons/bi";
import { Popconfirm, Tooltip } from 'antd';
import { TfiLayoutSlider } from "react-icons/tfi";
import { FaUsers, FaUsersCog } from 'react-icons/fa';

const Sidebar = ({collapsed,toggleSidebar}) => {
  const [activeButton, setActiveButton] = useState('/'); // Track the active button
  const navigate = useNavigate();





  const navigateTo = (path) => {
    setActiveButton(path); // Update the active button
    navigate(path);
  };

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

      <div className='flex  flex-col space-y-[280px] fadeIn'>
      {/* Navigation Items */}
      <div className="flex flex-col space-y-4 mt-6 w-full pl-4 pr-2 animate-fadeIn">

        {/* Dashboard Item */}
        <Tooltip trigger={"hover"} title={collapsed ? 'Dashboard' : ''}  placement="right"  color='#120338'>
          <button
            onClick={() => navigateTo('/')}
            className={`flex items-center p-2 w-full text-left h-12 rounded-lg font-semibold hover:text-blue-500 ${
              activeButton === '/' ? 'bg-blue-100' : 'hover:bg-blue-100'
            }`}
          >
            <RxDashboard className="text-xl" />
            {!collapsed && <span className="ml-4 animate-fadeIn">Dashboard</span>}
          </button>
        </Tooltip>
            



        {/* Add product Item */}
        <Tooltip trigger={"hover"} title={collapsed ? 'Add Product' : ''} placement="right" color='#120338'>
          <button
            onClick={() => navigateTo('/ADDproduct')}
            className={`flex items-center p-2 w-full text-left h-12 rounded-lg font-semibold hover:text-blue-500 ${
              activeButton === '/ADDproduct' ? 'bg-blue-100' : 'hover:bg-blue-100'
            }`}
          >
            <FiPlusCircle className="text-xl" />
            {!collapsed && <span className="ml-4 animate-fadeIn">Add Product</span>}
          </button>
        </Tooltip>

        {/* List Item */}
        <Tooltip trigger={"hover"} title={collapsed ? 'List Products' : ''} placement="right"  color='#120338'>
          <button
            onClick={() => navigateTo('/listProducts')}
            className={`flex items-center p-2 w-full text-left h-12 rounded-lg font-semibold hover:text-blue-500 ${
              activeButton === '/listProducts' ? 'bg-blue-100' : 'hover:bg-blue-100'
            }`}
          >
            <FiList className="text-xl" />
            {!collapsed && <span className="ml-4 animate-fadeIn">List Products</span>}
          </button>
        </Tooltip>

        {/* Orders Item */}
        <Tooltip trigger={"hover"}title={collapsed ? 'Orders' : ''} placement="right"  color='#120338'>
          <button
            onClick={() => navigateTo('/Orders')}
            className={`flex items-center p-2 w-full text-left h-12 rounded-lg font-semibold hover:text-blue-500 ${
              activeButton === '/Orders' ? 'bg-blue-100' : 'hover:bg-blue-100'
            }`}
          >
            <FiShoppingCart className="text-xl" />
            {!collapsed && <span className="ml-4 animate-fadeIn">Orders</span>}
          </button>
        </Tooltip>

        {/* HomeBunners Item */}
        <Tooltip trigger={"hover"} title={collapsed ? 'HomeBunners' : ''} placement="right"  color='#120338'>
          <button
            onClick={() => navigateTo('/HomeBunners')}
            className={`flex items-center p-2 w-full text-left h-12 rounded-lg font-semibold hover:text-blue-500 ${
              activeButton === '/HomeBunners' ? 'bg-blue-100' : 'hover:bg-blue-100'
            }`}
          >
            <TfiLayoutSlider className="text-xl" />
            {!collapsed && <span className="ml-4 animate-fadeIn">Home Bnners</span>}
          </button>
        </Tooltip>

        {/* Manage Admins Item */}
        <Tooltip trigger={"hover"} title={collapsed ? 'Manage Admins' : ''} placement="right"  color='#120338'>
          <button
            onClick={() => navigateTo('/ManageAdmins')}
            className={`flex items-center p-2 w-full text-left h-12 rounded-lg font-semibold hover:text-blue-500 ${
              activeButton === '/ManageAdmins' ? 'bg-blue-100' : 'hover:bg-blue-100'
            }`}
          >
            <FaUsersCog  className="text-xl" />
            {!collapsed && <span className="ml-4 animate-fadeIn">Manage Admins</span>}
          </button>
        </Tooltip>

        {/* Manage Customers Item */}
        <Tooltip trigger={"hover"} title={collapsed ? 'Manage Customers' : ''} placement="right"  color='#120338'>
          <button
            onClick={() => navigateTo('/ManageUsers')}
            className={`flex items-center p-2 w-full text-left h-12 rounded-lg font-semibold hover:text-blue-500 ${
              activeButton === '/ManageUsers' ? 'bg-blue-100' : 'hover:bg-blue-100'
            }`}
          >
            <FaUsers  className="text-xl" />
            {!collapsed && <span className="ml-4 animate-fadeIn">Manage Customers</span>}
          </button>
        </Tooltip>
      </div>
      </div>

         
      </div>
    </div>
  );
};

export default Sidebar;
