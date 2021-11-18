import axios from "axios";

const bcToken = () =>
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCIsImtpZCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCJ9.eyJhdWQiOiJodHRwczovL2FwaS5idXNpbmVzc2NlbnRyYWwuZHluYW1pY3MuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvODQ3MmU1ZmUtMzIxMS00MDI5LTljYmItYmJjOGFiMWRiZTcyLyIsImlhdCI6MTYzNzIyMTY0MSwibmJmIjoxNjM3MjIxNjQxLCJleHAiOjE2MzcyMjU1NDEsImFpbyI6IkUyWmdZTkJONEpWZmxlOTJUc2wxYjhtOHBjOWpBQT09IiwiYXBwaWQiOiJjZTQ0MjY3YS0zNjg2LTQ3MzAtODUyNi01MzJiZmVkYzdkZDkiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84NDcyZTVmZS0zMjExLTQwMjktOWNiYi1iYmM4YWIxZGJlNzIvIiwiaWR0eXAiOiJhcHAiLCJvaWQiOiI3MDAwZWY3Ny04NDFiLTQ1ZGYtOTE2My0xZWJlZWJjN2QwYmIiLCJyaCI6IjAuQVhRQV91VnloQkV5S1VDY3U3dklxeDItY25vbVJNNkdOakJIaFNaVEtfN2NmZGwwQUFBLiIsInJvbGVzIjpbIkF1dG9tYXRpb24uUmVhZFdyaXRlLkFsbCIsImFwcF9hY2Nlc3MiLCJBUEkuUmVhZFdyaXRlLkFsbCJdLCJzdWIiOiI3MDAwZWY3Ny04NDFiLTQ1ZGYtOTE2My0xZWJlZWJjN2QwYmIiLCJ0aWQiOiI4NDcyZTVmZS0zMjExLTQwMjktOWNiYi1iYmM4YWIxZGJlNzIiLCJ1dGkiOiJKTGRpS0xtNF9VcTVBM09uRmJzRkFBIiwidmVyIjoiMS4wIn0.b2qr5BNxjCO7e_rnqwgcmoAJeVrGI0e7Vsh50k3SZ97P6MDWibsj19kYvyBBzmbanX_5N6jdCu1WpPz3yLfC03DqK7qLxNMKcdX6GwHfP9S_SpAUN51fptD8oK_5FO1gn3EiIKPvjiiQnLHa-dxNuXvLpvpTMthJ3MmI6WLYK94cw-WYvmxr6c6SdyYnxh7agedtKvshLMLAy0IXYvd-A9whgb9cyeBvLSWdZp0hkd5Yx13W9iklPgDFb3Q5Wp1grcioO5L6hW7d4pqfa39RizqLwAbmPrwsW_8ghf-eR27ImYx7iqArFVB4GHcalne5w9ZGh-8HYllKkcNQCuijSw";
// const bcToken = () => sessionStorage.getItem("bcToken");

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
