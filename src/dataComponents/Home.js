import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { myData } from '../App';

function Home({ children }) {

  let navigate = useNavigate()


  function logout() {
    localStorage.clear();
    navigate("/login");
  }



  return (
    <div>
      <div className='nav-bar'>
        <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ background: "powderblue" }}>
          <div className="container-fluid">
            <p className="navbar-brand mt-2 h3">REAL ESTATE</p>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item me-4">
                  <button className='home-btn' onClick={() => navigate("/add")}>Add Property</button>
                </li>
                <li className="nav-item me-4">
                  <button className='home-btn' onClick={() => navigate("/all-property")}>View all</button>
                </li>
              </ul>

              <div className='btn-logout'>
                <button className='btn btn-dark' onClick={logout}>Logout</button>
              </div>
            </div>
          </div>
        </nav>
        <div>

        </div>
      </div>
      <div className='child'>
        {children}
      </div>
    </div>
  )
}

export default Home;