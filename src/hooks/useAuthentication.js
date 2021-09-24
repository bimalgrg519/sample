import React, { useEffect } from "react";
import { useAccount, useMsal } from "@azure/msal-react";
import { loginRequest } from "../azure/authConfig";
// import { InteractionRequiredAuthError } from "@azure/msal-browser";
// import { ClientAuthError } from "msal";

const useAthentication = () => {
  const [token, setToken] = React.useState(null);

  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  // console.log(instance, accounts);
  useEffect(() => {
    const getToken = async () => {
      let tokenResponse = {};

      try {
        tokenResponse = await instance.acquireTokenSilent({
          ...loginRequest,
          account,
        });
      } catch (error) {
        const loginRequestHint = {
          ...loginRequest,
          loginHint: account?.username,
        };

        if (error.name === "InteractionRequiredAuthError") {
          // fallback to interaction when silent call fails
          tokenResponse = await instance.acquireTokenRedirect(loginRequestHint);
        }
      }
      setToken(tokenResponse.accessToken);
    };
    if (account && account.username) getToken();
  }, [account, instance]);

  return token;
};
export default useAthentication;
