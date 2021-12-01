import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./AppContext";
import { MsalAuthenticationTemplate, MsalProvider } from "@azure/msal-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastProvider } from "react-toast-notifications";

// MSAL imports
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "./azure/authConfig";
import App from "./App";
import { InitialLoader } from "./components";

const queryClient = new QueryClient();

export const msalInstance = new PublicClientApplication(msalConfig);

// Account selection logic is app dependent. Adjust as needed for different use cases.
const accounts = msalInstance.getAllAccounts();
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0]);
}

msalInstance.addEventCallback((event) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const account = event.payload.account;
    msalInstance.setActiveAccount(account);
  }
});

const InProgressComponent = () => {
  return <InitialLoader />;
};

const ErrorComponent = ({ error }) => {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 100,
      }}
    >
      <span>
        This is a protected page and the following error occurred during
        authentication: <strong>{error.errorCode}</strong>
      </span>
    </div>
  );
};

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <ToastProvider autoDismiss autoDismissTimeout={3000}>
        <QueryClientProvider client={queryClient}>
          <MsalProvider instance={msalInstance}>
            <MsalAuthenticationTemplate
              interactionType="redirect"
              loadingComponent={InProgressComponent}
              errorComponent={ErrorComponent}
            >
              <AppContextProvider>
                <App />
              </AppContextProvider>
            </MsalAuthenticationTemplate>
          </MsalProvider>
        </QueryClientProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
