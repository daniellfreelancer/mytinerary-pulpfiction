import React from "react";
import LogIn from "./LogIn";
import Logo from "./Logo";
import { NavBar } from "./NavBar";
import { Link as LinkRouter } from "react-router-dom";
import BurgerBtn from './BurgerBtn';

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
        <BurgerBtn />
      </div>
    </header>
  );
}

export default Header;
