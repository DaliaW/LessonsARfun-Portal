import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import checkLogin from "../helpers/checkLogin";
import ReactTooltip from "react-tooltip";

//assets
import profileIcon from "../assets/logo.svg";
import logout from "../assets/logout.svg";

function NavBar(props) {
  const [name, setName] = useState("");

  useEffect(() => {
    async function fetchData() {
      let res = await (await checkLogin()).user;
      const username = localStorage.getItem("username");
      setName(username);
    }
    fetchData();
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("username");
    document.location.href = window.location.origin + "/login";
  };

  return (
    <div>
      <Navbar className="navbar">
        <Navbar.Brand href="#home">
          <img
            data-tip="view profile"
            alt=""
            src={profileIcon}
            className="profile-icon"
          />{" "}
          <a className="navbar-name" href="/home">
            Hi {name}
          </a>
        </Navbar.Brand>
        <img
          data-tip="Logout"
          alt="logout icon"
          src={logout}
          className="logout-icon"
          onClick={handleLogout}
        />
        <ReactTooltip />
      </Navbar>
    </div>
  );
}

export default NavBar;
