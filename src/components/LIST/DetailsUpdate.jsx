import { Divider } from "antd";
import React, { useEffect, useState } from "react";
import { FaPlusCircle, FaTrash } from "react-icons/fa";

const DetailsUpdate = ({ subCategory, subSubCategory, details, handleChange }) => {
  // Initialize descriptionSection with details.DescriptionSection
  const [descriptionSection, setDescriptionSection] = useState(details.DescriptionSection || []);
  const [numberDesItem, setNumberDesItem] = useState(descriptionSection.length);

  const syncDescriptionSection = (updatedDescriptions) => {
    setDescriptionSection(updatedDescriptions);
    setNumberDesItem(updatedDescriptions.length);
    handleChange({ target: { name: "DescriptionSection", value: updatedDescriptions } });
    console.log("details.DescriptionSection :" + details.DescriptionSection);
    console.log("descriptionSection :" + descriptionSection);
  };

  const addDescriptionItem = () => {
    const updatedDescriptions = [...descriptionSection, { itemDescription: "", itemImage: null }];
    syncDescriptionSection(updatedDescriptions);
  };

  const removeDescriptionItem = (index) => {
    const updatedDescriptions = [...descriptionSection];
    updatedDescriptions.splice(index, 1);
    syncDescriptionSection(updatedDescriptions);
  };

  const handleDescriptionChange = (index, field, value) => {
    const updatedDescriptions = [...descriptionSection];
    updatedDescriptions[index][field] = value;
    syncDescriptionSection(updatedDescriptions);
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    const updatedDescriptions = [...descriptionSection];
    updatedDescriptions[index].itemImage = file;
    syncDescriptionSection(updatedDescriptions);
  };

  const colors = [
    "Red",
    "Green",
    "Blue",
    "Yellow",
    "Orange",
    "Purple",
    "Pink",
    "Black",
    "White",
    "Gray",
    "Brown",
    "Cyan",
    "Magenta",
  ];

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-lg rounded-md border-blue-900 border">
      <h2 className="text-2xl font-semibold mb-6">Update Product Details</h2>

     
    {/* if the product is Pc normal & pro" ,"Pc gamer  */}
    {["desktop pc", "portable pc", "Mac book pc", "desktop gamer pc", "portable gamer pc"].includes(subSubCategory) &&  (
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Operating System */}
      <div>
        <label className="block text-sm font-medium mb-1">Operating System</label>
        <select
          name="OperatingSystem"
          value={details.OperatingSystem || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-blue-500"
        >
          <option value="" disabled>Select Operating System</option>
          {["MacOS Monterey", "Chrome", "FreeDos", "macOS Big Sur", "Windows 11", "Windows 10"]
            .filter(
              (os) =>
                subSubCategory === "Mac book pc" || 
                !os.toLowerCase().includes("macos")
            )
            .map((os, index) => (
              <option key={index} value={os}>
                {os}
              </option>
            ))}
        </select>
      </div>

      {/* Processor */}
      <div>
        <label className="block text-sm font-medium mb-1">Processor</label>
        <select
          name="Processor"
          value={details.Processor || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-blue-500"
        >
          <option value="" disabled>Select Processor</option>
          {[
            "AMD Ryzen 3",
            "AMD Ryzen 5",
            "AMD Ryzen 7",
            "AMD Ryzen 9",
            "Apple M1",
            "Apple M2",
            "Apple M3 Pro",
            "Celeron Intel",
            "Intel Core i3",
            "Intel Core i5",
            "Intel Core i7",
            "Intel Core i9",
            "Intel Core Ultra 5",
            "Intel Core Ultra 7",
          ]
            .filter((processor) => {
              // If the subSubCategory is "Mac book pc", only show Apple processors
              if (subSubCategory === "Mac book pc") {
                return processor.toLowerCase().includes("apple");
              }
              // Otherwise, hide Apple processors and show all others
              return !processor.toLowerCase().includes("apple");
            })
            .map((processor, index) => (
              <option key={index} value={processor}>
                {processor}
              </option>
            ))}
        </select>
      </div>

      {/* Ref processor */}
      <div>
        <label className="block text-sm font-medium mb-1">Ref Processor</label>
        <input
          type="text"
          name="RefProcessor"
          value={details.RefProcessor || ""}
          onChange={handleChange}
          placeholder="Enter Ref Processor"
          className="w-full p-2 border rounded-md focus:outline-blue-500"
        />
      </div>

      {/*  Graphics Card  if the subsubcategry not MAC book */}
      {subSubCategory!='Mac book pc' && (    
      /* Graphics Card */
        <div>
            <label className="block text-sm font-medium mb-1">Graphics Card</label>
            <select
              name="GraphicsCard"
              value={details.GraphicsCard || ""}
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:outline-blue-500"
            >
              <option value="" disabled>Select Graphics Card</option>
          {[
            "AMD Radeon",
            "GeForce Nvidia",
            "Intel UHD Graphics",
            "Integrated Graphic"
            ].filter(
                (card) =>
                  subSubCategory === "Mac book pc" || 
                  !card.toLowerCase().includes("apple")
              )
              .map((card, index) => (
                <option key={index} value={card}>
                  {card}
                </option>
              ))}
        </select>
        </div>
      )}

      {/* Ref Graphics card */}
      <div>
        <label className="block text-sm font-medium mb-1">RefGraphicsCard</label>
        <select
          name="RefGraphicsCard"
          value={details.RefGraphicsCard || ""}
          onChange={handleChange}
          className="max-w-[230px] p-2 border rounded-md focus:outline-blue-500 "
        >
          <option value="" disabled>Select Ref Graphics Card</option>
              {[
                "AMD Radeon 660M Graphics",
                "AMD Radeon Graphics",
                "AMD Radeon integrated",
                "AMD Radeon RX 7600S, 8 GB dedicated GDDR6 memory",
                "Apple M1",
                "Apple M2",
                "Apple M3 Pro",
                "Intel Arc Graphics (Intel AI Boost NPU)",
                "Intel GMA Integrated",
                "Intel Graphics",
                "Intel HD Graphics",
                "Intel Iris Xe",
                "Intel Iris Xe Graphics",
                "Intel UHD Graphics",
                "Nvidia Geforce MX330, 2 GB Dedicated Memory",
                "NVIDIA GeForce MX550, 2 GB dedicated GDDR6 memory",
                "NVIDIA GeForce MX570, 2 GB DDR6 dedicated",
                "Nvidia GeForce RTX 2050, 4 GB dedicated GDDR6 memory",
                "Nvidia GeForce RTX 3050, 4 GB of dedicated memory",
                "Nvidia GeForce RTX 4060, 8 GB of dedicated memory",
                "NVIDIA GeForce RTX 4090, 16 GB of dedicated memory",
                "NVIDIA T600 4 GB, 4 GB dedicated GDDR6 memory",
              ]
                .filter(
                  (card) =>
                    subSubCategory === "Mac book pc" || 
                    !card.toLowerCase().includes("apple")
                )
                .map((card, index) => (
                  <option key={index} value={card}>
                    {card}
                  </option>
                ))}
            </select>
      </div>

      {/* Size Screen */}
      <div>
        <label className="block text-sm font-medium mb-1">Size Screen</label>
        <select
          name="SizeScreen"
          value={details.SizeScreen || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-blue-500"
        >
          <option value="" disabled>Select Screen Size</option>
          {["13.6\"", "13.3\"", "14\"", "15.6\"", "16\"", "17.3\"", "27\""].map((size, index) => (
            <option key={index} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      {/* Hard Disk */}
      <div>
        <label className="block text-sm font-medium mb-1">Hard Disk</label>
        <select
          name="HardDisk"
          value={details.HardDisk || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-blue-500"
        >
          <option value="" disabled>Select Hard Disk</option>
          {["256 GB SSD", "512 GB SSD","1 TB SSD", "2 TB SSD" ].map((disk, index) => (
            <option key={index} value={disk}>
              {disk}
            </option>
          ))}
        </select>
      </div>
      {/* Memoir */}
      <div>
        <label className="block text-sm font-medium mb-1">Memoir(Go)</label>
        <select
          name="Memoir"
          value={details.Memoir || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-blue-500"
        >
          <option value="" disabled>Select Memoir</option>
          {["3G", "4G", "6G", "8G", "12G","16G","32G","48G","64G"].map((Memoir, index) => (
            <option key={index} value={Memoir}>
              {Memoir}
            </option>
          ))}
        </select>
      </div>
      {/* Screen Type */}
      <div>
        <label className="block text-sm font-medium mb-1">Screen Type</label>
        <input
          type="text"
          name="ScreenType"
          value={details.ScreenType || ""}
          onChange={handleChange}
          placeholder="Enter Screen Type"
          className="w-full p-2 border  rounded-md focus:outline-blue-500" 
        />
      </div>
 
      {/* Curved Screen is subsubcategory is "desktop gamer pc" */}
      {subSubCategory!='desktop gamer pc' && (
        <div className="flex items-center">
        <input
          type="checkbox"
          name="CurvedScreen"
          checked={details.CurvedScreen || false}
          onChange={(e) => handleChange({ target: { name: "CurvedScreen", value: e.target.checked } })}
          className="h-5 w-5 cursor-pointer"
        />
        <label className="block text-sm font-medium ml-2">Curved Screen</label>
      </div>
          )}
      
      {/* Refresh Rate */}
      <div>
        <label className="block text-sm font-medium mb-1">Refresh Rate</label>
        <select
          name="RefreshRate"
          value={details.RefreshRate || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-blue-500"
        >
          <option value="" disabled>Select Refresh Rate</option>
          {["60Hz", "90Hz", "120Hz", "144Hz","160Hz","240Hz","360Hz","540Hz"].map((rate, index) => (
            <option key={index} value={rate}>
              {rate}
            </option>
          ))}
        </select>
      </div>

      {/* Touch Screen */}
      <div className="flex items-center">
        <input
          type="checkbox"
          name="TouchScreen"
          checked={details.TouchScreen || false}
          onChange={(e) => handleChange({ target: { name: "TouchScreen", value: e.target.checked } })}
          className="h-5 w-5 cursor-pointer"
        />
        <label className="block text-sm font-medium ml-2">Touch Screen</label>
      </div>
    </div>
    )}
    
    {/* if the product is charger pc */}
    { subSubCategory =='charger pc' && (
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Voltage */}
        <div>
        <label className="block text-sm font-medium mb-1">Voltage (v)</label>
        <input
          type="number"
          name="Voltage"
          placeholder="Enter the Voltage (Voltage)"
          value={details.Voltage  || ""}
          onChange={handleChange}
          className="w-full p-2 border  rounded-md focus:outline-blue-500" 
        />
         </div>
        {/* Refresh Rate */}
        <div>
          <label className="block text-sm font-medium mb-1">Amperage</label>
          <input
            type="number"
            name="Amperage"
            placeholder="Enter the Amperage (A)"
            value={details.Amperage || ""}
            onChange={handleChange}
            className="w-full p-2 border  rounded-md focus:outline-blue-500" 
          />
        </div>
     </div>
    )}

    {/* if the product is keyboard pc and mouse and headphones pc */}
    { ['mouse' ,'keyboard' ,'headphones pc'].includes(subSubCategory) &&  (
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       {/* Type  */}
      {subSubCategory==="keyboard"  && (
      <div>
      <label className="block text-sm font-medium mb-1">Type</label>
      <select
        name="Type"
        value={details.Type || ""}
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:outline-blue-500"
      >
        <option value="" disabled>Select Type</option>
        <option value="mechanics">Mechanics</option>
        <option value="semi-mecanique">Semi-Mecanique</option>
        <option value="not mecanique">Not Mecanique</option>
      </select>
      </div>
      )}
      {/* Connectivity */}
      <div>
        <label className="block text-sm font-medium mb-1">Connectivity</label>
        <select
          name="Connectivity"
          value={details.Connectivity || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-blue-500"
        >
          <option value="" disabled>Select Connectivity</option>
          <option value="wireless">Wireless</option>
          <option value="Usb Cable">USB Cable</option>
        </select>
      </div>
      {/* Gamer */}
       <div className={` flex items-center !mt-1 ${ ['mouse' ,'headphones pc'].includes(subSubCategory) ? 'md:!mt-7' : 'mt-5'}`}>
        <input
          type="checkbox"
          name="Gamer"
          checked={details.Gamer || false}
          onChange={(e) => handleChange({ target: { name: "Gamer", value: e.target.checked } })}
          className="h-5 w-5 cursor-pointer"
        />
       <label className=" block text-sm font-medium ml-4">Gaming device</label>
      </div>
    </div>
    )}
     
    {/* if the product is phone or tablet */} 
     {["phone", "tablet"].includes(subCategory) && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Double Sim */}
        <div className="flex items-center mt-3">
          <input
            type="checkbox"
            name="DoubleSIM"
            checked={details.DoubleSIM || false}
            onChange={(e) => handleChange({ target: { name: "DoubleSIM", value: e.target.checked } })}
            className="h-5 w-5 cursor-pointer"
          />
          <label className="block text-sm font-medium ml-2">Double SIM</label>
        </div>
        {/* Network */}
        <div>
          <label className="block text-sm font-medium mb-1">Network</label>
          <select
            name="Network"
            value={details.Network || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          >
            <option value="" disabled>Select a network</option>
            {["6G", "5G", "4G", "3G"].map((network, index) => (
              <option key={index} value={network}>
                {network}
              </option>
            ))}
          </select>
        </div>
        {/* Memoir */}
        <div>
          <label className="block text-sm font-medium mb-1">Memoir(Go)</label>
          <select
            name="Memoir"
            value={details.Memoir || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          >
            <option value="" disabled>Select Memoir</option>
            {["3G", "4G", "6G", "8G", "12G"].map((Memoir, index) => (
              <option key={index} value={Memoir}>
                {Memoir}
              </option>
            ))}
          </select>
        </div>
        {/*  storage*/}
        <div>
          <label className="block text-sm font-medium mb-1">Storage (Go)</label>
          <select
            name="Storage"
            value={details.Storage || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          >
            <option value="" disabled>Select Storage</option>
            {["32", "64", "128", "256", "512"].map((Storage, index) => (
              <option key={index} value={Storage}>
                {Storage}
              </option>
            ))}
          </select>
        </div>
        {/* Screen */}
        <div>
          <label className="block text-sm font-medium mb-1">Screen</label>
          <input
            type="text"
            name="Screen"
            value={details.Screen || ""}
            placeholder="Enter the screen"
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          />
        </div>
        {/* Processor type */}
        <div>
          <label className="block text-sm font-medium mb-1">Processor type</label>
          <select
            name="ProcessorType"
            value={details.ProcessorType || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          >
            <option value="" disabled>Select Processor Type</option>
            {["Apple", "Déca Core", "MediaTek", "Octa Core", "Quad Core", "snapdragon"].map((processor, index) => (
              <option key={index} value={processor}>
                {processor}
              </option>
            ))}
          </select>
        </div>
        {/* Refresh Rate */}
        <div>
          <label className="block text-sm font-medium mb-1">Refresh Rate</label>
          <select
            name="RefreshRate"
            value={details.RefreshRate || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          >
            <option value="" disabled>Select Refresh Rate</option>
            {["60Hz", "90Hz", "120Hz", "144Hz"].map((rate, index) => (
              <option key={index} value={rate}>
                {rate}
              </option>
            ))}
          </select>
        </div>
        {/* System */}
        <div>
          <label className="block text-sm font-medium mb-1">System</label>
          <select
            name="System"
            value={details.System || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          >
            <option value="" disabled>Select System</option>
            {["Android", "iOS"].map((system, index) => (
              <option key={index} value={system}>
                {system}
              </option>
            ))}
          </select>
        </div>
        {/* Camera */}
        <div>
          <label className="block text-sm font-medium mb-1">Camera</label>
          <input
            type="text"
            name="Camera"
            value={details.Camera || ""}
            placeholder="Enter the camera"
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          />
        </div>
      </div>
    )}
        
    {/* if the product is ecouter phones */}
     { subSubCategory==='ecouter' && (
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Connectivity */}
        <div>
        <label className="block text-sm font-medium mb-1">Connectivity</label>
        <select
          name="Connectivity"
          value={details.Connectivity || ""}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-blue-500"
        >
          <option value="" disabled>Select Connectivity</option>
          <option value="wireless">Wireless</option>
          <option value="Usb Cable">USB Cable</option>
        </select>
      </div>
      </div>
    )}
        
    {/* if the product is charger phones */}
    { subSubCategory === 'charger' && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Type Cable */}
        <div>
          <label className="block text-sm font-medium mb-1">Type Cable</label>
          <select
            name="TypeCable"
            value={details.TypeCable || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          >
            <option value="" disabled>Select Type Cable</option>
            {["USB type c", "USB type Micro B", "Wireless"].map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {/* Fast Charger */}
        <div className=" flex items-center mt-1 md:mt-7">
          <input
            type="checkbox"
            name="fastCharger"
            checked={details.fastCharger || false}
            onChange={(e) => handleChange({ target: { name: "fastCharger", value: e.target.checked } })}
            className="h-5 w-5 cursor-pointer"
          />
        <label className="block text-sm font-medium ml-4">Fast Charger</label>
        </div>

        {/* Charger speed(W) */}
        {details.fastCharger && (
          <div>
          <label className="block text-sm font-medium mb-1">Charger speed(W)</label>
          <select
            name="FastCharger"
            value={details.FastCharger || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          >
            <option value="" disabled>Select Fast Charger</option>
            {["15W", "18W", "20W", "25W", "30W", "45W", "65W"].map((power, index) => (
              <option key={index} value={power}>
                {power}
              </option>
            ))}
          </select>
        </div>



        )}
      </div>
    )}
            
    {/* if the product is powerbank */}
    { subSubCategory==='powerbank' && (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {/* Type Cable */}
    <div>
      <label className="block text-sm font-medium mb-1">Type Cable</label>
      <select
        name="TypeCable"
        value={details.TypeCable || ""}
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:outline-blue-500"
      >
        <option value="" disabled>Select Type Cable</option>
        {["USB type c", "USB type Micro B"].map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
    {/* Capacity */}
    <div>
      <label className="block text-sm font-medium mb-1">Capacity (mAh)</label>
      <select
        name="Capacity"
        value={details.Capacity || ""}
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:outline-blue-500"
      >
        <option value="" disabled>Select Capacity</option>
        {["5000mAh", "10000mAh", "15000mAh", "20000mAh", "25000mAh"].map((capacity, index) => (
          <option key={index} value={capacity}>
            {capacity}
          </option>
        ))}
      </select>
    </div>
    {/* Fast powerbank */}
    <div className=" flex items-center mt-1 md:mt-7">
      <input
        type="checkbox"
        name="fastpowerbank"
        checked={details.fastpowerbank || false}
        onChange={(e) => handleChange({ target: { name: "fastpowerbank", value: e.target.checked } })}
        className="h-5 w-5 cursor-pointer"
      />
    <label className="block text-sm font-medium ml-4">Fast powerbank</label>
    </div>

    {/* is the  powerbank is fast speed(W) */}
    {details.fastpowerbank && (
      <div>
      <label className="block text-sm font-medium mb-1">Charger speed(W)</label>
      <select
        name="FastCharger"
        value={details.FastCharger || ""}
        onChange={handleChange}
        className="w-full p-2 border rounded-md focus:outline-blue-500"
      >
        <option value="" disabled>Select Fast Charger</option>
        {["15W", "18W", "20W", "25W", "30W", "45W", "65W"].map((power, index) => (
          <option key={index} value={power}>
            {power}
          </option>
        ))}
      </select>
    </div>



    )}

   </div>
    )}

    {/* if the product is washing machine */}
    {subCategory === 'washing machine' && (
      <div> 
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Wiping speed */}
        <div>
          <label className="block text-sm font-medium my-1">Wiping speed</label>
          <select
            name="WipingSpeed"
            value={details.WipingSpeed || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          >
            <option value="" disabled>Select Wiping Speed</option>
            {[ "1400 R/min","1200 R/min","1000 R/min", "1200 R/min", "1400 R/min", "700 R/min", "800 R/min"].map((speed, index) => (
              <option key={index} value={speed}>
                {speed}
              </option>
            ))}
          </select>
        </div>
        {/* Number of Programs */}
        <div>
          <label className="block text-sm font-medium my-1">Number of Programs</label>
          <select
            name="NumberOfPrograms"
            value={details.NumberOfPrograms || ""}
            onChange={handleChange}
            className="w-[240px] p-2 border rounded-md focus:outline-blue-500 "
          >
            <option value="" disabled>Select Number of Programs</option>
            {[ 5, 6, 7, 7.5, 8, 9, 10, 10.5, 12, 14, 15, 16, 17, 18, 19 ].map((program, index) => (
              <option key={index} value={program}>
                {program}
              </option>
            ))}
          </select>
        </div>
        {/* Type */}
        <div>
          <label className="block text-sm font-medium my-1">Type</label>
          <select
            name="Type"
            value={details.Type || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          >
            <option value="" disabled>Select Type</option>
            {["Cap", "Frontal"].map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {/* Capacity of washing (Kg) */}
        <div>
          <label className="block text-sm font-medium my-1">Capacity of washing (Kg)</label>
          <select
            name="CapacityOfWashing"
            value={details.CapacityOfWashing || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          >
            <option value="" disabled>Select Capacity</option>
            {[5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((capacity, index) => (
              <option key={index} value={capacity}>
                {capacity}
              </option>
            ))}
          </select>
        </div>
        </div>
        <div className="grid  grid-cols-1 xs:grid-cols-3 gap-x-1 p-0 mt-2 ">
        {/* Steam function */}
        <div className="flexStart" >
        <div className="flex items-center mt-5 p-0  ">
          <input
            type="checkbox"
            name="SteamFunction"
            checked={details.SteamFunction || false}
            onChange={(e) => handleChange({ target: { name: "SteamFunction", value: e.target.checked } })}
            className="h-5 w-5 cursor-pointer"
          />
          <label className="block text-sm font-medium ml-2">Steam function</label>
        </div>
        </div>
        {/* Displayer */}
        <div className="xs:flexCenter  flexStart">
        <div className="flex items-center mt-5 p-0 ">
          <input
            type="checkbox"
            name="Displayer"
            checked={details.Displayer || false}
            onChange={(e) => handleChange({ target: { name: "Displayer", value: e.target.checked } })}
            className="h-5 w-5 cursor-pointer"
          />
          <label className="block text-sm font-medium ml-2">Displayer</label>
        </div>
        </div>  
        {/* Invert */}
        <div className="xs:flexEnd flexStart">
          <div className="flex items-center mt-5  p-0">
            <input
              type="checkbox"
              name="Invert"
              checked={details.Invert || false}
              onChange={(e) => handleChange({ target: { name: "Invert", value: e.target.checked } })}
              className="h-5 w-5 cursor-pointer"
            />
            <label className="block text-sm font-medium ml-4">Invert</label>
          </div>
        </div>
      </div>
    </div>
    )}

    {/* if the product is refrigerator */}
    {subCategory === 'refrigerator' && (
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            name="Type"
            value={details.Type || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          >
            <option value="" disabled>Select Type</option>
            {["Combined", "Double-doors", "Embeddable", "Side By Side", "A Door"].map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {/* Cooling system */}
        <div>
          <label className="block text-sm font-medium mb-1">Cooling system</label>
          <select
            name="CoolingSystem"
            value={details.CoolingSystem || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          >
            <option value="" disabled>Select Cooling System</option>
            {["DeFrost", "Less Frost", "NoFrost"].map((system, index) => (
              <option key={index} value={system}>
                {system}
              </option>
            ))}
          </select>
        </div>
        {/* Volume (L) */}
        <div>
          <label className="block text-sm font-medium mb-1">Volume (L)</label>
          <select
            name="Volume"
            value={details.Volume || ""}
            onChange={handleChange}
            className="w-[240px] p-2 border rounded-md focus:outline-blue-500"
          >
            <option value="" disabled>Select Volume</option>
            {[
              "Between 0 and 200 liters",
              "Between 201 and 300 litres",
              "Between 301 and 400 litres",
              "Between 401 and 500 litres",
              "Between 501 and 600 litres",
              "Between 601 litres and more"
            ].map((volume, index) => (
              <option key={index} value={volume}>
                {volume}
              </option>
            ))}
          </select>
        </div>
        {/* Invert */}
        <div className="flex items-center mt-1 md:mt-7">
          <input
            type="checkbox"
            name="Invert"
            checked={details.Invert || false}
            onChange={(e) => handleChange({ target: { name: "Invert", value: e.target.checked } })}
            className="h-5 w-5 cursor-pointer"
          />
          <label className="block text-sm font-medium ml-2">Invert</label>
        </div>
      </div>
    )}

    {/* if the product is air conditioner */}
    {subCategory === 'air conditioner' && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            name="Type"
            value={details.Type || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          >
            <option value="" disabled>Select Type</option>
            {["Hot cold", "Cold"].map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {/* Power (BTU) */}
        <div>
          <label className="block text-sm font-medium mb-1">Power (BTU)</label>
          <select
            name="Power"
            value={details.Power || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          >
            <option value="" disabled>Select Power</option>
            {["9000 BTU", "12000 BTU", "18000 BTU", "24000 BTU", "30000 BTU", "36000 BTU", "48000 BTU", "54000 BTU", "60000 BTU"].map((power, index) => (
              <option key={index} value={power}>
                {power}
              </option>
            ))}
          </select>
        </div>
        {/* Invert */}
        <div className="flex items-center my-1">
          <input
            type="checkbox"
            name="Invert"
            checked={details.Invert || false}
            onChange={(e) => handleChange({ target: { name: "Invert", value: e.target.checked } })}
            className="h-5 w-5 cursor-pointer"
          />
          <label className="block text-sm font-medium ml-2">Invert</label>
        </div>
      </div>
    )}
    {/* if the product is TV */}
    {subCategory === 'TV' && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Size Screen */}
        <div>
          <label className="block text-sm font-medium mb-1">Size Screen</label>
          <input
            type="number"
            name="SizeScreen"
            value={details.SizeScreen || ""}
            onChange={handleChange}
            placeholder="Enter Size Screen"
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          />
        </div>
        {/* Screen Type */}
        <div>
          <label className="block text-sm font-medium mb-1">Screen Type</label>
          <select
            name="ScreenType"
            value={details.ScreenType || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          >
            <option value="" disabled>Select Screen Type</option>
            {["HD", "FHD", "4K UHD", "8K UHD"].map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {/* Touch Screen */}
        <div className="flex items-center mt-5">
          <input
            type="checkbox"
            name="TouchScreen"
            checked={details.TouchScreen || false}
            onChange={(e) => handleChange({ target: { name: "TouchScreen", value: e.target.checked } })}
            className="h-5 w-5 cursor-pointer"
            
          />
          <label className="block text-sm font-medium ml-4">Touch Screen</label>

        </div>
        {/* Wifi */}
        <div className="flex items-center mt-5">
          <input
            type="checkbox"
            name="Wifi"
            checked={details.Wifi || false}
            onChange={(e) => handleChange({ target: { name: "Wifi", value: e.target.checked } })}
            className="h-5 w-5 cursor-pointer"
          />
          <label className="block text-sm font-medium ml-2">Wifi</label>
        </div>
        {/* Smart TV */}
        <div className="flex items-center mt-5">
          <input
            type="checkbox"
            name="SmartTV"
            checked={details.SmartTV || false}
            onChange={(e) => handleChange({ target: { name: "SmartTV", value: e.target.checked } })}
            className="h-5 w-5 cursor-pointer"
          />
          <label className="block text-sm font-medium ml-2">Smart TV</label>
        </div>
        {/* Integrated Receiver */}
        <div className="flex items-center mt-5">
          <input
            type="checkbox"
            name="IntegratedReceiver"
            checked={details.IntegratedReceiver || false}
            onChange={(e) => handleChange({ target: { name: "IntegratedReceiver", value: e.target.checked } })}
            className="h-5 w-5 cursor-pointer"
          />
          <label className="block text-sm font-medium ml-2">Integrated Receiver</label>
        </div>
        {/* Curved Screen */}
        <div className="flex items-center mt-5">
          <input
            type="checkbox"
            name="CurvedScreen"
            checked={details.CurvedScreen || false}
            onChange={(e) => handleChange({ target: { name: "CurvedScreen", value: e.target.checked } })}
            className="h-5 w-5 cursor-pointer"
          />
          <label className="block text-sm font-medium ml-2">Curved Screen</label>
        </div>
        {/* Refresh Rate */}
        <div>
          <label className="block text-sm font-medium mb-1">Refresh Rate</label>
          <select
            name="RefreshRate"
            value={details.RefreshRate || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          >
            <option value="" disabled>Select Refresh Rate</option>
            {["60Hz", "90Hz", "120Hz", "144Hz", "240Hz"].map((rate, index) => (
              <option key={index} value={rate}>
                {rate}
              </option>
            ))}
          </select>
        </div>
      </div>
    )}

    {/* if the product is perfume */}
    {subCategory === 'perfume' && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Type User */}
        <div>
          <label className="block text-sm font-medium mb-1">Type User</label>
          <select
            name="TypeUser"
            value={details.TypeUser || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          >
            <option value="" disabled>Select Type User</option>
            {["women", "man", "kid", "both"].map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        {/* Volume (ml) */}
        <div>
          <label className="block text-sm font-medium mb-1">Volume (ml)</label>
          <select
            name="Volume"
            value={details.Volume || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          >
            <option value="" disabled>Select Volume</option>
            {["25ml", "50ml", "75ml", "100ml", "150ml", "200ml"].map((volume, index) => (
              <option key={index} value={volume}>
                {volume}
              </option>
            ))}
          </select>
        </div>
      </div>
    )}

    {/* if the product is care */}
    {subCategory === 'care' && (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Age Range */}
        <div>
          <label className="block text-sm font-medium mb-1">Age Range</label>
          <select
            name="AgeRange"
            value={details.AgeRange || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          >
            <option value="" disabled>Select Age Range</option>
            {["adult", "young", "kid"].map((age, index) => (
              <option key={index} value={age}>
                {age}
              </option>
            ))}
          </select>
        </div>
        {/* Volume (ml) */}
        <div>
          <label className="block text-sm font-medium mb-1">Volume (ml)</label>
          <select
            name="Volume"
            value={details.Volume || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          >
            <option value="" disabled>Select Volume</option>
            {["25ml", "50ml", "75ml", "100ml", "150ml", "200ml", "250ml", "300ml", "400ml", "500ml"].map((volume, index) => (
              <option key={index} value={volume}>
                {volume}
              </option>
            ))}
          </select>
        </div>
      </div>
    )}

    {/* color & waranty  */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
      {/* Warranty */}
      <div>
        <label className="block text-sm font-medium mb-1">Warranty</label>
        <input
          type="number"
          name="waranty"
          value={details.waranty || ""}
          onChange={handleChange}
          placeholder="Enter Warranty"
          className="w-full p-2 border  rounded-md focus:outline-blue-500" 
        />
      </div>
      {/* Color */}
      <div>
        <label className="block text-sm font-medium mb-1">Color</label>
        <select
          id="color"
          name="color"
          value={details.color || ""}
          onChange={handleChange}
          className="w-full p-2 border  rounded-md focus:outline-blue-500" 
        >
          <option value="" disabled >
            Select a color
          </option>
          {colors.map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
    </div>   
      
      {/* ... */}

      {/* Dynamic Description Section */}
      <h3 className="text-xl font-semibold mt-4">Description Section(s):</h3>
      {descriptionSection.map((item, index) => (
        <div key={index} className="mt-4">
          <label className="block text-sm font-medium mb-2">Image {index + 1}</label>
          <div className="flexCenter">
            <div className="relative h-24 w-[90%]">
              <label
                htmlFor={`file-input-${index}`}
                className="flex flex-col items-center justify-center w-full h-full bg-gray-100 border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transform duration-300"
              >
                {item.itemImage ? (
                <img
                src={
                     item.itemImage instanceof File
                        ?  URL.createObjectURL(item.itemImage)
                        : item.itemImage
                   }
                alt="Preview"
                className="w-full h-full object-cover rounded-lg"
                />
              ) : (       
                  <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 15a4 4 0 01.88-2.5M3 15a4 4 0 004 4h10m5-5a4 4 0 00-.88-2.5M21 15a4 4 0 01-4 4H7m10-10V3m0 0l-3 3m3-3l3 3"
                    />
                  </svg>
                  <span className="mt-2 text-sm text-gray-600">Upload</span>
                </>
                )}
                <input
                  id={`file-input-${index}`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, index)}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Description Section */}
          <div>
            <label className="block text-sm font-medium my-2">Description {index + 1}</label>
            <div className="flexCenter">
              <textarea
                placeholder={`Enter productDescription ${index + 1}`}
                value={item.itemDescription}
                onChange={(e) => handleDescriptionChange(index, "itemDescription", e.target.value)}
                className="p-2 border rounded-md focus:outline-blue-500 h-24 w-[90%]"
              />
            </div>
          </div>

          {/* Remove Button */}
          <button type="button" onClick={() => removeDescriptionItem(index)}>
            <p className="mt-2 text-red-600 underline hover:text-red-400 hover:scale-105 flexBetween gap-2">
              <FaTrash /> Remove this section
            </p>
          </button>
        </div>
      ))}

      {/* Add Description Section */}
      <Divider className="bg-black" />
      <p className="mt-4 text-gray-600">Total Description Items: {numberDesItem}</p>
      <div className="flex gap-x-2">
        <p className="py-2 text-blue-500">
          {numberDesItem > 0
            ? "Do you want to add another description section?"
            : "Do you want to add a description section?"}
        </p>
        <button
          type="button"
          onClick={addDescriptionItem}
          className="bg-blue-500 w-16 flex items-center justify-center text-white gap-x-2 p-2 rounded-md h-7 hover:bg-blue-400 transition duration-200"
        >
          <FaPlusCircle />
          <p className="text-white">Add</p>
        </button>
      </div>
    </div>
  );
};

export default DetailsUpdate;