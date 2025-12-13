import { useEffect, useState } from "react";
import {
  getRestaurantOrders,
  updateOrderStatus,
} from "../../api/order.api";

const Orders = () => {

  const restaurantId = localStorage.getItem("restaurantId");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await getRestaurantOrders(restaurantId);
    setOrders(res.data);
  };

  const changeStatus = async (id, status) => {
    await updateOrderStatus(id, status);
    fetchOrders();
  };

  return (
  <div className="container">
    <h2 className="mb-4">Orders</h2>

    {orders.length === 0 ? (
      <div className="card text-center p-5">
        <div style={{ fontSize: "48px" }}>📦</div>
        <h5 className="mt-3">No orders yet</h5>
        <p className="text-muted">
          Orders placed by customers will appear here.
        </p>
      </div>
    ) : (
      orders.map((order) => (
        <div className="card p-3 mb-3" key={order._id}>
          <div className="d-flex justify-content-between">
            <div>
              <h6>Order #{order._id.slice(-6)}</h6>
              <p className="text-muted">
                {new Date(order.createdAt).toLocaleString()}
              </p>

              {order.items.map((item) => (
                <div key={item._id}>
                  {item.quantity}x {item.name}
                </div>
              ))}
            </div>

            <div className="text-end">
              <span
                className={`badge ${
                  order.status === "cancelled"
                    ? "bg-danger"
                    : "bg-success"
                }`}
              >
                {order.status}
              </span>

              <h5 className="mt-2">₹{order.total}</h5>
            </div>
          </div>
        </div>
      ))
    )}
  </div>
);
}

export default Orders;
