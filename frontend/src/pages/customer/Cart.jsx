import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import api from "../../api/axios";
import { createOrder } from "../../api/order.api";
import "./customer.css";

const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQty = (id) => {
    const updated = cart.map((item) =>
      item._id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id) => {
    const updated = cart
      .map((item) =>
        item._id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0);

    updateCart(updated);
  };

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const placeOrder = async () => {
  if (cart.length === 0) return;

  setPlacingOrder(true);

  try {
    const orderData = {
      restaurant: cart[0].restaurant,
      items: cart.map((item) => ({
        menuItem: item._id,
        quantity: item.qty,
      })),
      totalAmount,
    };

    await createOrder(orderData);

    localStorage.removeItem("cart");
    setCart([]);
    alert("Order placed successfully");
    navigate("/customer/order");
  } catch (err) {
    console.error("Order failed", err.response?.data || err);
    alert(err.response?.data?.msg || "Failed to place order");
  } finally {
    setPlacingOrder(false);
  }
};


  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <h2>Your Cart is Empty <i className="fa-solid fa-cart-shopping"></i></h2>
        <Button onClick={() => navigate("/customer")} variant="warning">Go Back</Button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>

      {cart.map((item) => (
        <Card key={item._id} className="mb-3 cart-card">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
              <h5>{item.name}</h5>
              <p className="text-muted">₹{item.price}</p>
            </div>

            <div className="qty-controls">
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => decreaseQty(item._id)}
              >
                <i className="fa-solid fa-minus"></i>
              </Button>

              <span className="mx-2">{item.qty}</span>

              <Button
                variant="outline-success"
                size="sm"
                onClick={() => increaseQty(item._id)}
              >
                <i className="fa-solid fa-plus"></i>
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}

      <div className="cart-summary">
        <h4>Total: ₹{totalAmount}</h4>

        <Button
          variant="warning"
          // disabled={placingOrder}
          onClick={placeOrder}
        >
          {placingOrder ? "Placing Order..." : "Place Order"}
        </Button>
      </div>
    </div>
  );
};

export default Cart;
