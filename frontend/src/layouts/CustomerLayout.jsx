import { useState } from "react";

import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "../pages/restaurant/restaurant.css";

const CustomerLayout = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div className="restaurant-container">
      {/* Mobile top bar */}
      <div className="mobile-header">
        <button className="menu-btn" onClick={() => setOpen(true)}>
          <i className="fa-solid fa-bars"></i>
        </button>

        <h4 className="mobile-logo">
          <i className="fa-solid fa-utensils"></i> FoodFlow
        </h4>
      </div>

      {open && (
        <div className="sidebar-backdrop" onClick={() => setOpen(false)} />
        
      )}
      

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "open" : ""}`}>
        

        <h4 className="logo">
          <i className="fa-solid fa-utensils"></i>FoodFlow
        </h4>
        <hr />

        <div
          style={{
            border: "none",
            borderRadius: "10px",
            padding: "5px",
            backgroundColor: "#fcf0e6",
            color: "#472103",
          }}
        >
          <h6 style={{ fontWeight: "normal" }}>
            Customer Panel <i className="fa-solid fa-spoon"></i>
          </h6>
        </div>

        <hr />

        <nav>
          <NavLink
            to="/customer"
            end
            className= {({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            } onClick={() => setOpen(false)}
          >
            <i className="fa-solid fa-archway"></i> Restaurant
          </NavLink>
          <NavLink to="/customer/order" className="nav-item" onClick={() => setOpen(false)}>
            <i className="fa-solid fa-clock-rotate-left"></i> My Order
          </NavLink>
          <NavLink to="/customer/cart" className="nav-item" onClick={() => setOpen(false)}>
            <i className="fa-solid fa-cart-shopping"></i> Cart
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <hr />
          <p className="email">
            <i className="fa-solid fa-user-check"> </i>
            {email || "customer@foodflow.com"}
          </p>
          <p className="email">{role || "role"}</p>

          <button
            className="btn btn-outline-danger btn-sm w-100"
            onClick={handleLogout}
          >
            Logout <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
};

export default CustomerLayout;
