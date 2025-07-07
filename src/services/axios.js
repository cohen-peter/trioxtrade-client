import axios from "axios";

// creates easier access to the backend by just calling api
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// sets the authorization headers automatically to access protected routes
export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;