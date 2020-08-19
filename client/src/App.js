import React from "react";
import { Switch, Route } from "react-router-dom";
import FacebookCallback from "./pages/FacebookCallback";
import Home from "./pages/Home";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/facebook_auth_callback" exact component={FacebookCallback} />
    </Switch>
  );
}

export default App;
