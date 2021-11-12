import React from "react";
import Routes from "./routes";
import { Header } from "./components";

export default function App() {
  return (
    <div className="h-screen w-screen bg-white flex flex-col">
      <Header />
      <div className="w-container mx-auto py-10 overflow-auto">
        <Routes />
      </div>
    </div>
  );
}
