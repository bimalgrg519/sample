import React from "react";
import Routes from "./routes";
import { Header } from "./components";

export default function App() {
  return (
    <div className="h-screen w-screen bg-white">
      <Header />
      <div className="w-container mx-auto py-10">
        <Routes />
      </div>
    </div>
  );
}
