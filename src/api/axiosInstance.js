import axios from "axios";
import { store } from "../app/store";
import { showSpinner, hideSpinner } from "../app/spinnerSlice";
import { showNotification } from "../app/notificationSlice";

export const apiAxios = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authAxios = axios.create({
  baseURL: process.env.REACT_APP_AUTH_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const tmdbAxios = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`,
    accept: "application/json",
  },
});

export const usersAxios = axios.create({
  baseURL: "https://mp50ab0ab092ba4b5729.free.beeceptor.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// const attachInterceptors = (instance, skipAuth = false) => {
//   instance.interceptors.request.use(
//     (config) => {
//       store.dispatch(showSpinner());

//       if (!skipAuth) {
//         const token = localStorage.getItem("token");

//         if (token) {
//           config.headers = {
//             ...config.headers,
//             Authorization: `Bearer ${token}`,
//           };
//         }
//       }

//       return config;
//     },
//     (error) => {
//       store.dispatch(hideSpinner());
//       return Promise.reject(error);
//     }
//   );

//   instance.interceptors.response.use(
//     (response) => {
//       store.dispatch(hideSpinner());
//       return response.data;
//     },
//     (error) => {
//       store.dispatch(hideSpinner());
//       store.dispatch(
//         showNotification({
//           message: error?.response?.data?.message || "Something went wrong",
//           type: "error",
//         })
//       );
//       return Promise.reject(error);
//     }
//   );
// };
const attachInterceptors = (instance, skipAuth = false) => {
  instance.interceptors.request.use(
    (config) => {
      store.dispatch(showSpinner());

      if (!skipAuth) {
        const token = localStorage.getItem("token");

        if (token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          };
        }
      }

      return config;
    },
    (error) => {
      store.dispatch(hideSpinner());
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (response) => {
      store.dispatch(hideSpinner());
      return response.data;
    },
    (error) => {
      store.dispatch(hideSpinner());
      store.dispatch(
        showNotification({
          message: error?.response?.data?.message || "Something went wrong",
          type: "error",
        })
      );
      return Promise.reject(error);
    }
  );
};
attachInterceptors(apiAxios);
attachInterceptors(authAxios);
attachInterceptors(usersAxios);
attachInterceptors(tmdbAxios, true);

export default apiAxios;