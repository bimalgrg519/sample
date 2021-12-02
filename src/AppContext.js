import React, { useEffect, useState, useContext } from "react";
import useAuthentication from "./hooks/useAuthentication";
import useCredentialsFromAzure from "./hooks/useCredentialsFromAzure";
import { InitialLoader, Loader } from "./components";
import { COMPANY_ID } from "./constants/constants";
import { useMsal } from "@azure/msal-react";

export const Context = React.createContext();

export const AppContextProvider = ({ children }) => {
  const [isAppLoading, setIsAppLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isManager, setIsManager] = useState(false);
  const { instance, accounts } = useMsal();

  const [userCode, setUserCode] = useState(null);
  const [isMyTimeEntriesSelected, setIsMyTimeEntriesSelected] = useState(false);

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
      } = credentialsFromAzureData;

      const url = `${baseUrl}/${msapiVersion}/${tenantID}/${envName}/${appTag}`;

      // handle multiple tab logged out
      if (
        localStorage.getItem("loggedOut") &&
        !sessionStorage.getItem("loggedOut")
      ) {
        instance.logoutRedirect();
        localStorage.clear();
      } else {
        localStorage.setItem("bcToken", access_token);
        localStorage.setItem("apiUrl", `${url}/companies(${COMPANY_ID})`);
        localStorage.setItem("batchApiUrl", url);

        setInitialLoading(false);
      }
    }
  }, [credentialsFromAzureData, instance]);

  if (error) {
    return (
      <div className="flex flex-col items-center pt-4">
        <p className="font-semibold">{error.response.data}</p>
        <button
          onClick={() => {
            instance.logoutRedirect();
            localStorage.clear();
          }}
          className="btn btn-primary mt-4"
        >
          Logout
        </button>
      </div>
    );
  }

  if (initialLoading) {
    return <InitialLoader />;
  }

  return (
    <Context.Provider
      value={{
        userCode,
        setUserCode,
        setIsAppLoading,
        isManager,
        setIsManager,
        isMyTimeEntriesSelected,
        setIsMyTimeEntriesSelected,
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
