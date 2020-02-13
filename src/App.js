import React from "react";
import Movies from "./Movies";
import { Switch, NavLink, Link, Route, Redirect } from "react-router-dom";
import "./App.css";
import Header from "./Header";
function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Movies} />
        <Route exact render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
}

export default App;
