import axios from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// GET all categories
export const getAllCategories = () => {
  return Api.get("/api/categories");
};