// src/components/ManageAdmins.jsx
import React, { useState, useEffect } from 'react';
import { Button, Popconfirm, Input, Select, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
import EditAdminModal from '../components/Admins/EditAdminModal';
import CreateAdminModal from '../components/Admins/CreateAdminModal';
import { MdWork } from 'react-icons/md';
import {  RiUserLine } from 'react-icons/ri';
import { FaTrash, FaUserTie } from 'react-icons/fa6';
import { FaEdit, FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';

const { Search } = Input;
const { Option } = Select;

const ManageAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  // Fetch admins from backend
  const fetchAdmins = async () => {
    try {
      const res = await axios.get('/api/admins/list');
      setAdmins(res.data);
      setFilteredAdmins(res.data);
    } catch (err) {
      console.error('Error fetching admins:', err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Handle search
  const handleSearch = (value) => {
    setSearchText(value);
    filterAdmins(value, roleFilter);
  };

  // Handle role filter
  const handleRoleFilter = (value) => {
    setRoleFilter(value);
    filterAdmins(searchText, value);
  };

  const filterAdmins = (search, role) => {
    let filtered = admins;

    if (search) {
      filtered = filtered.filter(
        (admin) =>
          admin.name.toLowerCase().includes(search.toLowerCase()) ||
          admin.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (role) {
      filtered = filtered.filter((admin) => admin.role === role);
    }

    setFilteredAdmins(filtered);
  };

  const handleDeleteAdmin = async (id) => {
    try {
      console.log("delete id:",id);
      await axios.delete(`http://localhost:4000/api/admins/delete/${id}`);
      toast.success("deleted successfully !")
      fetchAdmins();
    } catch (err) {
      console.error('Error deleting admin:', err);
    }
  };

  const openEditModal = (admin) => {
    setSelectedAdmin(admin);
    setEditModalOpen(true);
  };

  return (
    <div className="px-12 pt-12">
      <h1 className="text-2xl font-bold mb-4 " >Manage admin </h1>

      {/* Search and Filter */}
        <div className='flex flex-row gap-4 pt-2  pb-6'>
        <Search
          placeholder="Search by name or email"
          prefix={<FaSearch className=" text-gray-400   mr-1"/>}
          enterButton="Search"
          onSearch={handleSearch}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          className="w-full"
        />

        <Select
          placeholder="Filter by Role"
          prefix={!roleFilter && <MdWork  className=" text-gray-500 text-lg mr-1 " />}
          allowClear
          onChange={handleRoleFilter}
          className="w-full max-w-44 !ring-1 rounded-md hover:!ring-transparent hover:!duration-300 !ring-black "
        >
          <Option value="superAdmin">
            <div className='flex items-center gap-2'>
               <FaUserTie    className=" text-gray-500 text-lg  mr-1" />Super Admin
            </div>
            </Option>
          <Option value="admin" >
            <div className='flex items-center gap-2'>
               <RiUserLine     className=" text-gray-500 text-lg  mr-1" />Admin
            </div>
          </Option>
          
        </Select>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setCreateModalOpen(true)}
        >
          Create New Admin
        </Button>
      </div>

      {/* Admins List */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow pb-2">
          <thead >
            <tr className=' !m-10'>
              <th className="text-left p-4">#</th>
              <th className="text-left p-4">Name</th>
              <th className="text-left p-4">Email</th>
              <th className="text-left p-4">phone</th>
              <th className="text-left p-4">Role</th>
              <th className="text-left p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAdmins
              .filter((admin) => admin.name?.toLowerCase().includes(searchText.toLowerCase())
                             ||  admin.lastname?.toLowerCase().includes(searchText.toLowerCase())
                             ||  admin.email?.toLowerCase().includes(searchText.toLowerCase())
              ).map((admin,index) => (
                  <tr key={admin._id} className="border-t">
                    <td className="p-4">{index + 1}</td>
                    <td className="p-4">{admin.name} {admin?.lastName}</td>
                    <td className="p-4">{admin.email}</td>
                    <td className="p-4">{admin.phone}</td>
                    <td className="p-4 capitalize">{admin.role}</td>
                    <td className="p-4 flex gap-2">
                            <Tooltip placement="top" title="Edit  admin" color="#061178" trigger={'hover'}>
                            <button
                              onClick={() => openEditModal(admin)}
                              className=" mr-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                              >
                            <FaEdit />
                            </button>
                          </Tooltip>
                      <Popconfirm
                        title="Are you sure you want to delete this admin?"
                        onConfirm={() => handleDeleteAdmin(admin?._id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Tooltip placement="top" title="Delete  admin" color="#820014" trigger={'hover'}>
                          <button
                            className=" p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                              <FaTrash />
                          </button>
                          </Tooltip>
                      </Popconfirm>
                    </td>
                  </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Admin Modal */}
      {createModalOpen && (
        <CreateAdminModal
          open={createModalOpen}
          onClose={() => {
            setCreateModalOpen(false);
            fetchAdmins();
          }}
        />
      )}

      {/* Edit Admin Modal */}
      {editModalOpen && selectedAdmin && (
        <EditAdminModal
          open={editModalOpen}
          adminData={selectedAdmin}
          onClose={() => {
            setEditModalOpen(false);
            fetchAdmins();
          }}
        />
      )}
    </div>
  );
};

export default ManageAdmins;
