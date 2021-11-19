import api from "../api/api";

export default function useBatchHeadersAndLines(body) {
  return api.batch(body);
}
