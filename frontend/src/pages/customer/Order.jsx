import { useEffect, useState } from "react";
import { Card, Badge, Button } from "react-bootstrap";
import { getOrdersForCustomer, cancelOrder } from "../../api/order.api";

const Orders = () => {
  // const customerId = localStorage.getItem("userId");
  const customerId="694004b34c312a0766a8565b";
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await getOrdersForCustomer(customerId);
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

  const handleCancel = async (orderId) => {
    await cancelOrder(orderId);
    fetchOrders();
  };

  const getBadgeVariant = (status) => {
    switch (status) {
      case "placed":
      case "pending":
        return "secondary";
      case "confirmed":
        return "info";
      case "preparing":
        return "warning";
      case "out-for-delivery":
        return "primary";
      case "completed":
        return "success";
      case "cancelled":
        return "danger";
      default:
        return "dark";
    }
  };

  const canCancel = (status) => {
    return !["cancelled", "completed", "out-for-delivery"].includes(status);
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
      <h2>My Orders</h2>

      {activeOrders.map((order) => (
        <Card key={order._id} className="mb-4">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <strong>Order #{order._id.slice(-6)}</strong>
              <Badge bg={getBadgeVariant(order.status)}>
                {order.status.toUpperCase()}
              </Badge>
            </div>

            <p className="text-muted mt-1">
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <p>
              <strong>From:</strong> {order.restaurant?.name}
            </p>

            <ul>
              {order.items.map((item) => (
                <li key={item._id}>
                  {item.menuItem.name} × {item.quantity}
                </li>
              ))}
            </ul>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <strong>Total: ₹{order.totalPrice}</strong>

              {canCancel(order.status) && (
                <Button
                  variant="danger"
                  onClick={() => handleCancel(order._id)}
                >
                  Cancel Order
                </Button>
              )}
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Orders;
