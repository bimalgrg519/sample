import React from "react";
import Routes from "./routes";
import { Header } from "./components";

export default function App() {
  return (
    <div className="h-screen w-screen bg-white flex flex-col px-1">
      <Header />
      <div>
        <div className="max-w-container mx-auto py-6 md:py-10 overflow-auto">
          <Routes />
        </div>
      </div>
    </div>
  );
}
