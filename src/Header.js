import React, { memo } from "react";
import { NavLink } from "react-router-dom";

export default memo(function Header({ numLiked }) {
  return (
    <div className="Header">
      <nav className="Header-nav">
        <h2>Movies App</h2>
        <div>
          <NavLink activeClassName="gen-link" to="/movies/liked">
            Liked <span className="counter">{numLiked}</span>
          </NavLink>
          <NavLink to="/" activeClassName="gen-link">
            Home
          </NavLink>
        </div>
      </nav>
    </div>
  );
});
