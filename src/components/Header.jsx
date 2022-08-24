import React from "react";
import BurguerBtn from "./BurguerBtn";
import LogIn from "./LogIn";
import Logo from "./Logo";
import { NavBar } from "./NavBar";
import { Link as LinkRouter } from "react-router-dom";

function Header() {
  return (
    <header className="Header">
      <div className="Div-logo">
        <LinkRouter to="/">
          <Logo />
        </LinkRouter>
      </div>

      <div>
        <div className="cont-Nav">
          <NavBar />
          <LogIn />
        </div>
        <BurguerBtn />
      </div>
    </header>
  );
}

export default Header;
