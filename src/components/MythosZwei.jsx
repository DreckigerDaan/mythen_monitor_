import { Reveal } from "./Reveal";
import { Reveal2 } from "./Reveal2";
import NavBar from "./NavBar";
import { motion } from "framer-motion";
import World from "../assets/world_map_cropped.png";
import { useRef, useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function MythosZwei() {
  const totalArbeitsmarkt = 43;
  const auslaendischeArbeitskraefte = 5.3;

  // Farbpalette für die Segmente
  const COLORS = ["#0088FE", "#FFBB28"]; // Blau für den Gesamtmarkt, Gelb für den Anteil der ausländischen Arbeitskräfte

  // Initialzustand: Nur Gesamtmarkt wird angezeigt
  const [data, setData] = useState([
    { name: "Arbeitsmarkt", value: totalArbeitsmarkt },
  ]);

  useEffect(() => {
    // Startet die Animation nach 1 Sekunde
    const timer = setTimeout(() => {
      setData([
        {
          name: "Inländische Arbeitskräfte",
          value: totalArbeitsmarkt - auslaendischeArbeitskraefte,
        },
        {
          name: "Ausländische Arbeitskräfte",
          value: auslaendischeArbeitskraefte,
        },
      ]);
    }, 10000); // Nach 1 Sekunde animiert der Anteil der ausländischen Arbeitskräfte

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="mythos_zwei">
      <div className="mythos_eins">
        <NavBar />
        <h1>Mythoswiderlegung</h1>

        <motion.hr
          animate={{ width: "50%" }}
          transition={{ duration: 0.5 }}
        ></motion.hr>

        <div className="myth_bg">
          <div className="myth_content">
            <h2>Mythos #2</h2>
            <br />
            <div className="myth_headline">
              <h2>Die Arbeit von MigrantInnen ist nicht systemrelevant</h2>
            </div>
          </div>
        </div>

        <div className="myth_bg_second"></div>
        <div className="quote_container">
          <Reveal>
            <div className="quote">
              {/* <img src={Quote} alt="quote_symbol"></img> */}
              <h3>
                „Burkas, Kopftuchmädchen, alimentierte Messermänner und sonstige
                Taugenichtse werden unseren Wohlstand, das Wirtschaftswachstum
                und vor allem den Sozialstaat nicht sichern.“
              </h3>
              <p>Alice Weidel, Bundestagsdebatte</p>
            </div>
          </Reveal>

          <Reveal2>
            <hr></hr>
          </Reveal2>

          <Reveal>
            <div className="quote">
              <h3>
                „"Wir brauchen keine gut ausgebildeten Syrer, wir brauchen
                deutsche Facharbeiter, die gut ausgebildet sind, und diese
                Facharbeiter haben wir auch. Wir brauchen nicht Migration, die
                uns letztlich nur schadet."“
              </h3>
              <p>Alexander Gauland, Interview Tagesspiegel</p>
            </div>
          </Reveal>

          <Reveal2>
            <hr></hr>
          </Reveal2>
          <Reveal>
            <div className="quote">
              <h3>
                „Seht euch die Schulen an, schaut euch die Wohnraumsituation an,
                schaut euch die Universitäten an, schaut euch die Krankenhäuser
                an, schaut euch die Arztpraxen an, schaut euch an, was das für
                Konsequenzen hat, wenn ein Land durch Migration überfordert
                wird“
              </h3>
              <p>Friedrich Merz, Tagesspiegel 2022</p>
            </div>
          </Reveal>
        </div>
      </div>
      <h2>Faktenanalyse</h2>
      <Reveal2>
        <hr></hr>
      </Reveal2>
      <h2>Arbeitsmarkt</h2>
      <div className="world_map_graph">
        <img src={World} alt=" World" />
        <div className="info_text">
          <p>
            Verhältnis von deutschen und ausländischen Arbeitenden am
            Arbeitsmarkt
          </p>
          {/* Container for the D3 chart */}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={true} // aktiviert die Animation
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      <div className="wrap">
        <Reveal>
          <h2>Diese Aussagen verdeutlichen</h2>
          <div className="diago_bg">
            <p>
              An unseren Ergebnissen sieht man: Ohne Migrant*innen funktioniert
              unsere Gesellschaft nicht. Gerade in solchen Zeiten. Es zeigt sich
              aber auch, dass Systemrelevanz und Anerkennung nicht Hand in Hand
              gehen. Und damit meine ich sowohl die formale Anerkennung, also
              etwa einen guten Lohn und gute Arbeitsbedingungen. Ich meine aber
              auch die gesellschaftliche Akzeptanz der Menschen, die in diesen
              Berufen arbeiten.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <h2>Die reale Integration..</h2>
          <div className="diago_bg_2">
            <p>
              ..geflüchteter Menschen in den Arbeitsmarkt zeigt oft ein ganz
              anderes Bild als die populistischen Narrative. Statistiken
              belegen, dass viele geflüchtete Menschen aktiv arbeiten und zur
              wirtschaftlichen Stabilität beitragen, entgegen der weit
              verbreiteten Annahme, dass sie nicht erwerbstätig sind.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <h2>Zur Entkräftung ..</h2>
          <div className="diago_bg_special">
            <p>
              ..populistischer Vorurteile ist es entscheidend, sich auf
              verlässliche Statistiken zu stützen. Diese Daten ermöglichen eine
              präzise Bewertung der tatsächlichen Arbeitsmarktintegration
              geflüchteter Menschen und bieten eine fundierte Grundlage gegen
              verzerrte Darstellungen.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default MythosZwei;
