import React from "react";
import Loader from "../Loader/Loader";
import { StaticHeader } from "../Header/Header";

export default function InitialLoader() {
  return (
    <div>
      <StaticHeader />
      <div className="flex flex-col justify-center items-center w-container mx-auto mt-8">
        <Loader />
        <p className="mt-2 font-semibold">Loading...</p>
      </div>
    </div>
  );
}
