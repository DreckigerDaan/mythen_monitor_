import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "../assets/menu_icon.svg";
import CloseIcon from "../assets/close_menu.svg";
import LogoTransparent from "../assets/logo_transparent.svg";
import "./NavBar.css";
import Menu from "./Menu";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
    console.log(isMenuOpen);
  };

  return (
    <div className="NavBar">
      <div
        className={`menu_icon ${isMenuOpen ? "menu-close" : "menu-open"}`}
        onClick={toggleMenu}
      >
        <img src={isMenuOpen ? CloseIcon : MenuIcon} alt="Menu" />
      </div>
      {/* <div className="menu_icon" onClick={toggleMenu}>
        <Link to="Menu">
          <img src={isMenuOpen ? CloseIcon : MenuIcon} alt="Menu" />
        </Link>
      </div> */}

      <Link to="/">
        <div className="logo_transparent">
          <img src={LogoTransparent} alt="Logo" />
        </div>
      </Link>
      {isMenuOpen ? <Menu /> : null}
    </div>
  );
}

export default NavBar;
