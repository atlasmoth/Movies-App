import React from "react";
import { Link } from "react-router-dom";
export default function MovieCrd(props) {
  const { title, poster_path, id } = props.movie;
  return (
    <div className="movie-card">
      <img src={`http://image.tmdb.org/t/p/w300/${poster_path}`} alt={title} />
      <h3>{title}</h3>
      <Link to={`/movies/${id}`}>More ></Link>
    </div>
  );
}
