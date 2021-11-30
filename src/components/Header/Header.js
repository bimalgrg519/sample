import React from "react";
import { ReactComponent as LogoSvg } from "../../assets/logo.svg";
import { IoArrowBack } from "react-icons/io5";
import { useHistory, useLocation } from "react-router-dom";
import { useMsal, useAccount } from "@azure/msal-react";

// StaticHeader is used in initial loading state of app
export const StaticHeader = ({ leftComponent, rightComponent }) => {
  return (
    <div className="bg-white border-b border-primaryBlue">
      <div className="max-w-container mx-auto flex justify-between items-center py-3 relative">
        <div className="w-10 h-10 -my-4 flex items-center">{leftComponent}</div>
        <LogoSvg />
        <div className="w-8 h-8 hidden md:block">{rightComponent}</div>
      </div>
    </div>
  );
};

export default function Header() {
  const history = useHistory();
  const { pathname } = useLocation();
  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = (logoutType) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to logout?")) {
      if (logoutType === "popup") {
        instance.logoutPopup();
      } else if (logoutType === "redirect") {
        instance.logoutRedirect();
      }
      sessionStorage.clear();
    }
  };

  return (
    <StaticHeader
      leftComponent={
        pathname.length > 1 && (
          <div className="cursor-pointer text-primaryBlue ">
            <IoArrowBack size={26} onClick={() => history.goBack()} />
          </div>
        )
      }
      rightComponent={
        <div className="flex flex-col items-end text-primaryDarkBlue text-xs sm:text-base">
          {account?.username}
          <p
            className="font-medium hover:font-bold cursor-pointer"
            onClick={() => handleLogout("redirect")}
          >
            Logout
          </p>
        </div>
      }
      // rightComponent={
      //   <div
      //     className="w-8 h-8 cursor-pointer relative"
      //     onMouseEnter={() => setIsDropdownOpen(true)}
      //     onMouseLeave={() => setIsDropdownOpen(false)}
      //   >
      //     <div className="w-full h-full rounded-full bg-primaryBlue" />
      //     {isDropdownOpen && (
      //       <div className="absolute bg-white text-black right-0 w-60 px-5 py-2 shadow">
      //         <button
      //           onClick={() => handleLogout("redirect")}
      //           className="px-2 font-semibold w-full py-4 hover:bg-gray-100"
      //         >
      //           Logout
      //         </button>
      //       </div>
      //     )}
      //   </div>
      // }
    />
  );
  // return (
  //   <div className="bg-white border-b border-primaryBlue">
  //     <div className="mx-auto w-container flex justify-between items-center py-3 relative">
  //       <div className="w-10 h-10 -my-4 flex items-center">
  //         {pathname.length > 1 && (
  //           <div className="cursor-pointer text-primaryDarkBlue ">
  //             <IoArrowBack size={26} onClick={() => history.goBack()} />
  //           </div>
  //         )}
  //       </div>
  //       <LogoSvg />
  //       <div className="w-8 h-8 bg-gray-300 rounded-full" />
  //     </div>
  //   </div>
  // );
}
