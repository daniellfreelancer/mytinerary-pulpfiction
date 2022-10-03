import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link as LinkRouter } from "react-router-dom";
import "../styles/App.css";




export function NavBarFooter() {
  const pages = [
    { id: "_cities", to: "/cities", title: "Cities" }
  ];
  const userLoggin = useSelector((state) => state.auth)
  
  const [statusAccount, setStatusAccount] = useState(false)
  const [myStatusLogged, setMyStatusLogged] = useState(
    [
    {
      id: "_myAccount",
      to: "/myAccount", 
      title: "My Account"
    },

    { 
      id: "_myTinerary", 
      to: "/myTineraries", 
      title: "My Tineraries" 
    }
  ]
  )

  const newCities =     { 
    id: "_newCities", 
    to: "/newCities", 
    title: "New Cities" 
  }
  
  
  useEffect(() => {
    if( JSON.parse(localStorage.getItem("token"))){
      setStatusAccount(true)
    } 
  }, [statusAccount])

  return (
    <nav className="Nav-Footer">
      {pages.map((link) => (
        <LinkRouter className="footer-navlink" to={link.to} key={link.id}>
          {link.title}
        </LinkRouter>
      ))}
              {
          statusAccount === true ?
            (myStatusLogged.map((link) => (
              <LinkRouter className="footer-navlink" to={link.to} key={link.id}>
                {link.title}
              </LinkRouter>
            ))) : null
        }
        {
          userLoggin.role === "admin" && JSON.parse(localStorage.getItem("token")) ? (
            <LinkRouter className="footer-navlink" to={newCities.to} key={newCities.id}>
            {newCities.title}
          </LinkRouter>
          ) : null
        }
    </nav>
  );
}
