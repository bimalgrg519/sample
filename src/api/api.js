import axios from "axios";

const bcToken = () => sessionStorage.getItem("bcToken");
const crmToken = () => sessionStorage.getItem("crmToken");
const apiUrl = () => sessionStorage.getItem("apiUrl");

const crmApiUrl = "https://orgcdc5d2c5.api.crm11.dynamics.com/api/data/v9.2";

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
      // window.location.reload();
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
  post2: (resource, data) => {
    return axios.post(crmApiUrl + resource, data, {
      headers: {
        Authorization: `Bearer ${crmToken()}`,
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
};

export default api;
