import React, { useContext } from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Logout } from "@mui/icons-material";
const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="navContainer">
        <NavLink to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">meta.booking</span>
        </NavLink>
        {user ? (
          <div className="userInfoDiv">
            <h2>{user.username}</h2>
            <div
              className="logoutIcon"
              onClick={() => dispatch({ type: "LOGOUT" })}
            >
              <Logout />
              <span>logout</span>
            </div>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <button className="navButton">Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
