import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const getAllAssignments = () => API.get("/assignments");
export const getAssignmentById = (id) => API.get(`/assignments/${id}`);
export const getAssignmentSchema = (id) => API.get(`/assignments/${id}/schema`);