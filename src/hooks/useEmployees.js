import { useQuery } from "react-query";
import api from "../api/api";

const getEmployees = async (filters) => {
  const { data } = await api.get(`/employees${filters ? filters : ""}`);
  return data.value;
};

export default function useEmployees(filters) {
  return useQuery(["employees", filters], () => getEmployees(filters));
}
