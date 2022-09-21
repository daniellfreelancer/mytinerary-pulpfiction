import React, { useEffect, useState } from "react";
import { Link as LinkRouter } from "react-router-dom";
import "../styles/App.css";


export function NavBar() {


  const [statusAccount, setStatusAccount] = useState(false)
  const [statusAdmin, setStatusAdmin] = useState(false)

  const pages = [
    { 
      id: "_cities", 
      to: "/cities", 
      title: "Cities" }
  ];

  const pagesLogged = [
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

  const adminArray = [
    {
      id: "_newCities", 
      to: "/newCities", 
      title: "New Cities" 
  }
]


  

  useEffect(() => {
    if(  JSON.parse(localStorage.getItem('testUser'))){
      setStatusAccount(true)
    }

  }, [statusAccount])
  
  useEffect(() => {
    if (JSON.parse(localStorage.getItem('testUser'))){
      let adminActive = JSON.parse(localStorage.getItem('testUser')).role
      if (adminActive === "admin"){
        setStatusAdmin(true)
      }
      
    } 
  }, [statusAdmin])
  



  
  return (
    <>
      <nav className="Nav-Header">
        {pages.map((link) => (
          <LinkRouter className="navlink" to={link.to} key={link.id}>
            {link.title}
          </LinkRouter>
        ))}
        {
          statusAccount === true ? (
            pagesLogged.map((link) => (
              <LinkRouter className="navlink" to={link.to} key={link.id}>
                {link.title}
              </LinkRouter>
            ))
          ): null
        }
        {
          statusAdmin ? (
            adminArray.map((link) => (
              <LinkRouter className="navlink" to={link.to} key={link.id}>
                {link.title}
              </LinkRouter>
            ))
          ) : null
        }
      </nav>
    </>
  );
}
