import { Box, Card, CardContent, Typography, Grid } from "@mui/material";

const CustomerHome = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Discover Restaurants
      </Typography>

      <Grid container spacing={3}>
        {/* Restaurant Card */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ cursor: "pointer" }}>
            <CardContent>
              <Typography variant="h6">Pizza Palace</Typography>
              <Typography color="text.secondary">
                Italian, Pizza
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Empty state */}
      {/* Show this if no restaurants */}
      {/* 
      <Typography color="text.secondary">
        No restaurants found
      </Typography> 
      */}
    </Box>
  );
};

export default CustomerHome;
