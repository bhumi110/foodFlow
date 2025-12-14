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
        <h4 className="logo"><i class="fa-solid fa-utensils"></i>FoodFlow</h4>
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
          <h6 style={{ fontWeight: "normal" }}>Restaurant Panel <i class="fa-solid fa-bowl-rice"></i></h6>
        </div>

        <hr />

        <nav>
          <NavLink
  to="/restaurant"
  end
  className={({ isActive }) =>
    isActive ? "nav-item active" : "nav-item"
  }
>
  <i className="fa-solid fa-archway"></i> Restaurant
</NavLink>
          <NavLink to="/restaurant/orders" className="nav-item">
            <i class="fa-solid fa-basket-shopping"></i> Orders
          </NavLink>
          <NavLink to="/restaurant/settings" className="nav-item">
            <i class="fa-solid fa-gears"></i> Settings
          </NavLink>
        </nav>

        <div className="sidebar-footer">
          <hr/>
          <p className="email"><i class="fa-solid fa-user-check"></i> {email || "restaurant@foodflow.com"}</p>
          <p className="email">{role || "role"}</p>
          
          <button
            className="btn btn-outline-danger btn-sm w-100"
            onClick={handleLogout}
          >
            Logout <i class="fa-solid fa-arrow-right-from-bracket"></i>
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
