import { useQuery } from "react-query";
import api from "../api/api";

const getLines = async (filters) => {
  const { data } = await api.get(`/timesheetlines${filters ? filters : ""}`);
  return data.value;
};

export default function useLines(filters) {
  return useQuery(["lines", filters], () => getLines(filters));
}
