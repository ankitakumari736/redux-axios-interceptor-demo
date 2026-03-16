export const API_URLS = {

  LOGIN: {
    url: "/login",
    method: "POST",
    isAuth: true,
  },

  REGISTER: {
    url: "/register",
    method: "POST",
    isAuth: true,
  },
  GET_PRODUCTS: {
    url: "/products",
    method: "GET",
  },

  GET_PRODUCT_BY_ID: {
    url: (id) => `/products/${id}`,
    method: "GET",
  },

  ADD_PRODUCT: {
    url: "/products",
    method: "POST",
  },

  UPDATE_PRODUCT: {
    url: (id) => `/products/${id}`,
    method: "PUT",
  },

  DELETE_PRODUCT: {
    url: (id) => `/products/${id}`,
    method: "DELETE",
  },
  GET_TOP_RATED_MOVIES: {
    url: (page) =>
      `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200`,
    method: "GET",
    isTmdb: true,
  },

  GET_USERS: {
    url: "/data",
    method: "GET",
    isUsers: true
  },


};
