import api from "./axios";

export const createMenuItem = (restaurantId, data) =>
  api.post(`/menu/${restaurantId}/create`, data);

export const getMenuItems = (restaurantId) =>
  api.get(`/menu/${restaurantId}/all`);

export const updateMenuItem = (id, data) =>
  api.put(`/menu/${id}`, data);

export const deleteMenuItem = (id) =>
  api.delete(`/menu/${id}`);
