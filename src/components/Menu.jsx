import NavBar from "./NavBar";
import "./menu.css";
import Arrow_right from "../assets/arrow_right.svg";
import Circles from "../assets/circles.svg";
import { Link } from "react-router-dom";

function Menu() {
  return (
    <div className="menu">
      <div className="wrap_menu">
        <h1>Menu</h1>
        <div className="menu_list">
          <p>
            Hier findest du eine Übersicht über die verschiedene Themen, welche
            behandelt werden
          </p>
          <hr></hr>

          <div className="menu_point">
            <h3>Was ist ein Mythos?</h3>
            <Link to="/Info">
              <img src={Arrow_right} alt=" arrow_right" />
            </Link>
          </div>
          <hr></hr>
          <div className="menu_point">
            <h3>MythenAuswahlübersicht</h3>
            <Link to="/MythosAuswahl">
              <img src={Arrow_right} alt=" arrow_right" />
            </Link>
          </div>
          <hr></hr>
          <div className="menu_point">
            <h3>Impressum</h3>
            <Link to="/Impressum">
              <img src={Arrow_right} alt=" arrow_right" />
            </Link>
          </div>

          <img src={Circles} alt="circles" />
        </div>
      </div>
    </div>
  );
}

export default Menu;
