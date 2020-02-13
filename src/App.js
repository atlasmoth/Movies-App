import React, { useReducer, useMemo } from "react";
import Movies from "./Movies";
import { Switch, NavLink, Link, Route, Redirect } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Movie from "./Movie";
import LikedMovies from "./LikedMovies";
import AppContext from "./AppContext";

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      localStorage.setItem(
        "liked",
        JSON.stringify([...state.liked, action.id])
      );
      return {
        ...state,
        liked: [...JSON.parse(localStorage.getItem("liked"))]
      };
    }
    case "remove": {
      const liked = JSON.parse(localStorage.getItem("liked"));
      localStorage.setItem(
        "liked",
        JSON.stringify(liked.filter(item => item != action.id))
      );
      return {
        ...state,
        liked: [...JSON.parse(localStorage.getItem("liked"))]
      };
    }
    default: {
      return state;
    }
  }
}
function App() {
  const initArray = JSON.parse(localStorage.getItem("liked")) || [];

  const [state, dispatch] = useReducer(reducer, { liked: initArray });

  const numLiked = useMemo(() => state.liked.length, [state.liked]);

  return (
    <div className="App">
      <AppContext.Provider value={{ likedMovies: state.liked, dispatch }}>
        <Header numLiked={numLiked} />
        <Switch>
          <Route exact path="/movies/liked" component={LikedMovies} />
          <Route
            exact
            path="/movies/:id"
            render={props => <Movie {...props} />}
          />
          <Route exact path="/" component={Movies} />

          <Route exact render={() => <Redirect to="/" />} />
        </Switch>
      </AppContext.Provider>
    </div>
  );
}

export default App;
