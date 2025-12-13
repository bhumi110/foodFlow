import { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const MenuModal = ({ show, onHide, onSave, item }) => {
  const [form, setForm] = useState({
    name: "",
    category: "" ,
    description: "",
    price: "",
  });
const categories = ["Starter", "Main", "Dessert", "Drinks","Chinese", "Italian", "Indian", "Continental"];
  useEffect(() => {
    if (item) {
      setForm(item);
    } else {
      setForm({
        name: "",
        category: "",
        description: "",
        price: "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave({
  name: form.name,
  description: form.description,
  category: form.category,
  price: Number(form.price),
});

  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{item ? "Edit Item" : "Add Item"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Control
            className="mb-2"
            placeholder="Item name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <Form.Select
            className="mb-2"
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>

          <Form.Control
            className="mb-2"
            placeholder="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <Form.Control
            className="mb-2"
            placeholder="Price"
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="danger" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="warning" onClick={handleSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MenuModal;
