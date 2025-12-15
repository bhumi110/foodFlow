import { useEffect, useState } from "react";
import { Card, Chip, Avatar, Box, Typography } from "@mui/material";
import { getAllUsers } from "../../api/admin.api";

export default function AdminUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((res) => setUsers(res.data || []));
  }, []);

  return (
    <>
      <Typography variant="h4" mb={3}>
        Manage Users
      </Typography>

      {users.map((u) => (
        <Card
          key={u._id}
          sx={{
            p: 2,
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left: Avatar + Info */}
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar src="/broken-image.jpg" />

            <Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography fontWeight={600}>
                  {u.name}
                </Typography>

                <Chip
                  size="small"
                  label={u.role}
                  sx={{
                    textTransform: "capitalize",
                    bgcolor:
                      u.role === "Admin"
                        ? "#6366f1"
                        : u.role === "Restaurant"
                        ? "#f97316"
                        : "#22c55e",
                    color: "white",
                  }}
                />
              </Box>

              <Typography variant="body2" color="text.secondary">
                {u.email}
              </Typography>
            </Box>
          </Box>

          {/* Right: Status */}
          <Chip
            label={u.isBlocked ? "Blocked" : "Active"}
            color={u.isBlocked ? "error" : "warning"}
            variant="outlined"
          />
        </Card>
      ))}
    </>
  );
}
