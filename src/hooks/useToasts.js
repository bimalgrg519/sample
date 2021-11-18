import { useToasts as reactToasts } from "react-toast-notifications";

export default function useToasts() {
  const { addToast } = reactToasts();

  return {
    successToast: (message) => addToast(message, { appearance: "success" }),
    errorToast: (message) => addToast(message, { appearance: "error" }),
  };
}
