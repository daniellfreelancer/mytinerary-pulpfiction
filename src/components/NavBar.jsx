import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import "../App.css";

const pages = [
  { id: "_cities", to: "/cities", title: "Cities" },
  { id: "_newCities", to: "/newCities", title: "New Cities" },
];

export function NavBar() {
  return (
    <>
      <nav className="Nav-Header">
        {pages.map((link) => (
          <LinkRouter className="navlink" to={link.to} key={link.id}>
            {link.title}
          </LinkRouter>
        ))}
      </nav>
    </>
  );
}
