import React, { memo, useEffect, useState } from "react";

export default memo(function Movie({ match }) {
  const [movie, setMovie] = useState({ movie: {}, loading: true });
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${match.params.id}?api_key=${process.env.API_KEY}&language=en-US`
    )
      .then(data => data.json())
      .then(movie => {
        setMovie({ movie, loading: false });
        console.log(movie);
      })
      .catch(e => console.log(e.message));
  }, [match.params.id]);
  if (movie.loading) {
    return <h2 style={{ textAlign: "center" }}>Fethcing Movie...</h2>;
  } else {
    return <div className="Movie">{JSON.stringify(movie.movie, null, 2)}</div>;
  }
});
