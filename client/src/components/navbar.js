import React from "react";

const Navbar = ({ setView }) => {
  //setView is a prop and we are passing it
  return (
    //replacing if statements taking turns rendering ('treated as buttons')
    
    <div className="navbar-container">
      <ul className="navbar-ul">
        <li className="nav-li">
          <a className="navbar-btn"  onClick={() => setView("home")}>
            <h2>Home</h2>
          </a>
        </li>

        <li className="nav-li">
          <a className="navbar-btn" onClick={() => setView("blogs")}>
            <h2>Create a new Blog</h2>
          </a>
        </li>
        <li className="nav-li">
          <a className="navbar-btn" onClick={() => setView("favorite")}>
            <h2>Favorites</h2>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
