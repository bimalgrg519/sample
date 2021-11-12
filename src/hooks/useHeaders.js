import { useQuery } from "react-query";
import api from "../api/api";

const getHeaders = async (filters) => {
  const { data } = await api.get(
    `/timesheetemployees${filters ? filters : ""}`
  );
  return data.value;
};

export default function useHeaders(filters) {
  return useQuery(["headers", filters], () => getHeaders(filters));
}
