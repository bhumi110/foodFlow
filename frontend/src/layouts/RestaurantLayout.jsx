import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "../pages/restaurant/restaurant.css";

const RestaurantLayout = () => {
const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    navigate("/login", { replace: true });
  };

  return (
    <div className="restaurant-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h4 className="logo">FoodFlow</h4>
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
          <h6 style={{ fontWeight: "normal" }}>Restaurant Panel</h6>
        </div>

        <hr />

        <nav>
          <NavLink to="/restaurant/menu" className="nav-item">
            Menu
          </NavLink>
          <NavLink to="/restaurant/orders" className="nav-item">
            Orders
          </NavLink>
          <NavLink to="/restaurant/settings" className="nav-item">
            Settings
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <p className="email">{email || "restaurant@foodflow.com"}</p>
          <button
            className="btn btn-outline-danger btn-sm w-100"
            onClick={handleLogout}
          >
            Logout
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

export default RestaurantLayout;
