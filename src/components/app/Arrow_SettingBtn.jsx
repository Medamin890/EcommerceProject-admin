import { Popover, Button, Popconfirm } from "antd";
import { RiArrowDownSLine, RiSettings2Fill } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import { IoWarning } from "react-icons/io5";
import { Link } from "react-router-dom";
const Arrow_SettingBtn = ({setToken}) => {
    // LOGOUT function
    const logout =()=>{
      localStorage.removeItem("token");
      setToken("");
      window.location.reload(); // forces full reload
    }   
  const content = (
    <ul className="flex flex-col rounded-xl ">
      {/* Website Setting */}
      <li         
        className="duration-300 transform text-gray-600 hover:bg-gray-200 hover:text-gray-300 hover:rounded-md">
        <Link
          to="/WebsiteInfoSetting"
          className="flex items-center gap-2 w-full p-3  px-2 text-sm "
        >
          <RiSettings2Fill className="text-lg w-4" />
          Settings
        </Link>
      </li>
      <hr />
    {/* Logout with Confirmation */}
        <li className="duration-300 transform  text-red-500 hover:bg-gray-200 hover:text-red-400 hover:rounded-md">
         <Popconfirm
            title={<span className="w-48 text-sm  text-gray-50">Are you sure you want to logout ?</span>}
            onConfirm={logout}
            okText="Yes"
            cancelText="No"
            placement="topLeft"
            className="w-full  rounded-md"
            icon={<IoWarning    className="text-red-700 text-2xl mb-1 pb-1  mr-1"/>}
            okButtonProps={{ className: "bg-red-600 hover:!bg-red-400" }}
            >
            <button
                className="flex items-center gap-2 w-full p-3  px-2  text-sm"
            >
                <FaSignOutAlt className="text-md w-4" />
                Logout
            </button>
         </Popconfirm>
        </li>
    </ul>
  );

  return (
    <Popover content={content} trigger="click" placement="bottomRight">
      <Button
        shape="circle"
        icon={<RiArrowDownSLine className="text-xl pt-1" />}
        className="flex pt-0 outline outline-1"
      />
    </Popover>
  );
};

export default Arrow_SettingBtn;
