import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./screens/Dashboard/Dashboard";
import TimeEntry from "./screens/TimeEntry/TimeEntry";
import useEmployees from "./hooks/useEmployees";
import { useContextConsumer } from "./AppContext";
import { Loader } from "./components";
import useWorkSites from "./hooks/useWorkSites";
import { useAccount, useMsal } from "@azure/msal-react";

const NotFound = () => {
  return (
    <div className="container pt-6 flex justify-center">
      <p className="text-lg text-gray-800">404 | Page Not Found</p>
    </div>
  );
};

export default function Routes() {
  const { setUserCode, setIsManager } = useContextConsumer();
  const [initialLoading, setInitialLoading] = useState(true);

  const { accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  const { data: employees } = useEmployees(
    `?$filter=companyEmail eq '${account?.username}'`
    // `?$filter=companyEmail eq 'bimal.gurung@dogmagroup.co.uk'`
  );

  const { data: workSites } = useWorkSites(
    `?$filter= siteManager eq '${employees && employees[0].employeeNo}'`,
    {
      enabled: !!employees,
    }
  );

  useEffect(() => {
    if (workSites) {
      setIsManager(workSites.length > 0 ? true : false);
      setInitialLoading(false);
    }
  }, [setIsManager, workSites]);

  useEffect(() => {
    if (employees) {
      const { employeeNo } = employees[0];
      setUserCode(employeeNo);
    }
  }, [employees, setUserCode]);

  if (initialLoading) {
    return (
      <div className="items-center justify-center flex flex-col">
        <Loader />
        <p className="mt-2 font-semibold">Loading...</p>
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/timeEntry" exact component={TimeEntry} />
      <Route component={NotFound} />
    </Switch>
  );
}
