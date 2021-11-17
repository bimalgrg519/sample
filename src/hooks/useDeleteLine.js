import api from "../api/api";

export default function useDeleteLine(id) {
  return api.delete(`/timesheetlines(${id})`);
}
