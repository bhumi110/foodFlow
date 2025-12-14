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
  const restaurantId = "693f029aa3617013d3284f5f";

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchMenu = async () => {
  try {
    const res = await getMenuItems(restaurantId);

    setMenuItems(res.data.data);
  } catch (err) {
    console.error("Failed to fetch menu", err);
    setMenuItems([]);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchMenu();
  }, []);

  const handleSave = async (item) => {
    try {
      if (editingItem) {
        await updateMenuItem(editingItem._id, item);
      } else {
        await createMenuItem(restaurantId, item);
      }

      await fetchMenu();
      setShowModal(false);
      setEditingItem(null);
    } catch (err) {
      console.error("Save failed", err);
      alert("Save failed");
    }
  };

  const handleDelete = async (id) => {
    await deleteMenuItem(id);
    fetchMenu();
  };


  if (loading) return <p>Loading menu...</p>;

  return (
    <>
      <div className="menu-header">
        <h2>Menu Management</h2>
        <Button variant="warning" onClick={() => setShowModal(true)}>
          <i class="fa-regular fa-square-plus"></i> Add Item
        </Button>
      </div>

      <Row>
        {menuItems.length === 0 && <p>No menu items found</p>}

        {menuItems.map((item) => (
          <Col md={12} key={item._id} className="mb-3">
            <Card>
              <Card.Body className="d-flex justify-content-between">
                <div>
                  <strong>{item.name}</strong>
                  <div>
                    ₹{item.price} • {item.category}
                  </div>
                </div>

                <div>
                  <Button
                    size="sm"
                    variant="outline-warning"
                    onClick={() => {
                      setEditingItem(item);
                      setShowModal(true);
                    }}
                  >
                    <i class="fa-solid fa-pen-to-square"></i>
                  </Button>{" "}
                  <Button
                    size="sm"
                    variant="outline-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    <i class="fa-solid fa-trash-can"></i>
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
