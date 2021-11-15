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

      // const token =
      // "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCIsImtpZCI6Imwzc1EtNTBjQ0g0eEJWWkxIVEd3blNSNzY4MCJ9.eyJhdWQiOiJodHRwczovL2FwaS5idXNpbmVzc2NlbnRyYWwuZHluYW1pY3MuY29tIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvODQ3MmU1ZmUtMzIxMS00MDI5LTljYmItYmJjOGFiMWRiZTcyLyIsImlhdCI6MTYzNjk2NTYyMCwibmJmIjoxNjM2OTY1NjIwLCJleHAiOjE2MzY5Njk1MjAsImFpbyI6IkUyWmdZRWd3WTVQMVdyN01mbUxCTElrWkY2UXpBUT09IiwiYXBwaWQiOiJjZTQ0MjY3YS0zNjg2LTQ3MzAtODUyNi01MzJiZmVkYzdkZDkiLCJhcHBpZGFjciI6IjEiLCJpZHAiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84NDcyZTVmZS0zMjExLTQwMjktOWNiYi1iYmM4YWIxZGJlNzIvIiwiaWR0eXAiOiJhcHAiLCJvaWQiOiI3MDAwZWY3Ny04NDFiLTQ1ZGYtOTE2My0xZWJlZWJjN2QwYmIiLCJyaCI6IjAuQVhRQV91VnloQkV5S1VDY3U3dklxeDItY25vbVJNNkdOakJIaFNaVEtfN2NmZGwwQUFBLiIsInJvbGVzIjpbIkF1dG9tYXRpb24uUmVhZFdyaXRlLkFsbCIsImFwcF9hY2Nlc3MiLCJBUEkuUmVhZFdyaXRlLkFsbCJdLCJzdWIiOiI3MDAwZWY3Ny04NDFiLTQ1ZGYtOTE2My0xZWJlZWJjN2QwYmIiLCJ0aWQiOiI4NDcyZTVmZS0zMjExLTQwMjktOWNiYi1iYmM4YWIxZGJlNzIiLCJ1dGkiOiIxMUh5eW5yV3NFZVVWVFhzN3dJTUFBIiwidmVyIjoiMS4wIn0.Qeifd2AKlsEi2dsWKyTS24xAGYMWHPx48Q2kEpxfft4LAh8bNBfs5WSKGlopTUVZtUgiHbd0oIug7t0hAyYdUGd8gQS6tCqszIArKDJwQhnVDN0ZAkHzA33B7eBOBisZ_k7F2i9V9SGVTfFJ4qwapMKwevRJe9hWmkc4J5GQHxb6k7pTKkRuqPMXPEYBOdLGTA03TYaMMGy9CzZgiFzO8ShPbY7fLqm5V6mDLBzddTu3L1GHmCgNMYcUAmqSeVfj9G3PwH0TTdTLHzURJ6_gXJuvgv2qnaYB8Uc0RZBVx3fGBH7SDei6qqTQJ9k2L5jRl17JT-i-BSAtOS1icdCgBg";
      // sessionStorage.setItem("bcToken", token);
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
