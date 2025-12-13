import { useEffect, useState } from "react";
import { Button, Card, Row, Col } from "react-bootstrap";
import MenuModal from "../../components/restaurant/MenuModal";
import {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "../../api/menu.api";

const Menu = () => {
  // Hardcoded restaurant ID
  const restaurantId = "693da2c6c5cd092fb065c95a";

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Fetch menu items
  const fetchMenu = async () => {
    try {
      const res = await getMenuItems(restaurantId);
      // Ensure menuItems is always an array
      setMenuItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to fetch menu", err.response?.data || err);
      alert("Failed to load menu. Check console.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  // Add or edit a menu item
  const handleSave = async (item) => {
    try {
      if (editingItem) {
        await updateMenuItem(editingItem._id, item);
      } else {
        await createMenuItem(restaurantId, item);
      }
      await fetchMenu(); // Fetch updated menu immediately
      setShowModal(false);
      setEditingItem(null);
    } catch (err) {
      console.error("Save failed", err.response?.data || err);
      alert("Failed to save menu item.");
    }
  };

  // Delete a menu item
  const handleDelete = async (id) => {
    try {
      await deleteMenuItem(id);
      await fetchMenu();
    } catch (err) {
      console.error("Delete failed", err.response?.data || err);
      alert("Failed to delete menu item.");
    }
  };

  if (loading) return <p>Loading menu...</p>;

  return (
    <>
      <div className="menu-header d-flex justify-content-between align-items-center mb-3">
        <h2>Menu Management</h2>
        <Button
          variant="warning"
          onClick={() => {
            setEditingItem(null);
            setShowModal(true);
          }}
        >
          + Add Item
        </Button>
      </div>

      <Row>
        {menuItems.length === 0 && <p>No menu items found</p>}

        {menuItems.map((item) => (
          <Col md={4} key={item._id} className="mb-4">
            <Card className="menu-card">
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <p className="text-muted">{item.category}</p>
                <p>{item.description}</p>
                <h5>₹{item.price}</h5>
                <div className="d-flex justify-content-between">
                  <Button
                    size="sm"
                    variant="outline-warning"
                    onClick={() => {
                      setEditingItem(item);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <MenuModal
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSave}
        item={editingItem}
      />
    </>
  );
};

export default Menu;
