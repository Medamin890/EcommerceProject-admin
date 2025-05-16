import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FaBox } from "react-icons/fa"; // Assuming this is the correct icon

const Orders = ({setToken}) => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get( "http://localhost:4000/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    }
  };
  // Handle status change
  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post( "http://localhost:4000/api/order/status", {
        orderId,
        status: event.target.value,
      });
      if (response.data.success) {
        await fetchAllOrders();
        toast.success(" status updated");

      } else {
        toast.error("Error updating status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);


  return (
    <section className="px-12 pt-12">
      <h1 className="text-2xl font-bold mb-4 " >Orders Page</h1>
      <div className="overflow-auto mt-5">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-900/20 text-gray-30 regular-14 xs:regular-16 text-start py-12">
              <th className="p-1 text-center hidden sm:table-cell">Package</th>
              <th className="p-1 text-center">Order</th>
              <th className="p-1 text-center">Items</th>
              <th className="p-1 text-center">Price</th>
              <th className="p-1 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr
                key={i}
                className="border-b border-slate-900/20 text-gray-50 p-6 medium-14 text-left"
              >
                <td className="p-1 hidden sm:table-cell justify-items-center">
                  <FaBox className="text-2xl text-secondary" />
                </td>
                <td className="p-1">
                  <div className="py-2">
                    <p>
                      {order.items.map((item, index) => {
                        if (index === order.items.length - 1) {
                          return `${item.name} x ${item.quantity}`;
                        } else {
                          return `${item.name} x ${item.quantity}, `;
                        }
                      })}
                    </p>
                  </div>
                  <hr className="w-1/2" />
                  <div>
                    <h5 className="medium-15">
                      {order.address.firstName} {order.address.lastName}
                    </h5>
                    <div>
                      <p>{order.address.street},</p>
                      <p>
                        {order.address.city}, {order.address.state},{" "}
                        {order.address.country} - {order.address.zipcode}
                      </p>
                    </div>
                    <p>{order.address.phone}</p>
                  </div>
                </td>
                <td className="p-1 text-center  w-24">{order.items.length}</td>
                <td className="p-1 text-center w-24">${order.amount}</td>
                <td className="p-1 text-center w-40">
                  <select
                    onChange={(event) => statusHandler(event, order._id)}
                    value={order.status}
                    name="status"
                    className="bg-white rounded-md  ring-offset-blue-500 ring-2 text-sm max-w-24 xl:max-w-32 cursor-pointer"
                  >
                    <option value="Product Loading">Product Loading</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Orders;
