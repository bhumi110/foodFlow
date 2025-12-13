import { Box, Card, CardContent, Typography } from "@mui/material";

const Orders = () => {
  return (
    <Box>
      <Typography variant="h4" mb={2}>
        My Orders
      </Typography>

      <Card>
        <CardContent>
          <Typography>Order #12345</Typography>
          <Typography>Status: Preparing</Typography>
          <Typography>Total: ₹450</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Orders;
