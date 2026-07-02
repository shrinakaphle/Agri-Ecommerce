import axios from "axios";

const Api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:5000",
});



// GET all categories

export const getAllProducts = () => {
  return Api.get("/api/products");
};

export const getProductsByCategory = (id) => {
  return Api.get(`/api/products/category/${id}`);
};
export const getAllCategories =()=>{
  return Api.get(
    "/api/categories"
  );
}
  export const getProductById =(id) =>{
    return Api.get(`api/products/${id}`);
  };
  export const registerUser = (data) =>{
    return Api.post("/api/user/create", data);
  }
export const loginUser= (data) =>{
  return Api.post("/api/user/login",data);
};

export const getAllUsers = () => {

  return Api.get("/api/user/getAll");

};

export const getAllOrders = () => {

  return Api.get("/api/order");

};
// ==========================
// UPDATE PRODUCT
// ==========================

export const updateProduct = (id, data) => {
  return Api.put(
    `/api/products/${id}`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

// ==========================
// GET SINGLE PRODUCT
// ==========================

export const getSingleProduct = (id) => {
  return Api.get(`/api/products/${id}`);
};

export default Api;