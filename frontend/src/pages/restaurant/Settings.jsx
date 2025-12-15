import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRestaurant, updateRestaurant, getRestaurantById } from "../../api/restaurant.api";

const Settings = () => {
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    address: "",
    cuisines: "",
  });

  // Fetch existing restaurant on mount
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await getRestaurantById("694006414c312a0766a85664");
        if (res.data) {
          setRestaurant(res.data);
          setForm({
            name: res.data.name || "",
            address: res.data.address || "",
            cuisines: res.data.cuisines?.join(", ") || "",
          });
        }
      } catch (err) {
        console.log("No restaurant yet");
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, cuisines: form.cuisines.split(",").map(c => c.trim()) };

    try {
      if (restaurant) {
        await updateRestaurant(restaurant._id, payload);
        alert("Changes saved successfully");
      } else {
        await createRestaurant(payload);
        alert("Restaurant created successfully");
        navigate("/restaurant");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container-fluid">
      <h2 className="mb-4">Restaurant Settings</h2>
      <div className="card p-4 col-md-8">
        <h5 className="mb-3">Restaurant Profile</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input className="form-control" name="address" value={form.address} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Cuisines (comma separated)</label>
            <input className="form-control" name="cuisines" value={form.cuisines} onChange={handleChange} />
          </div>
          <button className="btn btn-warning w-100">
            {restaurant ? "Save Changes" : "Create Restaurant"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
