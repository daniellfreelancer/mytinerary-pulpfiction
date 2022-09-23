import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link as LinkRouter } from "react-router-dom";
import "../styles/App.css";


export function NavBar() {

  const [statusAccount, setStatusAccount] = useState(false)
  const [statusAdmin, setStatusAdmin] = useState(false)
  const userLoggin = useSelector((state) => state.auth)

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

  const adminObj = 
    {
      id: "_newCities", 
      to: "/newCities", 
      title: "New Cities" 
  }



  

  //  useEffect(() => {
  //    if(JSON.parse(localStorage.getItem('token'))){
  //      setStatusAccount(true)
  //    }
  //  }, [statusAccount])
  
  
  return (
    <>
      <nav className="Nav-Header">
        {pages.map((link) => (
          <LinkRouter className="navlink" to={link.to} key={link.id}>
            {link.title}
          </LinkRouter>
        ))}
        {
          userLoggin.logged && JSON.parse(localStorage.getItem('token'))  ? (
            pagesLogged.map((link) => (
              <LinkRouter className="navlink" to={link.to} key={link.id}>
                {link.title}
              </LinkRouter>
            ))
          ): null
        }
        {
          userLoggin.role === "admin" && JSON.parse(localStorage.getItem('token'))  ? (
            
              <LinkRouter className="navlink" to={adminObj.to} key={adminObj.id}>
                {adminObj.title}
              </LinkRouter>
            
          ) : null
        }
      </nav>
    </>
  );
}
