import api from "../api/api";

export default function usePatchLines({ id, body }) {
  console.log(id, body);
  return api.patch(`/timesheetlines(${id})`, body);
}
