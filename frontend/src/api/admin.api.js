import api from "./axios";

export const adminLogin=(data) => api.post("/admin/login",data);

export const getAllUsers = () => api.get("/admin/users");

export const getAllRestaurants = () => api.get("/admin/restaurants");

export const getAllOrders = () => api.get("/admin/orders");
