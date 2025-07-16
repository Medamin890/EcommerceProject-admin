import React, { useEffect } from 'react';
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';
import NotificationButton from './NotificationBtn';
import Arrow_SettingBtn from './Arrow_SettingBtn';
import { Typography } from 'antd';
const Topbar = ({token,setToken,admin}) => {

  return (
    <div className='flex flexBetween py-2'>
      <Link to='/'>
        <img src={logo} alt="logoImg" height={155} width={155} />
      </Link>
      {/* buttons  */}
      <div className='flexCenter gap-x-6 px-4'>
        <span  className='w-full flexCenter' >
          <p className='text-sm text-gray-600 font-serif font-semibold'>Welcome,   </p>
          <span>
            <span className='text-sm text-red-900    font-bold font-mono'>{admin.role} </span>
            <span className='text-sm text-orange-600 font-bold font-sans'>{admin.name!="Grand Master"}</span>
            </span>
        </span>

        {/* notification button  */}
          <NotificationButton/>

        {/*  arrow setting button  */}
          <Arrow_SettingBtn  setToken={setToken}  />
       
      </div>
   
    </div>
  );
};

export default Topbar;
