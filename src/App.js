import React from "react";
import Movies from "./Movies";
import { Switch, NavLink, Link, Route, Redirect } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Movie from "./Movie";
function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Movies} />
        <Route
          exact
          path="/movies/:id"
          render={props => {
            return <Movie {...props} />;
          }}
        />
        <Route exact render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
}

export default App;
