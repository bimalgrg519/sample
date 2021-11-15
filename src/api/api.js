import axios from "axios";

const bcToken = () =>
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCIsImtpZCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCJ9.eyJhdWQiOiJodHRwczovL2FwaS5idXNpbmVzc2NlbnRyYWwuZHluYW1pY3MuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvODQ3MmU1ZmUtMzIxMS00MDI5LTljYmItYmJjOGFiMWRiZTcyLyIsImlhdCI6MTYzNjk3NTAxMSwibmJmIjoxNjM2OTc1MDExLCJleHAiOjE2MzY5Nzg5MTEsImFpbyI6IkUyWmdZSEJYamVpN1ZLbXh4SHpuN2hJak1kWUxBQT09IiwiYXBwaWQiOiJjZTQ0MjY3YS0zNjg2LTQ3MzAtODUyNi01MzJiZmVkYzdkZDkiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84NDcyZTVmZS0zMjExLTQwMjktOWNiYi1iYmM4YWIxZGJlNzIvIiwiaWR0eXAiOiJhcHAiLCJvaWQiOiI3MDAwZWY3Ny04NDFiLTQ1ZGYtOTE2My0xZWJlZWJjN2QwYmIiLCJyaCI6IjAuQVhRQV91VnloQkV5S1VDY3U3dklxeDItY25vbVJNNkdOakJIaFNaVEtfN2NmZGwwQUFBLiIsInJvbGVzIjpbIkF1dG9tYXRpb24uUmVhZFdyaXRlLkFsbCIsImFwcF9hY2Nlc3MiLCJBUEkuUmVhZFdyaXRlLkFsbCJdLCJzdWIiOiI3MDAwZWY3Ny04NDFiLTQ1ZGYtOTE2My0xZWJlZWJjN2QwYmIiLCJ0aWQiOiI4NDcyZTVmZS0zMjExLTQwMjktOWNiYi1iYmM4YWIxZGJlNzIiLCJ1dGkiOiJwZUhoN1dMYVpraTluYWQ0RnRrWEFBIiwidmVyIjoiMS4wIn0.Qce_XuiBA1dXAIPasJvA6_VRbH-aspOA8PhU1IOHOKsryQhFrrbPRaitOA3t1TVc5Q14qzDNCQF5ORA1JEli0IVNLsbQ0yQ5b_SqDLND7B8Yum7hEKYYahzfTRmLkYUVyMKLryPSMbY0R4R8QYkqh7tUlvuPv3uWQlGYKbfiq7Fbv1UEMLH_kbed_RjNVGZ4b0CB0yplJwylUOSOFGjV2hIwiiTo4a69P7lGGVO-FavkmjkfwZAg5nq8sNIhHzues8TRDCaUaDQL71Yg5oHN95CtrTudq36mQkatPt--GvELV1In7F8u4ClShekmJJ4BH6zuHZ2laI_hWCYgnPjXyQ";
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
