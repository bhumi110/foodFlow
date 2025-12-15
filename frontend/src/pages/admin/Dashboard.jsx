import { useEffect, useState } from "react";
import {
  Box,
  Card,
  Grid,
  Typography,
  Divider,
} from "@mui/material";

import {
  getAllUsers,
  getAllRestaurants,
  getAllOrders,
} from "../../api/admin.api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    restaurants: 0,
    orders: 0,
    revenue: 0,
    pending: 0,
    completed: 0,
    cancelled: 0,
  });

  useEffect(() => {
    const load = async () => {
      const usersRes = await getAllUsers();
      const restaurantsRes = await getAllRestaurants();
      const ordersRes = await getAllOrders();

      const orders = ordersRes.data;

      let revenue = 0,
        pending = 0,
        completed = 0,
        cancelled = 0;

      orders.forEach((o) => {
        revenue += o.totalPrice;
        if (o.status === "pending") pending++;
        if (o.status === "completed") completed++;
        if (o.status === "cancelled") cancelled++;
      });

      setStats({
        users: usersRes.data.length,
        restaurants: restaurantsRes.data.length,
        orders: orders.length,
        revenue,
        pending,
        completed,
        cancelled,
      });
    };

    load();
  }, []);

  return (
    <Box>
      {/* Header */}
      <Typography variant="h4" fontWeight="600" mb={1}>
        Dashboard
      </Typography>
      <Typography color="text.secondary" mb={4}>
        System overview & platform insights
      </Typography>

      {/* KPI CARDS */}
      <Grid container spacing={3}>
        {[
          ["Total Users", stats.users],
          ["Restaurants", stats.restaurants],
          ["Total Orders", stats.orders],
          ["Revenue", `₹${stats.revenue}`],
        ].map(([label, value]) => (
          <Grid item xs={12} md={3} key={label}>
            <Card
              sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
              }}
            >
              <Typography color="text.secondary" fontSize={14}>
                {label}
              </Typography>
              <Typography variant="h4" fontWeight="600" mt={1}>
                {value}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* ORDER INSIGHTS */}
      <Card
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
          boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
        }}
      >
        <Typography variant="h6" fontWeight="600" mb={2}>
          Order Insights
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={3}>
          {[
            ["Pending Orders", stats.pending, "#f59e0b"],
            ["Completed Orders", stats.completed, "#16a34a"],
            ["Cancelled Orders", stats.cancelled, "#dc2626"],
          ].map(([label, value, color]) => (
            <Grid item xs={12} md={4} key={label}>
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: 2,
                  borderLeft: `6px solid ${color}`,
                  backgroundColor: "#fafafa",
                }}
              >
                <Typography color="text.secondary" fontSize={14}>
                  {label}
                </Typography>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  mt={1}
                  sx={{ color }}
                >
                  {value}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Card>
    </Box>
  );
}
