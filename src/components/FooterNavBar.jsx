import React from "react";
import { Link as LinkRouter } from "react-router-dom";
import "../styles/App.css";

const pages = [
  { id: "_cities", to: "/cities", title: "Cities" },
  { id: "_newCities", to: "/newCities", title: "New Cities" },
  { id: "_myTinerary", to: "/myTineraries", title: "My Tineraries" },
];

export function NavBarFooter() {
  return (
    <nav className="Nav-Footer">
      {pages.map((link) => (
        <LinkRouter className="footer-navlink" to={link.to} key={link.id}>
          {link.title}
        </LinkRouter>
      ))}
    </nav>
  );
}
