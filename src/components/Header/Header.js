import React from "react";
import { ReactComponent as LogoSvg } from "../../assets/logo.svg";
import { IoArrowBack } from "react-icons/io5";
import { useHistory, useLocation } from "react-router-dom";

export const StaticHeader = ({ leftComponent, rightComponent }) => {
  return (
    <div className="bg-white border-b border-primaryBlue">
      <div className="mx-auto w-container flex justify-between items-center py-3 relative">
        <div className="w-10 h-10 -my-4 flex items-center">{leftComponent}</div>
        <LogoSvg />
        <div className="w-8 h-8" />
      </div>
    </div>
  );
};

export default function Header() {
  const history = useHistory();
  const { pathname } = useLocation();

  return (
    <StaticHeader
      leftComponent={
        pathname.length > 1 && (
          <div className="cursor-pointer text-primaryBlue ">
            <IoArrowBack size={26} onClick={() => history.goBack()} />
          </div>
        )
      }
    />
  );
  return (
    <div className="bg-white border-b border-primaryBlue">
      <div className="mx-auto w-container flex justify-between items-center py-3 relative">
        <div className="w-10 h-10 -my-4 flex items-center">
          {pathname.length > 1 && (
            <div className="cursor-pointer text-primaryDarkBlue ">
              <IoArrowBack size={26} onClick={() => history.goBack()} />
            </div>
          )}
        </div>
        <LogoSvg />
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
}
