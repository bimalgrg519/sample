import React, { useState } from "react";
import useAuthentication from "./hooks/useAuthentication";
// import { Loader } from "./components";

export const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [isAppLoading, setIsAppLoading] = useState(false);

  const token = useAuthentication();
  console.log(1, token);

  return (
    <AppContext.Provider
      value={{
        setIsAppLoading,
      }}
    >
      {children}
      {/* {isAppLoading && (
        <div className="absolute top-0 flex justify-center items-center bg-white bg-opacity-30 w-full h-full">
          <Loader />
        </div>
      )} */}
    </AppContext.Provider>
  );
};
