import { useQuery } from "react-query";
import axios from "axios";

const AZURE_URL = "https://3ttoken.azurewebsites.net/api/GetTSConfig";

const getCredentialsFromAzure = async (token) => {
  const payloadData = JSON.stringify({
    payload: token,
  });
  const { data } = await axios.post(AZURE_URL, payloadData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export default function useCredentialsFromAzure(token) {
  return useQuery(["TsConfig", token], () => getCredentialsFromAzure(token), {
    enabled: !!token,
  });
}
