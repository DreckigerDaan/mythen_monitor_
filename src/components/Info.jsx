import Arrow from "../assets/arrow_down.svg";
import { Link } from "react-router-dom";
import "./Info.css";
import MythosAuswahl from "./MythosAuswahl";
import NavBar from "./NavBar";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { Reveal2 } from "./Reveal2";

function Info() {
  return (
    <div className="info">
      <NavBar />
      <div className="wrap">
        <h1>Was ist überhaupt ein Mythos?</h1>

        <motion.hr
          animate={{ width: "50%" }}
          transition={{ duration: 0.5 }}
        ></motion.hr>
        <Reveal>
          <div className="diago_bg">
            <h3>
              {" "}
              ..Ein Mythos ist eine Art, wie Menschen die Welt verstehen und
              erklären, die stark von Gefühlen und Symbolen geprägt ist.
              Gleichzeitig verbirgt ein Mythos oft die wahren Gründe hinter
              kulturellen und gesellschaftlichen Bedeutungen und lässt sie
              natürlich erscheinen, um bestimmte Werte und Machtstrukturen zu
              unterstützen..
            </h3>

            <p style={{ textAlign: "right", fontWeight: 200 }}>
              {" "}
              Definiton Mythos
            </p>

            <h3>
              ..Der Begriff Mythos wird in der folgenden Ausarbeitung als Summe
              von Fehlinformationen, bewusster Falschdarstellung, Verzerrung von
              Daten und Vorurteilen benutzt..
            </h3>
          </div>
        </Reveal>
        <Reveal>
          <Reveal2>
            <hr></hr>
          </Reveal2>

          <div className="scroll-step">
            <h2>Es muss immer ein Nutzen dahinter stehen..</h2>
            <div className="diago_bg">
              <h3>
                Diese Ausarbeitung soll lediglich eine Widerlegung des oben
                genannnten Mythos darstellen und nicht die Annahme
                untersteichen, dass ein Migrant oder eine Migrantin nur einen
                Nutzen haben wenn Sie ein Teil des Arbeitsmarktes sind und das
                Bruttoinlandsprodukt ankurbeln
              </h3>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <h1>
            Wie ist der aktuelle Diskurs<br></br> um das Thema?{" "}
          </h1>
        </Reveal>

        <Reveal2>
          <hr></hr>
        </Reveal2>
        <Reveal>
          <h2>Pro Migration oder Kontra Migration Debatten..</h2>

          <div className="diago_bg">
            <h3>
              lassen keine echten Auseinandersetzung mit dem Thema zu und bieten
              keinen Raum für Zwischentöne und Differenzierungen. Das Phänomen
              Migration ist zu vielschichtig für einfaches Schwarz-Weiß-Denken.
              Wir übersehen dabei einen wesentlichen Aspekt des menschlichen
              Daseins und unserer Geschichte. Migration hat es schon immer
              gegeben, sie ist so alt wie die Menschheit.
            </h3>
          </div>
        </Reveal>

        <Reveal>
          <h2>Du fragts ja auch nicht..</h2>

          <div className="diago_bg_2">
            <h3>
              eine Wirtschaftswissenschaftlerin ob sie für oder gegen die
              Wirtschaft ist. Oder eine Agrarwissenschaftlerin ob sie für oder
              gegen Landwirtschaft ist.
            </h3>
          </div>
        </Reveal>
        <Reveal>
          <h2>Migration ist..</h2>
          <div className="diago_bg_3">
            <h3>
              weder ein Problem, welches es zu lösen gilt. Noch ist es eine
              Lösung für unsere industriestaatlichen Probleme.
            </h3>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div>
          <div className="arrow">
            <Link to="/MythosAuswahl">
              <img src={Arrow} alt=" Arrow" />
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

export default Info;
