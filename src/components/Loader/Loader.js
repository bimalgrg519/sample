import React from "react";

export default function LoaderSmall() {
  return (
    <div
      style={{
        border: "2px solid rgba(59, 100, 141, 0.2)",
        borderRadius: "50%",
        borderTop: "2px solid #3B648D",
        width: 28,
        height: 28,
        animation: "spin 2s linear infinite",
      }}
    />
  );
}
