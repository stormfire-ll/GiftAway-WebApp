import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Navbar = () => {

  const handleLogout = () => {
    axios.post("http://localhost:4000/logout/", {}, {
      withCredentials: true
    })
    .then(res => {
      
    //  navigate("/")
      window.location.reload()
    })
    .catch(error => {
      console.error('Logout failed:', error);
      // Handle errors here, such as displaying a message to the user.
    });
  }

  return (
    <div><nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">GiftAway</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">Dashboard</Link>
            </li>
            <li>
             <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
             <Link to="/giftaway" className="nav-link">Manage Giftaway</Link>
            </li>
          </ul>
          <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          {/* <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form> */}
        </div>
      </div>
    </nav></div>
  )
}

export default Navbar