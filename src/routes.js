import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./screens/Home/Home";
import Dashboard from "./screens/Dashboard/Dashboard";
import NewEntry from "./screens/NewEntry/NewEntry";
import EmployeeTimeEntry from "./screens/EmployeeTimeEntry/EmployeeTimeEntry";

const NotFound = () => {
  return (
    <div className="container pt-6 flex justify-center">
      <p className="text-lg text-gray-800">Page Not Found</p>
    </div>
  );
};

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/newEntry" exact component={NewEntry} />
      <Route path="/employeeTimeEntry" exact component={EmployeeTimeEntry} />
      <Route component={NotFound} />
    </Switch>
  );
}
