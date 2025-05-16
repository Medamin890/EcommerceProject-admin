// src/components/EditAdminModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Input, Select, Button, Tooltip, Collapse } from "antd";
import { FaEnvelope, FaPhone, FaUser, FaUserTie } from "react-icons/fa6";
import { HiUserAdd } from "react-icons/hi";
import { MdWork } from "react-icons/md";
import { RiEditBoxLine, RiEditCircleLine, RiKeyFill, RiUserLine } from "react-icons/ri";
import { TbPasswordUser } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-toastify";

const { Option } = Select;

const EditAdminModal = ({ open, onClose, adminData }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    lastName:"",
    email: "",
    phone: "",
    password: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (adminData) {
      setFormData({
        id: adminData?._id,
        name: adminData.name,
        lastName: adminData.lastName,
        email: adminData.email,
        phone: adminData.phone,
        password: "",
        role: adminData.role,
      });
    }
    console.log(adminData);
  }, [adminData]);

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
  
    if (formData.password && formData.password !== "" && formData.password.length < 8) {
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
      await axios.put('api/admins/edit/', formData);
      toast.success("Admin "+formData.name +" "+ formData.lastName+" updated successfully!");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update admin");
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
      <h1 className="text-2xl font-bold mb-1 " >Edit Admin  </h1>
        <div className="flex flex-row gap-4">  

        <Input
          prefix={<FaUser  className=" text-gray-500  mr-1" />}
          name="name"
          placeholder="Enter name"
          value={formData.name}
          onChange={handleChange}
          />
        <Input
          prefix={<FaUser  className=" text-gray-500  mr-1" />}
          name="lastName"
          placeholder="Enter last name"
          value={formData.lastName  }
          onChange={handleChange}
        />
        </div>
        <Input
          itemType="email"
          prefix={<FaEnvelope className=" text-gray-500  mr-1" />}
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          prefix={<FaPhone className=" text-gray-500  mr-1" />}
          name="phone"
          placeholder="Enter Phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <Collapse 
          
          items={[
          {
            key: '1',
            label: "do you want to change the password ?",
            children: <div className="flex items-center gap-2">
            <Input.Password
              prefix={<RiKeyFill className="text-gray-500 mr-1" />}
              name="password"
              placeholder="Enter  the new password"
              value={formData.password}
              onChange={handleChange}
              allowClear
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

          </div>,
          },
        ]}
        >
            
        </Collapse>
        <Select
          placeholder='Enter the role'
          value={formData.role}
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
          <RiEditBoxLine  className="text-lg" />
          Edit 
        </Button>
      </div>
    </Modal>
  );
};

export default EditAdminModal;
