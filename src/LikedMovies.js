import React, { useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";
import MovieCard from "./MovieCard";

export default function LikedMovies() {
  const [movies, setMovies] = useState({ movies: [], loading: true });
  const contextObject = useContext(AppContext);
  const { likedMovies } = contextObject;

  useEffect(() => {
    Promise.all([...likedMovies.map(liked => getMovie(liked))]).then(data =>
      setMovies({ movies: data, loading: false })
    );
    return () => {
      setMovies({ movies: [], loading: true });
    };
  }, [likedMovies]);

  function getMovie(id) {
    return fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`
    ).then(data => data.json());
  }
  return (
    <div className="Movies">
      <div className="movies-container">
        {movies.loading ? (
          <h2>Loading ...</h2>
        ) : (
          movies.movies.map(movie => <MovieCard key={movie.id} movie={movie} />)
        )}
      </div>
    </div>
  );
}
