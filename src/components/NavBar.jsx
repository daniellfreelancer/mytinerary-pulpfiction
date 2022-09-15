import React, { useEffect, useState } from "react";
import { Link as LinkRouter } from "react-router-dom";
import "../styles/App.css";






export function NavBar() {
  const pages = [
    { id: "_cities", to: "/cities", title: "Cities" },
    { id: "_newCities", to: "/newCities", title: "New Cities" },
    { id: "_myTinerary", to: "/myTineraries", title: "My Tineraries" }
  ];

  const [statusAccount, setStatusAccount] = useState(false)
  const [myStatusLogged, setMyStatusLogged] = useState({
    id: "_myAccount", to: "/myAccount", title: "My Account"
  })
  

  useEffect(() => {
    if( localStorage.length > 0){
      setStatusAccount(true)
    } 
  }, [statusAccount])
  



  
  return (
    <>
      <nav className="Nav-Header">
        {pages.map((link) => (
          <LinkRouter className="navlink" to={link.to} key={link.id}>
            {link.title}
          </LinkRouter>
        ))}
        {
          statusAccount == true ?
            (<LinkRouter className="navlink" to={myStatusLogged.to} key={myStatusLogged.id}>
          {myStatusLogged.title}
        </LinkRouter>) : null
        }
      </nav>
    </>
  );
}
