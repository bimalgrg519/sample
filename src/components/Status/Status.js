import React from "react";

export default function Status({ remarks, status }) {
  if (remarks) {
    return (
      <>
        <div className="bg-red-600 w-2 h-2 rounded mr-2" />
        Rejected
      </>
    );
  } else if (status === "Pending Approval") {
    return (
      <>
        <div className="bg-primaryDarkBlue w-2 h-2 rounded mr-2" />
        {status}
      </>
    );
  } else if (status === "Released") {
    return (
      <>
        <div className="bg-green-600 w-2 h-2 rounded mr-2" />
        {status}
      </>
    );
  } else if (status === "Open") {
    return (
      <>
        <div className="bg-blue-500 w-2 h-2 rounded mr-2" />
        {status}
      </>
    );
  } else {
    return status;
  }
}
