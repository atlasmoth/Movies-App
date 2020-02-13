import React, { useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";
import MovieCard from "./MovieCard";
export default function LikedMovies() {
  const [movies, setMovies] = useState({ movies: [], loading: true });
  const contextObject = useContext(AppContext);
  useEffect(() => {
    Promise.all(
      contextObject.likedMovies.map(item =>
        fetch(
          `https://api.themoviedb.org/3/movie/${item}?api_key=${process.env.API_KEY}&language=en-US`
        ).then(data => data.json())
      )
    ).then(movies => {
      setMovies({ movies, loading: false });
    });
  });

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

//poster_path: `http://image.tmdb.org/t/p/w300/${movie.poster_path}`,
// backdrop_path: `http://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
