// src/components/CreateAdminModal.jsx
import React, { useState } from "react";
import { Modal, Input, Select, Button, Tooltip } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEnvelope, FaPhone, FaUser, FaUserTie } from "react-icons/fa6";
import { HiUserAdd } from "react-icons/hi";
import { MdWork } from "react-icons/md";
import { RiKeyFill, RiUserLine } from "react-icons/ri";
import { TbPasswordUser } from "react-icons/tb";
const { Option } = Select;

const CreateAdminModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName:"",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRoleChange = (value) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };


  const validateAdminForm = (data) => {
    const { name, lastName, email, phone, password, role } = data;
  
    if (!name || !lastName || !email || !phone || !role) {
      return "Please fill in all required fields.";
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
  
    const phoneRegex = /^\d{8,}$/;
    if (!phoneRegex.test(phone)) {
      return "Phone number must be at least 8 digits.";
    }
  
    if (password && password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
  
    return null; // no error
  };
  const handleSubmit = async () => {

    const error = validateAdminForm(formData);
    if (error) {
      toast.error(error);
      return;
    }
    try {
      setLoading(true);
      await axios.post("/api/admins/create", formData);
      toast.success("Admin created successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to create admin");
    } finally {
      setLoading(false);
    }
  };
  const generatePassword = () => {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&* _+-=|:,.?";
    let password = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * n));
    }
    setFormData((prev) => ({ ...prev, password }));
  };
  

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      className=" md:!w-[45%]"
    >
      <div className="flex flex-col gap-4 p-4  ">
      <h1 className="text-2xl font-bold mb-1 " >Create New admin </h1>
        <div className="flex flex-row gap-4">  

        <Input
          name="name"
          prefix={<FaUser  className=" text-gray-500  mr-1" />}
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          />
        <Input
          name="lastName"
          prefix={<FaUser  className=" text-gray-500  mr-1" />}
          placeholder="Enter last name"
          value={formData.lastName  }
          onChange={handleChange}
        />
        </div>
        <Input
          name="email"
          prefix={<FaEnvelope className=" text-gray-500  mr-1" />}
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          name="phone"
          prefix={<FaPhone className=" text-gray-500  mr-1" />}
          placeholder="Enter Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <div className="flex items-center gap-2">
          <Input.Password
            name="password"
            prefix={<RiKeyFill className="text-gray-500 mr-1" />}
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="flex-1"
          />
          <Tooltip
            title='Try to generate a strong password.'
            placement="top"
            trigger={"hover"}
            color="blue-inverse"
            >
            <Button type="primary" onClick={generatePassword}>
              <TbPasswordUser className="text-lg"/>
              <span className='hidden xs:block '>Generate</span>
            </Button>
          </Tooltip>
        </div>

        <Select
          placeholder='Enter the role'
          prefix={!formData.role && (<MdWork  className=" text-gray-500  mr-1" />) }
          onChange={handleRoleChange}

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
          onClick={handleSubmit}
          loading={loading}
          className="w-full"
        >
          <HiUserAdd  className=" text-lg" />
          Create
        </Button>
      </div>
    </Modal>
  );
};

export default CreateAdminModal;
