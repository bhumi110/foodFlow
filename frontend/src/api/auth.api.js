import api from "./axios";

export const admin=(data) => api.post("/auth/admin",data);
export const signup = (data) => api.post("/auth/signup", data);
export const login = (data) => api.post("/auth/login", data);
