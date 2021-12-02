import { LogLevel } from "@azure/msal-browser";
// Browser check variables
// If you support IE, our recommendation is that you sign-in using Redirect APIs
// If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
const ua = window.navigator.userAgent;
const msie = ua.indexOf("MSIE ");
const msie11 = ua.indexOf("Trident/");
const msedge = ua.indexOf("Edge/");
const firefox = ua.indexOf("Firefox");
const isIE = msie > 0 || msie11 > 0;
const isEdge = msedge > 0;
const isFirefox = firefox > 0; // Only needed if you need to support the redirect flow in Firefox incognito

const AzureActiveDirectoryAppClientId = "0335b3bf-a2f1-4310-91bf-0758fcfea8d0";
// const AzureActiveDirectoryAppClientId =
//   process.env.REACT_APP_AZURE_ACTIVE_DIRECTORY_APP_CLIENT_ID;

// Config object to be passed to Msal on creation
export const msalConfig = {
  auth: {
    clientId: AzureActiveDirectoryAppClientId,
    // authority: `https://login.microsoftonline.com/8472e5fe-3211-4029-9cbb-bbc8ab1dbe72`,
    authority: "https://login.microsoftonline.com/common",
    redirectUri: window.location.origin,
    postLogoutRedirectUri: "/",
  },
  cache: {
    storeAuthStateInCookie: isIE || isEdge || isFirefox,
    cacheLocation: "localStorage",
  },
  system: {
    loggerOptions: {
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          return;
        }
        switch (level) {
          case LogLevel.Error:
            // console.error(message);
            return;
          case LogLevel.Info:
            // console.info(message);
            return;
          case LogLevel.Verbose:
            // console.debug(message);
            return;
          case LogLevel.Warning:
            // console.warn(message);
            return;
          default:
            return;
        }
      },
    },
  },
};

// Add here scopes for id token to be used at MS Identity Platform endpoints.
export const loginRequest = {
  scopes: ["User.Read"],
};

// Add here the endpoints for MS Graph API services you would like to use.
export const graphConfig = {
  graphMeEndpoint: "https://graph.microsoft-ppe.com/v1.0/me",
};
