import { Outlet, NavLink, useNavigate } from "react-router-dom";
import "../pages/restaurant/restaurant.css";

const RestaurantLayout = () => {
  const navigate = useNavigate();
const email = localStorage.getItem("email");
  const role=localStorage.getItem("role");


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
        <h4 className="logo"><i className="fa-solid fa-utensils"></i>FoodFlow</h4>
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
          <h6 style={{ fontWeight: "normal" }}>Customer Panel <i className="fa-solid fa-spoon"></i></h6>
        </div>

        <hr />

        <nav>
          <NavLink
  to="/admin"
  end
  className={({ isActive }) =>
    isActive ? "nav-item active" : "nav-item"
  }
>
  <i className="fa-solid fa-archway"></i> Dashboard
</NavLink>
          <NavLink to="/customer/restaurants" className="nav-item">
            <i className="fa-solid fa-clock-rotate-left"></i> Restaurants
          </NavLink>
          <NavLink to="/customer/users" className="nav-item">
            <i className="fa-solid fa-cart-shopping"></i> Users
          </NavLink>
          <NavLink to="/customer/orders" className="nav-item">
            <i className="fa-solid fa-cart-shopping"></i> Orders
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <hr/>
          <p className="email"><i className="fa-solid fa-user-check"> </i>{email || "customer@foodflow.com"}</p>
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

export default RestaurantLayout;
