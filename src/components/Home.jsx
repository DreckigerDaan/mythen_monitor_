import Logo from "../assets/logo.svg";
import World from "../assets/worldmap.svg";
import Arrow from "../assets/arrow_down.svg";
import NavBar from "./NavBar";
import Text from "./text";
import "./Home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <NavBar />
      <div className="logo">
        <img src={Logo} alt=" Logo" />
      </div>
      <div className="world">
        <img src={World} alt=" World" />
      </div>
      <div className="text_unten">
        <p>
          Faktencheck zur<br></br>Überprüfung<br></br> und<br></br> Aufklärung
          von<br></br> Fehlinformationen
        </p>
        <hr></hr>
      </div>
      <h3>
        MYTHEN <br></br>ÜBER<br></br> MIGRATION
      </h3>
      <div className="arrow">
        <Link to="Info">
          <img src={Arrow} alt=" Arrow" />
        </Link>
      </div>
    </div>
  );
}

export default Home;
