import React, { useEffect, useState } from "react";
import { Link as LinkRouter } from "react-router-dom";
import "../styles/App.css";



export function NavBarFooter() {
  const pages = [
    { id: "_cities", to: "/cities", title: "Cities" }
  ];
  
  const [statusAccount, setStatusAccount] = useState(false)
  const [myStatusLogged, setMyStatusLogged] = useState(
    [
    {
      id: "_myAccount",
      to: "/myAccount", 
      title: "My Account"
    },
    { 
      id: "_newCities", 
      to: "/newCities", 
      title: "New Cities" 
    },
    { 
      id: "_myTinerary", 
      to: "/myTineraries", 
      title: "My Tineraries" 
    }
  ]
  )
  
  
  useEffect(() => {
    if( localStorage.length > 0){
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
    </nav>
  );
}
