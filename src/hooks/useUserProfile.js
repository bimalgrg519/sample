import Api from "../api/api";
import { useAccount, useMsal } from "@azure/msal-react";
import { useQuery } from "react-query";

export default function useUserProfile() {
  const { accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  const { isSuccess, data: userProfile } = useQuery(
    "useUserProfile",
    async () => {
      const { data } = await Api.get(
        `/employees?$filter=companyEmail eq '${account.username}'`
      );
      if (data.value.length) {
        return data.value[0];
      }
      return {
        employeeNo: null,
      };
    }
  );

  if (isSuccess) {
    return userProfile;
  }
  return {};
}
