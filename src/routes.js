import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import Dashboard from "./screens/Dashboard/Dashboard";
import NewEntry from "./screens/NewEntry/NewEntry";
import TimeEntry from "./screens/TimeEntry/TimeEntry";
import EmployeeTimeEntry from "./screens/EmployeeTimeEntry/EmployeeTimeEntry";
import useEmployees from "./hooks/useEmployees";
import { useContextConsumer } from "./AppContext";
import { Loader } from "./components";

const NotFound = () => {
  return (
    <div className="container pt-6 flex justify-center">
      <p className="text-lg text-gray-800">Page Not Found</p>
    </div>
  );
};

export default function Routes() {
  const { setUserCode } = useContextConsumer();
  const [initialLoading, setInitialLoading] = useState(true);

  const { data } = useEmployees(
    "?$filter=companyEmail eq 'nabin.neupane@dogmagroup.co.uk'"
  );

  useEffect(() => {
    if (data) {
      const { employeeNo } = data[0];
      setUserCode(employeeNo);
      setInitialLoading(false);
    }
  }, [data, setUserCode]);

  if (initialLoading) {
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <Loader />
        <p className="mt-2 font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/newEntry" exact component={NewEntry} />
      <Route path="/timeEntry" exact component={TimeEntry} />
      <Route path="/employeeTimeEntry" exact component={EmployeeTimeEntry} />
      <Route component={NotFound} />
    </Switch>
  );
}
