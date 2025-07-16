import React, { useState, useEffect } from "react";
import { Badge, Button, Popover, List, Typography } from "antd";
import { BellOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

const NotificationButton = () => {
  const [notifications, setNotifications] = useState([]);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const  res  = await axios.get("/api/order/list"); // Make sure this endpoint returns filtered orders
      setNotifications((res?.data?.data || []).filter((item) => item.status != "Product Loading"));
      console.log("notifications",notifications);
    } catch (error) {
      console.error("Fetch notifications failed", error);
    }
  };

 useEffect(() => {
    fetchNotifications();
  }, []);

  const content = (
    <ul className="flex flex-col min-w-[250px] max-h-[400px] overflow-y-auto">
      {notifications.length > 0 ? (
        notifications?.map((item, index) => (
        <>
          <li
          title={" View Order : "+ item._id}
          key={item._id}
          >
          <Link
              to={`/Orders/${item._id}`} 
              onClick={()=>setVisible(false)}
            >
            <div className="flex flex-col w-full hover:bg-gray-100 p-3 rounded cursor-pointer ">
              <span strong className="text-base font-bold flex items-center gap-x-2 mb-1">
                <ShoppingOutlined className="2 text-lg text-blue-500" />
                  Order #{index + 1}
              </span>
              <span className="text-orange-700 font-serif font-medium px-1">
                {item.status}  - <span className="text-xs text-gray-400">{dayjs(item.date).format("YYYY/MM/DD")} </span>
              </span>
              <span className="text-green-500 font-medium  px-1">
                ${item.amount.toFixed(2)}
              </span>
            
            </div>
            </Link>
          </li>
            <hr />
            </>
        ))
      ) : (
        <li className="text-gray-400 text-center">No recent loading orders.</li>
      )}
    </ul>
  );

  return (
    <Popover
      placement="bottomRight"
      title={<span className="text-green-900">Recent Loading Orders</span>}
      trigger="click"
      content={content}
      open={visible}
      onOpenChange={setVisible}
      className="text-blue-500"
    >
      <Badge count={notifications.length}>
        <Button  shape="circle" icon={<BellOutlined />} className="flex pt-0 outline outline-1"  title="notification recent loading orders"/>
      </Badge>
    </Popover>
  );
};

export default NotificationButton;
