import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import "../styles/App.css";

const pages = [
  { id: "_cities", to: "/cities", title: "Cities" },
  { id: "_newCities", to: "/newCities", title: "New Cities" },
  { id: "_editCity", to: "/editCity", title: "Edit City" }
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
