import React from 'react'
import "./customer.css"


const EmptyCart = ({ navigate }) => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-100 text-center">
      <div className="cart-icon mb-3">🛍️</div>
      <h4>Your cart is empty</h4>
      <p className="text-muted">
        Browse restaurants and add items to get started
      </p>
      <button
        className="btn btn-warning mt-2"
        onClick={() => navigate("/customer/restaurants")}
      >
        Browse Restaurants
      </button>
    </div>
  );
};

export default EmptyCart;
