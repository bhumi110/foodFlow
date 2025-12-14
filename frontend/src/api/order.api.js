import api from "./axios";

export const createOrder = (data) =>
  api.post("/order/create", data);

export const cancelOrder = (orderId) =>
  api.put(`/order/cancel/${orderId}`);

export const getOrdersForCustomer = (customerId) =>
  api.get(`/order/customer/${customerId}`);

export const getOrdersForRestaurant = (restaurantId) =>
  api.get(`/order/restaurant/${restaurantId}`);

export const updateOrderStatus = (orderId, data) =>
  api.put(`/order/status/${orderId}`, data);
