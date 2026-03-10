import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

export const getAllAssignments = () => API.get("/assignments");
export const getAssignmentById = (id) => API.get(`/assignments/${id}`);
export const getAssignmentSchema = (id) => API.get(`/assignments/${id}/schema`);