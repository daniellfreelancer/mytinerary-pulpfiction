import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
const userLoggin = useSelector((state) => state.auth)

  

  useEffect(() => {
    if(  userLoggin.logged === true){
      setStatusAccount(true)
    }

  }, [])
  
  useEffect(() => {

    if (JSON.parse(localStorage.getItem('token'))){

      
      if (userLoggin.role === "admin"){
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
