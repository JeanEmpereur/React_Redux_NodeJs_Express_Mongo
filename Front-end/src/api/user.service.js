import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:5000/";

const getAllUsers = () => {
  return axios.get(API_URL + "users", { headers: authHeader() });
};

const getOneUser = (id) => {
  return axios.get(API_URL + "users/" + id, { headers: authHeader() });
};

const deleteUser = (id) => {
  return axios.delete(API_URL + "users/" + id, {headers: authHeader() });
};

const updateUser = (user) => {
  return axios.put(API_URL + "users/" + user._id, user, {headers: authHeader() });
};

const userService = {
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser
};

export default userService