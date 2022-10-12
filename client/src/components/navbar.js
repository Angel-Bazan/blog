import React from 'react'


const Navbar = ({setView}) => { //setView is a prop and we are passing it 
    return ( //replacing if statements taking turns rendering ('treated as buttons')
        <div className="navbar-container">
        <div className="navbar-btn" onClick={() => setView("home")}>
          <h2>Home</h2>
        </div>
        <div className="navbar-btn" onClick={() => setView("blogs")}>
          <h2>About Me</h2>
        </div>
        <div className="navbar-btn" onClick={() => setView("favorite")}>
          <h2>Favorites</h2>
        </div>
        </div> 
    )
}

export default Navbar
