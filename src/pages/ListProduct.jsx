import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch, FaEdit, FaTrash,FaStar } from "react-icons/fa"; // Import React Icons
import { Popconfirm, Button, Tooltip } from 'antd';
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import popularIcons from "../assets/popularity.png"
import UpdateProduct from "../components/LIST/UpdateProduct";
import { useParams } from 'react-router-dom';

const ListProducts = ({token,setToken}) => {
  const [products, setProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    name: "",
    info:"",
    price: "",
    images: [],
    category: "",
    subCategory: "",
    subSubCategory: "",
    popular: false,
    brand: "",
    discount: 0,
    status: "In stock",
    details: {
      DescriptionSection: [], // Reset description items
    },  });
  const { id } = useParams(); // assuming your route is /listProducts/:id

  // State for Popular Filter
  const [isPopular, setIsPopular] = useState(false);
  
  // Toggle Popular Filter
  const togglePopularFilter = () => {
    setIsPopular((prev) => !prev);
  };
  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/product/list");
      console.log("Fetched Products:", response.data);
  
      // Set only the array to state
      if (response.data?.products) {
        setProducts(response.data.products); // Set the products array directly
      } else {
        console.warn("No products found in the response");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products.");
    }
  };
  
  useEffect(() => {
    fetchProducts();
  },[]);


  // Open Edit Modal
  const openEditModal = (product) => {
    setCurrentProduct(product);
    setIsEditModalOpen(true);
  };
  
  //modal  update
  const [isClosing, setIsClosing] = useState(false);
  const CloseModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsEditModalOpen(false);
      setIsClosing(false);
    }, 500); // 500ms matches the animation duration
  };

  //hundel delete
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete("http://localhost:4000/api/product/remove", {
        data: { id }, // Send the ID in the body
      });
  
      console.log("Delete Response:", response.data);
      toast.success("Product deleted successfully.");
      fetchProducts(); // Refresh product list after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    }
  };
  
  const filteredProducts = products
  .filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.subCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.subSubCategory.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPopularity = !isPopular || product.popular;

    const matchesId = !id || product._id === id; // only filter by ID if it exists in URL

    return matchesSearch && matchesPopularity && matchesId;
  });


  return (
    <div className="px-12 pt-12">
      <h1 className="text-2xl font-bold mb-4 " >Product List</h1>

      {/* Search Bar with Popular Button */}
    <div className="flex items-center mb-6 gap-4 pr-2">
     {/* Search input */}
      <div className="relative flex-grow">
        <input
          type="text"
          placeholder="Search by name or category or subcategory or subsubcategory ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {/* Icon inside the input */}
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
      </div>
      {/* Search by Popularity Button */}
      <Tooltip placement="top" title="Search the Popular products" color="#614700">
          <button
            onClick={togglePopularFilter}
            className={`flex items-center px-2.5 py-1.5 rounded-xl border border-yellow-300 ${
              isPopular ? 'bg-yellow-500 text-white gap-x-2' : 'bg-white-200 text-gray-700 '
            } hover:bg-yellow-600`}
          >
          <img src={popularIcons} className="w-7 h-7"></img>
            {isPopular ? 'Popular Products' :''}
          </button>
      </Tooltip>

    </div>

    {/* Product Table */}
    <table className="w-full  items-center">
      <thead >
        <tr className="  border-b-2  border-gray-300 items-center ">
          <th className="p-2 ">Image </th>
          <th className="p-2 ">Name</th>
          <th className="p-2 ">Category</th>
          <th className="p-2 ">Sub-Category</th>
          <th className="p-2 ">Sub-SubCategory</th>
          <th className="p-2 ">Price</th>
          <th className="p-2 ">Actions</th>
        </tr>
      </thead>
      <tbody >
      {products.length > 0 ? (
      filteredProducts.map((product) => (
                <tr key={product._id} className="border-b border-gray-200 text-center hover:bg-slate-100">
                  <td className="px-6 py-4 text-center">
                      {product.images && Array.isArray(product.images) && product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-24 h-24 object-cover mx-auto rounded-md"
                        />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </td>
                <td className="justify-center items-center">{product.name}</td>
                <td className="justify-center items-center">{product.category}</td>
                <td className="justify-center items-center">{product.subCategory}</td>
                <td className="justify-center items-center">{product.subSubCategory}</td>
                <td className="justify-center items-center">${product.price}</td>
                {/* Actions Column  */}
                <td className="justify-center items-center ">
                  {/* Update product button */}
                  <Tooltip placement="top" title="Edit product" color="#061178">
                    <button
                      onClick={() => openEditModal(product)}
                      className=" mr-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                      >
                    <FaEdit />
                    </button>
                  </Tooltip>
                  {/* delete product button */}
                  <Popconfirm
                      title="Are you sure to delete this product?"
                      onConfirm={() => handleDelete(product._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Tooltip placement="top" title="Delete product" color="#820014">
                          <button
                            className=" p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                            >
                              <FaTrash />
                          </button>
                          </Tooltip>
                  </Popconfirm>
                </td>
            </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">
                No products found.
              </td>
            </tr>
          )}
        </tbody>  
    </table>

    {/* Edit Modal */}
    {isEditModalOpen && (
     <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center  items-center transition-opacity duration-300 ${
          isEditModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
       <div className={`relative bg-white rounded-xl shadow-lg flexCentre w-max max-h-screen  overflow-x-auto flex ${isEditModalOpen ? (isClosing ? 'animate-slideOutTop' : 'animate-slideInTop') : ''}`}>
        {/* Close Button */}
        <button
          onClick={() => {
            CloseModal();
          }}
          className="absolute top-3 right-4 px-2 pb-2 pt-1 z-50 rounded-full justify-center items-center h-8 bg-white text-black dark:hover:bg-blue-500 dark:hover:text-white"
        >
          &times;
        </button>
        {/* Update Product Form */}
        <UpdateProduct  currentProduct={currentProduct}  setCurrentProduct={setCurrentProduct}  setIsEditModalOpen={setIsEditModalOpen} fetchProducts={fetchProducts}/>
    
    </div>
  </div>
  )}
</div>
  );
};

export default ListProducts;
