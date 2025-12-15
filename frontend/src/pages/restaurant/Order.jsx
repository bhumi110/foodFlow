import { useEffect, useState } from "react";
import { Card, Badge, Form } from "react-bootstrap";
import { getOrdersForRestaurant, updateOrderStatus } from "../../api/order.api";

const Order = () => {
  const restaurantId = "694006414c312a0766a85664";

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await getOrdersForRestaurant(restaurantId);
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error("Failed to load orders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const changeStatus = async (id, status) => {
    await updateOrderStatus(id, { status });
    fetchOrders();
  };

  const getBadgeVariant = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "preparing":
        return "info";
      case "out-for-delivery":
        return "primary";
      case "completed":
        return "success";
      case "cancelled":
        return "danger";
      default:
        return "secondary";
    }
  };

  if (loading) return <p>Loading orders...</p>;

  const activeOrders = orders.filter(
    (order) =>
      order.status !== "completed" &&
      order.status !== "cancelled"
  );

  if (activeOrders.length === 0)
    return <p>No active orders</p>;

  return (
    <div>
      <h2>Active Orders</h2>

      {activeOrders.map((order) => (
        <Card key={order._id} className="mb-3">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <strong>Order #{order._id.slice(-6)}</strong>

              <Badge bg={getBadgeVariant(order.status)}>
                {order.status.toUpperCase()}
              </Badge>
            </div>

            <p className="mt-2">
              <strong>Customer:</strong> {order.customer?.name}
            </p>

            <ul>
              {order.items.map((item) => (
                <li key={item._id}>
                  {item.menuItem?.name} × {item.quantity}
                </li>
              ))}
            </ul>

            <p>
              <strong>Total:</strong> ₹{order.totalPrice}
            </p>

            <Form.Select
              className="mt-2"
              value={order.status}
              onChange={(e) =>
                changeStatus(order._id, e.target.value)
              }
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="preparing">Preparing</option>
              <option value="out-for-delivery">
                Out for delivery
              </option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </Form.Select>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Order;
