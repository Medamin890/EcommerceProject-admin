import React, { useState } from 'react';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onsubmitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(email+'/'+password)
      const response = await axios.post(
          'http://localhost:4000/api/user/admin',
          { email, password }, 
          {headers: {'Content-Type': 'application/json' }}
      );
      
      if (response.data.success) {
        console.log(response.data)
        setToken(response.data.token);
        toast.success('Login successful!');
      } else {
        toast.error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred during login');
    }
  };

  return (
  <div className="w-screen h-screen flex justify-center items-center px-8  md:px-44">
      <form
        onSubmit={onsubmitHandler}
        className="p-8 rounded-lg  w-full flex-col "
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Admin Login</h2>

        {/* Email Input */}
        <div className="mb-4 relative">
          <label className="block text-gray-600 mb-1">Email:</label>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <span className="hover:bg-gray-200 hover:text-gray-700 rounded-md px-3 py-2">
              <FaEnvelope className="" />
            </span>
            <input
              type="email"
              value={email}
              placeholder='Enter your Email '
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label className="block text-gray-600 mb-1">Password:</label>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <span className="hover:bg-gray-200 hover:text-gray-700 rounded-md px-3 py-2">
              <FaLock className="text-gray-600" />
            </span>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder='Enter your password'
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full text-sm  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="bg-gray-200 px-3 py-2 h-10"
            >
              {!showPassword ? (
                <FaEyeSlash className="text-gray-600"  />
              ) : (
                <FaEye className="text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
