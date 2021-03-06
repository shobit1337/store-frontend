import React from 'react'
import { Link, withRouter } from "react-router-dom";
import { isAuthenticated, signout } from '../auth/helper';

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" }
  } else {
    return { color: "#FFFFFF" }
  }
}

const NavBar = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <Link style={currentTab(history, "/")} className="nav-link" to="/">Home</Link>
      </li>
      <li className="nav-item">
        <Link style={currentTab(history, "/cart")} className="nav-link" to="/cart">Cart</Link>
      </li>

      {isAuthenticated() && isAuthenticated().user.role === 0 && (
        <li className="nav-item">
          <Link style={currentTab(history, "/user/dashboard")} className="nav-link" to="/user/dashboard">Dashboard</Link>
        </li>
      )}

      {isAuthenticated() && isAuthenticated().user.role === 1 && (
        <li className="nav-item">
          <Link style={currentTab(history, "/admin/dashboard")} className="nav-link" to="/admin/dashboard">Admin Dashboard</Link>
        </li>
      )}

      {!isAuthenticated() && (<>
        <li className="nav-item">
          <Link style={currentTab(history, "/signup")} className="nav-link" to="/signup">Signup</Link>
        </li>
        <li className="nav-item">
          <Link style={currentTab(history, "/signin")} className="nav-link" to="/signin">Sign in</Link>
        </li></>)
      }

      {isAuthenticated() && (
        <li className="nav-item">
          <span className="nav-link text-danger" onClick={() => {
            signout(() => {
              history.push("/")
            })
          }}>Sign out</span>
        </li>
      )
      }

    </ul>
  </div>
);

export default withRouter(NavBar);