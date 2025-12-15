import { useEffect, useState } from "react";
import { Card, Chip, Box, Typography, Divider } from "@mui/material";
import { getAllOrders } from "../../api/admin.api";

export default function AdminOrder() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await getAllOrders();
      setOrders(res.data || []);
    };
    load();
  }, []);

  const sections = [
    { title: "Active Orders", statuses: ["pending", "confirmed", "preparing", "out-for-delivery"] },
    { title: "Completed Orders", statuses: ["completed"] },
    { title: "Cancelled Orders", statuses: ["cancelled"] },
  ];

  const getChipColor = (status) => {
    if (status === "completed") return "success";
    if (status === "cancelled") return "error";
    return "warning";
  };

  return (
    <>
      <Typography variant="h4" mb={4}>
        Orders Overview
      </Typography>

      {orders.length === 0 && (
        <Typography color="text.secondary">
          No orders found
        </Typography>
      )}

      {sections.map(({ title, statuses }) => {
        const filtered = orders.filter((o) =>
          statuses.includes(o.status)
        );

        if (filtered.length === 0) return null;

        return (
          <Box key={title} mb={4}>
            <Typography
              variant="h6"
              fontWeight={600}
              mb={2}
              sx={{ textTransform: "uppercase", letterSpacing: 1 }}
            >
              {title}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {filtered.map((o) => (
              <Card
                key={o._id}
                sx={{
                  p: 2,
                  mb: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderLeft: `5px solid ${
                    o.status === "completed"
                      ? "#16a34a"
                      : o.status === "cancelled"
                      ? "#dc2626"
                      : "#f59e0b"
                  }`,
                }}
              >
                {/* LEFT */}
                <Box>
                  <Typography fontWeight={600}>
                    #{o._id.slice(-8)}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    <strong>{o.customer?.name}</strong>{" "}
                    <i className="fa-solid fa-arrow-right-long"></i>{" "}
                    <strong>{o.restaurant?.name}</strong>
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {new Date(o.createdAt).toLocaleDateString()}
                  </Typography>

                  <Typography mt={0.5} fontWeight={600}>
                    ₹{o.totalPrice}
                  </Typography>
                </Box>

                {/* RIGHT */}
                <Chip
                  label={o.status}
                  color={getChipColor(o.status)}
                  sx={{ textTransform: "capitalize" }}
                />
              </Card>
            ))}
          </Box>
        );
      })}
    </>
  );
}
