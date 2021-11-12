import api from "../api/api";

export default function usePatchHeaders({ id, body }) {
  return api.patch(`/timesheetemployees(${id})`, body);
}
