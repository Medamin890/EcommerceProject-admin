import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import List from "./pages/List";
import Topbar from "./components/Topbar";
import Dashboard from "./pages/dashbord";
import { ToastContainer } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import { useEffect, useState } from "react";
import AddProduct from "./pages/Add";
import HomeBunners from "./pages/HomeBunners";
import SalesOffBunner from "./pages/SalesOffBunner";
import ManageAdmins from "./pages/ManageAdmins";
import ManageUsers from "./pages/ManageUsers";
import WebsiteInfoSetting from "./pages/WebsiteInfoSetting";
export default function App() {

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "")
    useEffect(() => {
        localStorage.setItem('token', token)
    }, [token])

    const [collapsed, setCollapsed] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    // Function to toggle sidebar
    const toggleSidebar = () => {
      setCollapsed((prevState) => !prevState);
    };
    // Function to handle screen size changes
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    // Automatically collapse sidebar when screen width is less than 500px
    useEffect(() => {
      window.addEventListener('resize', handleResize);
  
      if (screenWidth < 1400) {
        setCollapsed(true);
      }
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [screenWidth]);
  return (
    <main>
        {/* share Toast Container  */}
        <ToastContainer position="top-right" autoClose={3000} />
   
      { token ==="" 
      ?(
        <Login  setToken={setToken}/>
       ):(
        <BrowserRouter>
      
         {/* Full Page Layout */}
         <div className=" flex  bg-gray-10  h-screen">
           {/* Sidebar */}
           <div className=" pl-4 py-2  shadow-lg first-line:drop-shadow-md h-[695px] rounded-2xl xs:mr-8 mr-3 bg-white ">
             <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar}/>
           </div>
   
           {/* Main Content Area */}
           <div className="flex flex-col flex-grow  ">
             {/* Topbar(Header) */}
             <div className=" px-4 py-2  shadow-md rounded-2xl mb-4 bg-white" >
               <Topbar token={token} setToken={setToken} />
             </div>
   
             {/* Content */}
             <div className=" overflow-y-auto   pl-0  min-h-[calc(100%-100px)]   bg-white  shadow-md rounded-2xl">
               <Routes>
                 <Route path="/" element={<Dashboard  setToken={setToken}/>} />
                 <Route path="/ADDproduct" element={<AddProduct setToken={setToken} />} />
                 <Route path="/listProducts" element={<List  token={token} setToken={setToken} />} />
                 <Route path="/Orders" element={<Orders setToken={setToken} />} />
                 <Route path="/HomeBunners" element={<HomeBunners setToken={setToken} />} />
                 <Route path="/ManageAdmins" element={<ManageAdmins setToken={setToken} />} />
                 <Route path="/ManageUsers" element={<ManageUsers setToken={setToken} />} />
                 <Route path="/WebsiteInfoSetting" element={<WebsiteInfoSetting setToken={setToken} collapsed={collapsed} />} />
               </Routes>
             </div>
           </div>
         </div>
       </BrowserRouter>
        )}

    </main>
  );
}
