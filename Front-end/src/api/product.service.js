import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/";

const getAllProducts = () => {
  return axios.get(API_URL + "products", { headers: authHeader() });
};

const getOneProduct = (id) => {
  return axios.get(API_URL + "products/" + id, { headers: authHeader() });
};

const update = (data) => {
  return axios.put(API_URL + "products/" + data._id, data, { headers: authHeader() });
};

const deleteProduct = (id) => {
  return axios.delete(API_URL + "products/" + id, { headers: authHeader() });
};

const addProduct = (data) => {
  return axios.post(API_URL + "products", data, { headers: authHeader() });
};

const productService = {
  getAllProducts,
  getOneProduct,
  update,
  deleteProduct,
  addProduct,
};

export default productService;