import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../src/assets/LOGO1.png";

const Navbar = () => {
  const toggleMenu = () => {
    document.querySelector('.nav-links').classList.toggle('open');
  };

  return (
    <div>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap');
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }
        body {
          min-height: 100vh;
        }
        nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 70px;
          background-image: linear-gradient(120deg, #fff 0%, #318FE7 100%);
          box-shadow: 0 1px 2px rgb(192, 189, 189);
          z-index: 99;
        }
        nav .navbar {
          height: 100%;
          max-width: 1250px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin: auto;
          padding: 0 50px;
        }
        nav .navbar .nav-links {
          line-height: 70px;
          height: 100%;
          display: flex;
          align-items: center;
        }
        nav .navbar .links {
          display: flex;
        }
        nav .navbar .links li {
          position: relative;
          display: flex;
          align-items: center;
          list-style: none;
          padding: 0 14px;
        }
        nav .navbar .links li a {
          text-decoration: none;
          white-space: nowrap;
          color: #070000;
          font-size: 15px;
          font-weight: 500;
        }
        .navbar .bx-menu {
          display: none;
          cursor: pointer;
          font-size: 30px;
          color: #fff;
        }
        @media (max-width: 800px) {
          nav .navbar {
            max-width: 100%;
            padding: 0 25px;
          }
          .navbar .bx-menu {
            display: block;
          }
            .icon-black {
  color: black;
}

          nav .navbar .nav-links {
            position: fixed;
            top: 70px;
            left: -100%;
            display: block;
            width: 100%;
            background: #097ca3;
            line-height: 40px;
            padding: 20px;
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
            transition: all 0.5s ease;
            z-index: 1000;
            flex-direction: column;
          }
          nav .navbar .nav-links.open {
            left: 0;
          }
          nav .navbar .links {
            display: flex;
            flex-direction: column;
          }
          nav .navbar .links li {
            width: 100%;
          }
          nav .navbar .links li a {
            color: #fff;
            font-size: 18px;
            padding: 10px 0;
          }
        }
        `}
      </style>
      
      <nav>
        <div className="navbar">
        <i className="bx bx-menu" onClick={toggleMenu} style={{ color: 'black' }}></i>

          <img
            width="100"
            height="70"
            
            className="d-inline-block align-top"
            src={Logo}
            alt="Logo"
          />
          <div className="nav-links">
            <ul className="links">
              <li>
                <Link to="/admin">Admin Panel</Link>
              </li>
              <li>
                <Link to="/driver-list">Driver List</Link>
              </li>
              <li>
                <Link to="/complaints">Customer Complaints</Link>
              </li>
              <li>
                <Link to="/order_history">Order State</Link>
              </li>
              <li>
                <Link to="/change-password">Change Password</Link>
              </li>
              <li>
                <Link to="/signup">Make An Admin</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
