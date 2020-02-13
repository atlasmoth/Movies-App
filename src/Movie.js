import React, { memo, useEffect, useState, useContext } from "react";
import { Link, withRouter } from "react-router-dom";
import AppContext from "./AppContext";

function Movie({ match, history }) {
  const [movie, setMovie] = useState({ movie: {}, loading: true });
  const contextObj = useContext(AppContext);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${process.env.API_KEY}&language=en-US`
    )
      .then(data => data.json())
      .then(movie => {
        setMovie({ movie, loading: false });
      })
      .catch(e => console.log(e.message));
  }, [match.params.id]);
  if (movie.loading) {
    return <h2 style={{ textAlign: "center" }}>Fethcing Movie...</h2>;
  } else {
    const {
      release_date,
      original_title,
      homepage,
      overview,
      status,
      runtime,
      tagline,
      backdrop_path
    } = movie.movie;
    const isLiked = contextObj.likedMovies.find(
      item => item == match.params.id
    );

    return (
      <div className="Movie">
        <h2>{original_title}</h2>
        {isLiked && <span className="like">😍</span>}
        <div className="media">
          <img src={`http://image.tmdb.org/t/p/w300/${backdrop_path}`} alt="" />
          <a href={homepage} target="_blank">
            Go to Homepage
          </a>
        </div>
        <p>{overview}</p>
        <h4>Release Date : {release_date}</h4>
        <h4>{tagline}</h4>
        <h3>Runtime : {(runtime / 60).toFixed(1)} hours.</h3>
        <h4>{status}</h4>
        <div className="links">
          <Link
            to="/"
            onClick={e => {
              e.preventDefault();
              history.goBack();
            }}
          >
            Back
          </Link>
          {isLiked ? (
            <button
              className="button-like"
              onClick={() =>
                contextObj.dispatch({ type: "remove", id: match.params.id })
              }
            >
              Unlike
            </button>
          ) : (
            <button
              className="button-like"
              onClick={() =>
                contextObj.dispatch({ type: "add", id: match.params.id })
              }
            >
              Like
            </button>
          )}
        </div>
      </div>
    );
  }
}

export default Movie;
