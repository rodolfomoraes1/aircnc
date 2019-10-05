import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import NewSpot from "./pages/NewSpot";
import Dashboard from "./pages/Dashboard";

export default function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/new" component={NewSpot} />
      </Switch>
    </BrowserRouter>
  );
}