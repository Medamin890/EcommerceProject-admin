import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Input, Button, Tag, Space, Select, Tooltip, Popconfirm } from "antd";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { LiaBanSolid } from "react-icons/lia";
import { MdAlignHorizontalLeft } from "react-icons/md";
import { IoFilterSharp } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { toast } from 'react-toastify';
const { Search } = Input;
const { Option } = Select;

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [banFilter, setBanFilter] = useState("");

  const getAllUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:4000/api/user/getallusers");
      setUsers(data.users||[]);
      console.log(data);
      setFilteredUsers(data.users||[]);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    filterUsers(value, banFilter);
  };

  const filterUsers = (term, ban) => {
    let result = [...users];
    if (term) {
      result = result.filter(
        (user) =>
          user.name?.toLowerCase().includes(term.toLowerCase()) ||
          user.lastname?.toLowerCase().includes(term.toLowerCase()) ||
          user.email?.toLowerCase().includes(term.toLowerCase())
      );
    }

    if (ban === "banned") {
      result = result.filter((user) => user.ban === true);
    } else if (ban === "notBanned") {
      result = result.filter((user) => user.ban === false);
    }

    setFilteredUsers(result);
  };

  const handleBanToggle = async (userId, currentStatus) => {
    const url = currentStatus ? "/api/user/unbanUser" : "/api/user/banUser";
    try {
      await axios.put(url, { userId });
      getAllUsers(); // Refresh
      {currentStatus ?  toast.success("User has been successfully banned."):  toast.success("User has been successfully unbaned.")}
    } catch (err) {
      console.error("Error banning/unbanning:", err);
      toast.error("something wrong try again !")
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      render: (_, __, i) => i + 1,
    },
    {
      title: "Name ",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "ban",
      render: (ban) =>
        <Tag color={ban ? "red" : "green"} className=" p-1 px-2">
          {ban ? "Banned" : "Active"}
        </Tag>
    },
    {
      title: "Action",
      render: (_, user) => (
        <Popconfirm 
          disabled={user.ban}
          title="Are you sure to ban  this "
          onConfirm={() => handleBanToggle(user._id, user.ban)}
          >
          <Button
            type={"primary"}
            onClick={user.ban && (()=> handleBanToggle(user._id, user.ban))}
            className={`!px-2   gap-x-1 animation-btns ${user.ban ? '!bg-green-400 hover:!bg-green-400/50':'!bg-red-500 hover:!bg-red-500/50'}` }
            >
              {user.ban ?  <IoIosCheckmarkCircleOutline className="text-xl " />:<LiaBanSolid className="text-lg "/>}
              {user.ban ? "Unban" : "Ban"}
            </Button>
            </Popconfirm>
      ),
    },
  ];

  return (
    <div className="px-12 pt-12">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      <div className='flex flex-row gap-4 pt-2  pb-6'>
        <Search
          placeholder="Search by name, lastname, email"
          prefix={<FaSearch className=" text-gray-400   mr-1"/>}
          enterButton="Search"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
          className="w-full "
/>
        <Select
          prefix={!banFilter && <IoFilterSharp className=" text-gray-500 text-xl  mr-1"/>}
          allowClear
          placeholder="filter by status"
          onChange={(value) => {
            setBanFilter(value);
            filterUsers(searchTerm, value);
          }}
          className="min-w-48 !ring-1 rounded-md hover:!ring-transparent hover:!duration-300 !ring-black "
        >
        <Option value="all" > 
            <div className='flex items-center gap-2  text-gray-500'>
              <MdAlignHorizontalLeft  className="  text-xl  mr-1" />
              All
            </div>
         </Option>
          <Option value="banned" > 
            <div className='flex items-center gap-2 '>
              <LiaBanSolid  className=" text-red-500 text-xl  mr-1" />
               Banned
            </div>
         </Option>
         <Option value="Active"> 
            <div className='flex items-center gap-2'>
              <IoIosCheckmarkCircleOutline    className=" text-green-500 text-xl  mr-1" />
              Active
            </div>
         </Option>
        </Select>
      </div>
      <div >
        <Table
          rowKey="_id"
          columns={columns}
          dataSource={filteredUsers}
          pagination={{ pageSize: 6 }}
          className="!overflow-x-auto"
        />
    </div>
    </div>
  );
};

export default ManageUsers;
