import React from "react";
import { BrowserRouter, useHistory } from "react-router-dom";
import { AppProvider } from "./AppContext";
import { CustomNavigationClient } from "./utils/CustomNavigationClient";
import { MsalAuthenticationTemplate, MsalProvider } from "@azure/msal-react";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ToastProvider } from "react-toast-notifications";

// MSAL imports
import { PublicClientApplication, EventType } from "@azure/msal-browser";
import { msalConfig } from "./azure/authConfig";
import App from "./App";
import { StaticHeader, Header, Loader } from "./components";

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

const InProgressComponent = ({ inProgress }) => {
  return (
    <div>
      <StaticHeader />
      <div className="flex justify-center items-center w-container mx-auto mt-8">
        <Loader />
        <p className="ml-4 font-semibold">{inProgress} In Progress</p>
      </div>
    </div>
  );
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
  const history = useHistory();

  const navigationClient = new CustomNavigationClient(history);
  msalInstance.setNavigationClient(navigationClient);

  return (
    <BrowserRouter>
      {/* <ToastProvider> */}
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <App />
        </AppProvider>
      </QueryClientProvider>
      {/* </ToastProvider> */}
    </BrowserRouter>
  );
  // return (
  //   <BrowserRouter>
  //     {/* <ToastProvider> */}
  //     <QueryClientProvider client={queryClient}>
  //       <MsalProvider instance={msalInstance}>
  //         <MsalAuthenticationTemplate
  //           interactionType="redirect"
  //           loadingComponent={InProgressComponent}
  //           errorComponent={ErrorComponent}
  //         >
  //           <AppProvider>
  //             <App />
  //           </AppProvider>
  //         </MsalAuthenticationTemplate>
  //       </MsalProvider>
  //     </QueryClientProvider>
  //     {/* </ToastProvider> */}
  //   </BrowserRouter>
  // );
}
