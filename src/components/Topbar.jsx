import React from 'react';
import logo from "../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { RiSettings2Fill, RiSettings4Line } from 'react-icons/ri';
import { FaCircleUser } from "react-icons/fa6";
const Topbar = ({token,setToken}) => {
  const navigate = useNavigate();
 // LOGOUT function
 const logout =()=>{
  localStorage.removeItem("token");
  setToken("");
  window.location.reload(); // forces full reload

}
  return (
    <div className='flex flexBetween py-2'>
      <Link to='/'>
      <img src={logo} alt="logoImg" height={155} width={155} />
      </Link>
      {/* // profile button  */}
              <div className="relative group">
                <button className=' border-2 rounded-full border-blue-500'>
                  <FaCircleUser className="text-3xl " />
                </button>
                <ul className="absolute  right-0 flex-col hidden w-32 p-2 rounded-xl shadow-sm bg-white ring-1 ring-slate-900/15 group-hover:flex group-hover:animate-fadeIn  group-hover:duration-200">
                  {/* Website Setting */}
                  <li >
                    <button  onClick={()=>navigate("/WebsiteInfoSetting")}
                    className="flexStart gap-x-2 w-full px-2 py-2 text-sm text-gray-600 hover:bg-gray-200 hover:text-gray-400 hover:rounded-md" 
                    >
                      <RiSettings2Fill className=" !text-lg" />
                       Settings
                    </button>
                  </li>
                    <hr />
                  {/* Logout Item */}
                  <li>
                    <button
                      onClick={()=>logout()}
                      className="flexStart gap-x-2 w-full px-3 py-2 text-sm text-red-700  hover:bg-gray-200 hover:text-red-500 hover:rounded-md"
                      >
                      <FaSignOutAlt  />
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
   
    </div>
  );
};

export default Topbar;
