import { useQuery } from "react-query";
import Api from "../api/api";

const getPayPeriods = async () => {
  const { data } = await Api.get(
    "/payperiods?$filter=payFrequency eq 'MONTHLY'"
  );
  return data.value;
};

export default function usePayPeriods() {
  return useQuery(["payPeriods"], () => getPayPeriods());
}
