import React, { useState, useEffect } from "react";
import MovieCrd from "./MovieCard";

export default function() {
  const [movies, setMovies] = useState({ movies: [], loading: true });
  const [page, setPage] = useState(1);

  useEffect(() => {
    getMovies(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=${page}`
    );
  }, [page]);
  function getMovies(link) {
    fetch(link)
      .then(data => data.json())
      .then(({ results }) => {
        setMovies({
          movies: results.map(movie => ({
            ...movie
          })),
          loading: false
        });
      })
      .catch(e => console.log(e.message));
  }
  return (
    <div className="Movies">
      <label htmlFor="selector">
        Select Page - &nbsp;
        <input
          type="number"
          value={page}
          min="1"
          max="1000"
          onChange={e => {
            if (Number(e.target.value < 1)) {
              setPage(1);
            } else if (Number(e.target.value > 100)) {
              setPage(100);
            } else {
              setPage(e.target.value);
            }
          }}
        />
      </label>

      <div className="movies-container">
        {movies.loading ? (
          <h2>Loading ...</h2>
        ) : (
          movies.movies.map(movie => <MovieCrd key={movie.id} movie={movie} />)
        )}
      </div>
    </div>
  );
}
