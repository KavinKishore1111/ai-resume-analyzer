import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// REQUEST INTERCEPTOR

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("token");

    if (token) {
      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => Promise.reject(error)
);


console.log(
  "API URL:",
  import.meta.env.VITE_API_BASE_URL
);



// RESPONSE INTERCEPTOR

api.interceptors.response.use(
  (response) => response,

  (error) => {

    const token =
      localStorage.getItem("token");

    // ONLY trigger popup
    // if user was already logged in

    if (
      error.response?.status === 401 &&
      token
    ) {

      localStorage.removeItem("token");

      window.dispatchEvent(
        new Event("session-expired")
      );
    }

    return Promise.reject(error);
  }
);    

export default api;