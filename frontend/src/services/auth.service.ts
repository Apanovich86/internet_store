import axios from "axios";

const API_URL = "http://localhost:8092/api/auth/";

export const register = (username: string, name: string, surname: string, phone: string, email: string, password: string) => {
  return axios.post(API_URL + "signup", {
    username,
    name,
    surname,
    phone,
    email,
    password,
  });
};

export const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      //console.log("DATA_RESPONSE", response.data)
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

export const logout = () => {
  localStorage.removeItem("user");
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};
