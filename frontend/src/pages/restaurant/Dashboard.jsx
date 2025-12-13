// import { useEffect, useState } from "react";
// import { Card, Row, Col, Spinner } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { restaurantDashboard } from "../../api/restaurant.api";

// const RestaurantDashboard = () => {
//   const [loading, setLoading] = useState(true);
//   const [hasRestaurant, setHasRestaurant] = useState(false);
//   const [stats, setStats] = useState({
//     totalOrders: 0,
//     revenue: 0,
//     menuItems: 0,
//   });

//   useEffect(() => {
//   const fetchDashboard = async () => {
//     try {
//       const res = await getRestaurantDashboard();

//       if (!res.data.hasRestaurant) {
//         setHasRestaurant(false);
//       } else {
//         setStats({
//           totalOrders: res.data.totalOrders,
//           revenue: res.data.revenue,
//           menuItems: res.data.menuItems,
//         });
//         setHasRestaurant(true);
//       }
//     } catch (err) {
//       console.error("Dashboard fetch failed", err);
//       setHasRestaurant(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchDashboard();
// }, []);


//   if (loading) {
//     return (
//       <div className="text-center mt-5">
//         <Spinner animation="border" />
//       </div>
//     );
//   }

//   if (!hasRestaurant) {
//     return (
//       <div className="text-center mt-5">
//         <h4>You haven’t set up your restaurant yet</h4>
//         <Link to="/restaurant/settings" className="btn btn-warning mt-3">
//           Set up your restaurant
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <>
//       <h2 className="mb-4">Dashboard</h2>

//       <Row>
//         <Col md={4}>
//           <Card className="shadow-sm corner">
//             <Card.Body>
//               <Card.Title>Total Orders</Card.Title>
//               <h3>{stats.totalOrders}</h3>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col md={4}>
//           <Card className="shadow-sm corner">
//             <Card.Body>
//               <Card.Title>Revenue</Card.Title>
//               <h3>₹{stats.revenue}</h3>
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col md={4}>
//           <Card className="shadow-sm corner">
//             <Card.Body>
//               <Card.Title>Menu Items</Card.Title>
//               <h3>{stats.menuItems}</h3>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default RestaurantDashboard;
