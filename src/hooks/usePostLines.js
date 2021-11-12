import api from "../api/api";

export default function usePostLines(body) {
  return api.post("/timesheetlines", body);
}
