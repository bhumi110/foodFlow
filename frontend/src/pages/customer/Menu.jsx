import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

const Menu = () => {
  return (
    <Box>
      <Typography variant="h4" mb={2}>
        Menu
      </Typography>

      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h6">Margherita Pizza</Typography>
          <Typography>₹250</Typography>
          <Button variant="contained" color="warning" sx={{ mt: 1 }}>
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Menu;
