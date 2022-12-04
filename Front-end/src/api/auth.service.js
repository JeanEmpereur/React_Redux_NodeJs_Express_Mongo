import axios from "axios";
import qs from "qs";

const API_URL = "http://localhost:5000/";

const register = (username, password) => {
  return axios.post(API_URL + "users/register",
    qs.stringify({
      username: username,
      password: password
    }), {
      headers: { 
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
};

const login = async (username, password) => {
  const response = await axios.post(API_URL + "users/login",
    qs.stringify({
      username: username,
      password: password
    }), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", JSON.stringify(response.data.token));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

const authService = {
  register,
  login,
  logout
};

export default authService;
