import React, { useState } from "react";
import { Link as LinkRouter } from "react-router-dom";

function LogIn() {
  const pages = [
    { id: "_signUp", to: "/signup", title: "Sign Up" },
    { id: "_signin", to: "/signin", title: "Sign In" },
  ];

  const [show, setShow] = useState(false);

  function showUserInt() {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  }
  return (
    <div className="LogIn-box">
      <button className="user-btn" onClick={showUserInt}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          className="bi bi-person-circle"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
          />
        </svg>
      </button>
      <div>
        {show ? (
          <div className="Dropdown-menu-UI">
            {pages.map((link) => (
              <LinkRouter className="navlink-burger" to={link.to} key={link.id}>
                {link.title}
              </LinkRouter>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default LogIn;
