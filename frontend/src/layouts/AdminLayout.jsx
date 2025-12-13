import { Box, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";

const menu = ["Dashboard", "Users", "Restaurants", "Orders"];

export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <Box display="flex">
      <Drawer variant="permanent" sx={{ width: 240 }}>
        <List sx={{ width: 240 }}>
          {menu.map((item) => (
            <ListItem
              button
              key={item}
              onClick={() => navigate(`/admin/${item.toLowerCase()}`)}
            >
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box flex={1} p={3}>
        <Outlet />
      </Box>
    </Box>
  );
}
