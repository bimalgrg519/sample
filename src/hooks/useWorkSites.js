import { useQuery } from "react-query";
import api from "../api/api";

const getWorkSites = async (filters) => {
  const { data } = await api.get(`/worksites${filters ? filters : ""}`);
  return data.value;
};

export default function useWorkSites(filters, { enabled }) {
  return useQuery(["worksites", filters], () => getWorkSites(filters), {
    enabled,
  });
}
