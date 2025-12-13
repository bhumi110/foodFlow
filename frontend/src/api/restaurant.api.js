import api from "./axios";

export const createRestaurant = (data) =>
  api.post("/restaurant/create", data);

export const getRestaurants = () =>
  api.get("/restaurant/all");

export const getRestaurantById = (id) =>
  api.get(`/restaurant/${id}`);

// export const getRestaurantIdByUser = () =>
//   api.get("/restaurant/user");

export const updateRestaurant = (id, data) =>
  api.put(`/restaurant/${id}`, data);

export const deleteRestaurant = (id) =>
  api.delete(`/restaurant/${id}`);

// export const restaurantDashboard = () =>
//   api.get("/restaurant/dashboard");