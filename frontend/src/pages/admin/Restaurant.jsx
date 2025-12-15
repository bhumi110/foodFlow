import { useEffect, useState } from "react";
import { Card } from "@mui/material";
import { Badge } from "react-bootstrap";

import { getAllRestaurants } from "../../api/admin.api";

export default function AdminRestaurant() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getAllRestaurants().then((res) => setRestaurants(res.data));
  }, []);

  return (
    <>
      <h2 className="mb-5">Manage Restaurants</h2>

      {restaurants.map((r) => (
        <Card key={r._id} sx={{ p: 2, mb: 2 }}>
          <strong>{r.name}</strong>
          <p>📍{r.address}</p>
          <p className="badge rounded-pill text-bg-success">Open</p>
        </Card>
      ))}
    </>
  );
}
