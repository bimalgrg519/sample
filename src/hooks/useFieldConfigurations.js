import { useQuery } from "react-query";
import api from "../api/api";

const getFieldConfigurations = async () => {
  const { data } = await api.get("/fieldconfigurations");
  return data.value;
};

export default function useFieldConfigurations() {
  return useQuery(["fieldConfigurations"], getFieldConfigurations);
}
