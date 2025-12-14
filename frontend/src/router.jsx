import { createBrowserRouter } from "react-router-dom";

import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AdminLogin from "./pages/admin/Login";

import AdminLayout from "./layouts/AdminLayout";
import RestaurantLayout from "./layouts/RestaurantLayout";
import CustomerLayout from "./layouts/CustomerLayout";

import AdminDashboard from "./pages/admin/Dashboard";
import RestaurantMenu from "./pages/restaurant/Menu";
import RestaurantSettings from "./pages/restaurant/Settings";
import RestaurantOrders from "./pages/restaurant/Order";

import CustomerHome from "./pages/customer/Home";
import Menu from "./pages/customer/Menu";
import Cart from "./pages/customer/Cart";
import Orders from "./pages/customer/Order";

import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  { path: "/login", element: <Login /> },
  { path: "/", element: <Signup /> },

  { path: "/admin/login", element: <AdminLogin /> },

  {
    path: "/admin",
    element: (
      
        <AdminLayout />
    ),
    children: [
      { path: "dashboard", element: <AdminDashboard /> },
    ],
  },

  {
    path: "/restaurant",
    element: (
      <ProtectedRoute role="Restaurant">
        <RestaurantLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <RestaurantMenu /> },
      { path: "orders", element: <RestaurantOrders /> },
      { path: "settings", element: <RestaurantSettings /> },
    ],
  },

  {
  path: "/customer",
  element: (
    <ProtectedRoute role="Customer">
      <CustomerLayout />
    </ProtectedRoute>
  ),
  children: [
    { index: true, element: <CustomerHome /> },
    { path: "menu/:restaurantId", element: <Menu /> },
    { path: "cart", element: <Cart /> },
    { path: "order", element: <Orders /> },
  ],
},

]);

export default router;
