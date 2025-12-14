import { useEffect, useState } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const CustomerHome = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRestaurants = async () => {
    try {
      const res = await api.get("/restaurant/all");
      setRestaurants(res.data);
    } catch (err) {
      console.error("Failed to load restaurants", err);
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-4">Discover Restaurants</h2>
      <p className="text-muted">Find your favorite food and order for delivery</p>

      <Row>
        {restaurants.length === 0 && (
          <p className="text-muted">No restaurants available</p>
        )}

        {restaurants.map((restaurant) => (
          <Col md={12} key={restaurant._id} className="mb-3">
            <Card
              className="shadow-sm"
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(`/customer/menu/${restaurant._id}`)
              }
            >
              <Card.Body className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{restaurant.name}</strong>
                  <div className="text-muted">
                    📍 {restaurant.address}
                  </div>
                </div>

                <div>
                  <span className="text-warning">
                    View Menu <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default CustomerHome;
