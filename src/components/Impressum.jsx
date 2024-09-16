import Logo from "../assets/logo.svg";
import Logo2 from "../assets/logo_mit_bg.svg";
import HSB from "../assets/HSB_Horizontal_RGB.png";
import "./Impressum.css";
import NavBar from "./NavBar";

function Impressum() {
  return (
    <div className="impressum_container">
      <NavBar />
      <div className="impressum_wrap">
        <img src={Logo2} alt="logo"></img>
        <p>
          Ein Projekt im Rahmen der Bachelorarbeit im Studiengang
          Medieninofrmatik an der Hochschule Bremen von
        </p>
        <hr></hr>
        <h2>Simon Dannemann</h2>
        <p>sidannemann@stud.hs-bremen.de</p>
        <img src={HSB} alt="hsb"></img>
      </div>
    </div>
  );
}

export default Impressum;
