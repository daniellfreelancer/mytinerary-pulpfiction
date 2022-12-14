import React, { useEffect, useState } from "react";
import { Link as LinkRouter } from "react-router-dom";
import LogIn from "./LogIn";
import { useSelector } from "react-redux";

function BurgerBtn() {
  const pages = [{ id: "_cities", to: "/cities", title: "Cities" }];

  const [show, setShow] = useState(false);
  const userLoggin = useSelector((state) => state.auth);

  function showNav() {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  }

  const [statusAccount, setStatusAccount] = useState(false);
  const [myStatusLogged, setMyStatusLogged] = useState([
    {
      id: "_myAccount",
      to: "/myAccount",
      title: "My Account",
    },
    {
      id: "_myTinerary",
      to: "/myTineraries",
      title: "My Tineraries",
    },
  ]);

  const newCities = {
    id: "_newCities",
    to: "/newCities",
    title: "New Cities",
  };

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("token"))) {
      setStatusAccount(true);
    }
  }, [statusAccount]);

  return (
    <div className="Button-div">
      <button className="burger-btn" onClick={showNav}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          className="bi bi-three-dots"
          viewBox="0 0 16 16"
        >
          <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
        </svg>
        <div></div>
      </button>
      <div>
        {show ? (
          <div className="Dropdown-menu">
            {pages.map((link) => (
              <LinkRouter className="navlink-burger" to={link.to} key={link.id}>
                {link.title}
              </LinkRouter>
            ))}
            {statusAccount === true
              ? myStatusLogged.map((link) => (
                  <LinkRouter
                    className="navlink-burger"
                    to={link.to}
                    key={link.id}
                  >
                    {link.title}
                  </LinkRouter>
                ))
              : null}
            {userLoggin.role === "admin" && JSON.parse(localStorage.getItem("token"))  ? (
              <LinkRouter
                className="navlink-burger"
                to={newCities.to}
                key={newCities.id}
              >
                {newCities.title}
              </LinkRouter>
            ) : null}
            <LogIn />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default BurgerBtn;
