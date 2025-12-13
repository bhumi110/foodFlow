import api from "./axios";

export const getCustomerRestaurants = () =>
  api.get("/customer/restaurants");

export const getCustomerRestaurantById = (id) =>
  api.get(`/customer/restaurant/${id}`);

export const getCustomerMenu = (restaurantId) =>
  api.get(`/customer/menu/${restaurantId}`);
