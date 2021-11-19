import axios from "axios";

const bcToken = () =>
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCIsImtpZCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCJ9.eyJhdWQiOiJodHRwczovL2FwaS5idXNpbmVzc2NlbnRyYWwuZHluYW1pY3MuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvODQ3MmU1ZmUtMzIxMS00MDI5LTljYmItYmJjOGFiMWRiZTcyLyIsImlhdCI6MTYzNzI5NDAxMiwibmJmIjoxNjM3Mjk0MDEyLCJleHAiOjE2MzcyOTc5MTIsImFpbyI6IkUyWmdZTWd4TUpSY05OOVFwbVRQMXM3TDhsTk1BQT09IiwiYXBwaWQiOiJjZTQ0MjY3YS0zNjg2LTQ3MzAtODUyNi01MzJiZmVkYzdkZDkiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84NDcyZTVmZS0zMjExLTQwMjktOWNiYi1iYmM4YWIxZGJlNzIvIiwiaWR0eXAiOiJhcHAiLCJvaWQiOiI3MDAwZWY3Ny04NDFiLTQ1ZGYtOTE2My0xZWJlZWJjN2QwYmIiLCJyaCI6IjAuQVhRQV91VnloQkV5S1VDY3U3dklxeDItY25vbVJNNkdOakJIaFNaVEtfN2NmZGwwQUFBLiIsInJvbGVzIjpbIkF1dG9tYXRpb24uUmVhZFdyaXRlLkFsbCIsImFwcF9hY2Nlc3MiLCJBUEkuUmVhZFdyaXRlLkFsbCJdLCJzdWIiOiI3MDAwZWY3Ny04NDFiLTQ1ZGYtOTE2My0xZWJlZWJjN2QwYmIiLCJ0aWQiOiI4NDcyZTVmZS0zMjExLTQwMjktOWNiYi1iYmM4YWIxZGJlNzIiLCJ1dGkiOiJrSlFnd1pwYTZrcUxkZVlXdHI0dEFBIiwidmVyIjoiMS4wIn0.Ob3evddxfmHlxmOEikKP_hlwwhdLpbAqbvz8AvZ69V_njdSLQx2t5lVlWseqemlVqKThDwM76eaL8zscAeBJpn_VdfFMKG5sIdsiyhKiyD4rRl_8t4VCmGC9myAFx8AviAEg4G764Z7sxhaXFh-yRZhZ763wlJ0mTlkCgjllG9zSl3dEbglZkAozBpS6VT2lAzDuR1RW-zzURk0KNa2SuNoaePD3iXf6QSzaM0n2OcvMaYjltIla80i4QmvuO_XAimaQ2VI4U5LhP5esdaaqEWXt8S5nbzt4jweGHCLGpiKJu3wIlKg7XqpewAlCIh56It4-X1_k_lizHoTmSEJCRw";
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
