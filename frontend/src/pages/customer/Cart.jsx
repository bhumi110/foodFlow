import {
  Box,
  Typography,
  Button,
  Divider,
} from "@mui/material";

const Cart = () => {
  return (
    <Box>
      <Typography variant="h4" mb={2}>
        Cart
      </Typography>

      <Typography>Margherita Pizza x 2</Typography>
      <Typography fontWeight="bold">₹500</Typography>

      <Divider sx={{ my: 2 }} />

      <Button variant="contained" color="warning">
        Place Order
      </Button>
    </Box>
  );
};

export default Cart;
