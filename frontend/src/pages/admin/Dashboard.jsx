import { Box, Card, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    restaurants: 0,
    orders: 0,
  });

  useEffect(() => {
    const load = async () => {
      const users = await api.get("/admin/users");
      const restaurants = await api.get("/admin/restaurants");
      const orders = await api.get("/admin/orders");

      setStats({
        users: users.data.length,
        restaurants: restaurants.data.length,
        orders: orders.data.length,
      });
    };
    load();
  }, []);

  return (
    <Box>
      <Typography variant="h4" mb={3}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={3}>
        {[
          { label: "Total Users", value: stats.users },
          { label: "Restaurants", value: stats.restaurants },
          { label: "Orders", value: stats.orders },
        ].map((card) => (
          <Grid item xs={12} md={4} key={card.label}>
            <Card sx={{ p: 3 }}>
              <Typography variant="subtitle1">{card.label}</Typography>
              <Typography variant="h4">{card.value}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
