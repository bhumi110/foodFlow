import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import "./customer.css";

const Menu = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState(null);
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/restaurant/${restaurantId}`);
        setRestaurant(res.data);

        const menuRes = await api.get(`/menu/${restaurantId}/all`);
        setMenu(menuRes.data.data);
      } catch (err) {
        console.error("Failed to load menu", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [restaurantId]);

const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((i) => i._id === item._id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        ...item,
        qty: 1,
        restaurant: restaurantId,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${item.name} added to cart 🛒`);
  };

  if (loading) return <p>Loading menu...</p>;
  if (!restaurant) return <p>Restaurant not found</p>;

  return (
    <div className="menu-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="restaurant-header">
        <h1>{restaurant.name}</h1>
        <p>📍{restaurant.address}</p>
      </div>

      <h2 className="menu-title">Menu</h2>

      {menu.length === 0 && <p>No items available</p>}

      <div className="menu-grid">
        {menu.map((item) => (
          <div className="menu-card" key={item._id}>
            <div>
              <h4>{item.name}</h4>
              <p className="desc">{item.description}</p>
              <span className="category badge text-bg-danger">
                {item.category}
              </span>
            </div>

            <div className="menu-footer">
              <span className="price">₹{item.price}</span>

              <button
                className="add-btn"
                onClick={() => addToCart(item)}
              >
                ADD <i className="fa-solid fa-cart-shopping"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
