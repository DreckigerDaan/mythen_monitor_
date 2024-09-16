import React, { useState } from "react";
import Circles from "../assets/circles.svg";
import "./MythosAuswahl.css";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { motion } from "framer-motion";

function MythosAuswahl() {
  const [expandedMythos, setExpandedMythos] = useState(null);

  const handleClick = (mythosNumber) => {
    setExpandedMythos(expandedMythos === mythosNumber ? null : mythosNumber);
  };

  return (
    <div className="menu_selection">
      <NavBar />
      <div className="mythos_selection_wrap">
        <div className="title">
          <h1>Mythen der Migration</h1>
          <motion.hr
            animate={{ width: "50%" }}
            transition={{ duration: 0.5 }}
          ></motion.hr>

          <p>Wählen Sie ein Mythos aus für eine genau Betrachtung</p>
        </div>

        <img src={Circles} alt="circles" />

        <div className="selection_container">
          <div
            className={`mythos_1 mythos ${
              expandedMythos === 1 ? "expanded" : ""
            }`}
            onClick={() => handleClick(1)}
          >
            <h1>Mythos #1</h1>
            {expandedMythos === 1 && (
              <>
                <div className="mythos_content">
                  <hr />
                  <p>
                    Geflüchtete Menschen <br></br> wollen nicht arbeiten.
                  </p>
                  <button id="button1">
                    <Link to="/MythosEins">Zur Mythoswiderlegung</Link>
                  </button>
                </div>
              </>
            )}
          </div>
          <div
            className={`mythos_2 mythos ${
              expandedMythos === 2 ? "expanded" : ""
            }`}
            onClick={() => handleClick(2)}
          >
            <h1>Mythos #2</h1>
            {expandedMythos === 2 && (
              <>
                <div className="mythos_content">
                  <hr />
                  <p>Mythos #2 detaillierte Beschreibung.</p>
                  <button id="button2">Zur Mythoswiderlegung</button>
                </div>
              </>
            )}
          </div>
          <div
            className={`mythos_3 mythos ${
              expandedMythos === 3 ? "expanded" : ""
            }`}
            onClick={() => handleClick(3)}
          >
            <h1>Mythos #3</h1>
            {expandedMythos === 3 && (
              <>
                <hr />
                <div className="mythos_content">
                  <p>Mythos #3 detaillierte Beschreibung.</p>
                  <button id="button3">
                    <Link to="/MythosEins">Zur Mythoswiderlegung</Link>
                  </button>
                </div>
              </>
            )}
          </div>

          <div
            className={`mythos_4 mythos ${
              expandedMythos === 4 ? "expanded" : ""
            }`}
            onClick={() => handleClick(4)}
          >
            <h1>Mythos #4</h1>
            {expandedMythos === 4 && (
              <>
                <hr />
                <div className="mythos_content">
                  <p>Mythos #4 detaillierte Beschreibung.</p>
                  <button id="button1">
                    <Link to="/MythosEins">Zur Mythoswiderlegung</Link>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MythosAuswahl;
