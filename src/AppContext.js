import React, { useEffect, useState, useContext } from "react";
import useAuthentication from "./hooks/useAuthentication";
import useCredentialsFromAzure from "./hooks/useCredentialsFromAzure";
import { Loader } from "./components";
import { COMPANY_ID } from "./constants/constants";
import { useMsal } from "@azure/msal-react";

export const Context = React.createContext();

export const AppContextProvider = ({ children }) => {
  const [isAppLoading, setIsAppLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const { instance } = useMsal();

  const [userCode, setUserCode] = useState(null);

  const token = useAuthentication();
  const { data: credentialsFromAzureData, error } =
    useCredentialsFromAzure(token);

  useEffect(() => {
    if (credentialsFromAzureData) {
      const {
        appTag,
        baseUrl,
        msapiVersion,
        envName,
        tenantID,
        tokenData: { access_token },
        crmToken: { access_token: crm_access_token },
      } = credentialsFromAzureData;

      const token =
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCIsImtpZCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCJ9.eyJhdWQiOiJodHRwczovL2FwaS5idXNpbmVzc2NlbnRyYWwuZHluYW1pY3MuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvODQ3MmU1ZmUtMzIxMS00MDI5LTljYmItYmJjOGFiMWRiZTcyLyIsImlhdCI6MTYzNjcxNjAxNSwibmJmIjoxNjM2NzE2MDE1LCJleHAiOjE2MzY3MTk5MTUsImFpbyI6IkUyWmdZTWg0c3JyNWlkQ1VwZnN6MWFZVk1uODdCZ0E9IiwiYXBwaWQiOiJjZTQ0MjY3YS0zNjg2LTQ3MzAtODUyNi01MzJiZmVkYzdkZDkiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84NDcyZTVmZS0zMjExLTQwMjktOWNiYi1iYmM4YWIxZGJlNzIvIiwiaWR0eXAiOiJhcHAiLCJvaWQiOiI3MDAwZWY3Ny04NDFiLTQ1ZGYtOTE2My0xZWJlZWJjN2QwYmIiLCJyaCI6IjAuQVhRQV91VnloQkV5S1VDY3U3dklxeDItY25vbVJNNkdOakJIaFNaVEtfN2NmZGwwQUFBLiIsInJvbGVzIjpbIkF1dG9tYXRpb24uUmVhZFdyaXRlLkFsbCIsImFwcF9hY2Nlc3MiLCJBUEkuUmVhZFdyaXRlLkFsbCJdLCJzdWIiOiI3MDAwZWY3Ny04NDFiLTQ1ZGYtOTE2My0xZWJlZWJjN2QwYmIiLCJ0aWQiOiI4NDcyZTVmZS0zMjExLTQwMjktOWNiYi1iYmM4YWIxZGJlNzIiLCJ1dGkiOiJoNFpvUnVvdHowQ3BRa0plWlk1MEFBIiwidmVyIjoiMS4wIn0.nvXgVMrfCDWsRcQjaF5MDoMCrX41CHxVVLKPnxPp3MaXNezwxzHn3QeN0mGiOho7mJK5fqFF6de5-4-w6blMhawGAhfjummOgG-iL1URNbuDABAOqSwO0rRc_yz9uqa13mbPtTqNV_1D9KLLFnm9Fa4ECfMdtx8BoX-pwyfEitq6LeL0BXYScddm7rBRy6ReB0vyuomv69BGJWr7fJmRazWbI3HsipMx8NnxOydpq9xUs2DDbrROShCVsm_DvuJbdI-F7NTvOz1_r8kzN2h7jH3ZTNcTy4IXxm12QeqwAxig8iDh_J_2MxOXA7UovaekFMBfuCWXVYxRrNnbrcW_UA";

      sessionStorage.setItem("bcToken", token);
      // sessionStorage.setItem("crmToken", crm_access_token);
      // sessionStorage.setItem(
      //   "apiUrl",
      //   `${baseUrl}/${msapiVersion}/${tempTenantID}/${envName}/${appTag}/companies(${COMPANY_ID})`
      // );

      sessionStorage.setItem(
        "apiUrl",
        `https://api.businesscentral.dynamics.com/v2.0/8472e5fe-3211-4029-9cbb-bbc8ab1dbe72/TTTEnergySB/api/dogma/payroll/v1.0/companies(${COMPANY_ID})`
      );

      setInitialLoading(false);
    }
  }, [credentialsFromAzureData]);

  if (error) {
    return (
      <div className="flex flex-col items-center pt-4">
        <p className="font-semibold">{error.response.data}</p>
        <button
          onClick={() => {
            instance.logoutRedirect();
            sessionStorage.clear();
          }}
          className="btn btn-primary mt-4"
        >
          Logout
        </button>
      </div>
    );
  }

  if (initialLoading) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <Loader />
        <p className="mt-2 font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <Context.Provider
      value={{
        userCode,
        setUserCode,
        setIsAppLoading,
        isManager,
        setIsManager,
      }}
    >
      {children}
      {isAppLoading && (
        <div className="absolute top-0 flex justify-center items-center bg-white bg-opacity-30 w-full h-full">
          <Loader />
        </div>
      )}
    </Context.Provider>
  );
};

export const useContextConsumer = () => {
  return useContext(Context);
};
