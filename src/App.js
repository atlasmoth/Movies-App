import React, { useReducer, useMemo, useEffect } from "react";
import Movies from "./Movies";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Movie from "./Movie";
import LikedMovies from "./LikedMovies";
import AppContext from "./AppContext";

function reducer(state, action) {
  switch (action.type) {
    case "add": {
      return {
        ...state,
        liked: [...state.liked, action.id]
      };
    }
    case "remove": {
      return {
        ...state,
        liked: [...state.liked.filter(item => item != action.id)]
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

  useEffect(() => {
    localStorage.setItem("liked", JSON.stringify(state.liked));
  }, [state.liked]);

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
