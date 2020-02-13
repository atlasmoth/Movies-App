import React, { useState, useEffect } from "react";
import MovieCrd from "./MovieCard";

export default function() {
  const [movies, setMovies] = useState({ movies: [], loading: true });
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.API_KEY}&language=en-US&page=${page}`
    )
      .then(data => data.json())
      .then(({ results }) => {
        setMovies({
          movies: results.map(movie => ({
            ...movie,
            poster_path: `http://image.tmdb.org/t/p/w300/${movie.poster_path}`,
            backdrop_path: `http://image.tmdb.org/t/p/w500/${movie.backdrop_path}`
          })),
          loading: false
        });
      })
      .catch(e => console.log(e.message));
  }, [page]);
  return (
    <div className="Movies">
      <label htmlFor="selector">
        Select Page - &nbsp;
        <select onChange={e => setPage(e.target.value)} id="selector">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
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
