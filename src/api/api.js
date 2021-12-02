import axios from "axios";

const bcToken = () => localStorage.getItem("bcToken");

const apiUrl = () => localStorage.getItem("apiUrl");
const batchApiUrl = () => localStorage.getItem("batchApiUrl");

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("interceptor errors", error.response);
    if (
      error?.response.status === 401 ||
      error?.response.data === "Token has expired."
    ) {
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

const api = {
  get: (resource) => {
    return axios.get(apiUrl() + resource, {
      headers: {
        Authorization: `Bearer ${bcToken()}`,
      },
    });
  },
  post: (resource, data) => {
    return axios.post(apiUrl() + resource, data, {
      headers: {
        Authorization: `Bearer ${bcToken()}`,
      },
    });
  },
  patch: (resource, data) => {
    return axios.patch(apiUrl() + resource, data, {
      headers: {
        Authorization: `Bearer ${bcToken()}`,
        "If-Match": "*",
      },
    });
  },
  delete: (resource) => {
    return axios.delete(apiUrl() + resource, {
      headers: {
        Authorization: `Bearer ${bcToken()}`,
      },
    });
  },
  batch: (data) => {
    return axios.post(`${batchApiUrl()}/$batch`, data, {
      headers: {
        Authorization: `Bearer ${bcToken()}`,
      },
    });
  },
};

export default api;
