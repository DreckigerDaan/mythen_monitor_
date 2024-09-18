import "./MythosEins.css";
import World from "../assets/world_map_cropped.png";
import InformationIcon from "../assets/icon_information.svg";
import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import { useInView } from "react-intersection-observer";
import NavBar from "./NavBar";
import Mythos1Graph2 from "./Mythos1Graph2";
import Mythos1Graph3 from "./Mythos1Graph3";
import Circles2 from "../assets/circles_colors.svg";
import { Reveal } from "./Reveal";
import { Reveal2 } from "./Reveal2";
import { motion } from "framer-motion";

function MythosEins() {
  const margin = { top: 20, right: 10, bottom: 30, left: 40 };
  const width = 350 - margin.left - margin.right;
  const height = 280 - margin.top - margin.bottom;

  const data2 = [
    { year: 0, number: 0 },
    { year: 1, number: 9 },
    { year: 2, number: 26 },
    { year: 3, number: 44 },
    { year: 4, number: 51 },
    { year: 5, number: 60 },
    { year: 6, number: 70 },
    { year: 7, number: 75 },
    { year: 8, number: 86 },
  ];

  const data3 = [
    { year: 0, number: 77.6 },
    { year: 1, number: 77.7 },
    { year: 2, number: 77.8 },
    { year: 3, number: 77.7 },
    { year: 4, number: 78.0 },
    { year: 5, number: 78.9 },
    { year: 6, number: 79.6 },
    { year: 7, number: 80.5 },
    { year: 8, number: 79.0 },
  ];

  const [myGraphIsVisible, setMyGraphIsVisible] = useState();

  const [currentStepIndex, setCurrentStepIndex] = useState(null);
  const svgRef = useRef();

  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setMyGraphIsVisible(entry.isIntersecting);
    });

    observer.observe(svgRef.current);

    const svgContainer = d3.select(svgRef.current).select("svg");

    // Falls kein SVG vorhanden, füge es hinzu
    if (svgContainer.empty()) {
      const svg = d3
        .select(svgRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const x = d3.scaleLinear().domain([0, 8]).range([0, width]);
      const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

      svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(9).tickFormat(d3.format("d")));

      svg.append("g").call(d3.axisLeft(y)).attr("class", "y-axis");

      svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - height / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size", "14px")
        .style("fill", "#777")
        .text("Erwerbsquote in %");

      svg
        .append("path")
        .attr("class", "line-path")
        .attr("fill", "none")
        .attr("stroke", "yellow")
        .attr("stroke-width", 2)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round");

      svg
        .append("path")
        .attr("class", "line-path2")
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 2)
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round");

      //Add Y-Axis Text
      svg
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - height / 2)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .style("font-size", "14px")
        .style("fill", "#777")
        .style("font-family", "sans-serif")
        .text("Erwerbsquote in %");

      //Add Source credit

      svg
        .append("text")
        .attr("class", "source-credit")
        .attr("x", width - 300)
        .attr("y", height + margin.bottom)
        .style("font-size", "9px")
        .style("font-family", "sans-serif")
        .style("fill", "#777")
        .text("Quelle: https://doku.iab.de/kurzber/2024/kb2024-10.pdf");

      // Add vertical gridlines
      svg
        .selectAll("xGrid")
        .data(x.ticks().slice(1))
        .join("line")
        .attr("x1", (d) => x(d))
        .attr("x2", (d) => x(d))
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "#e0e0e0")
        .attr("stroke-width", 0.1);

      svg
        .selectAll("yGrid")
        .data(y.ticks().slice(1))
        .join("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", (d) => y(d))
        .attr("y2", (d) => y(d))
        .attr("stroke", "#e0e0e0")
        .attr("stroke-width", 0.1);
    }

    if (currentStepIndex !== null) {
      const svg = d3.select(svgRef.current).select("svg");

      const x = d3.scaleLinear().domain([0, 8]).range([0, width]);
      const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

      const line = d3
        .line()
        .x((d) => x(d.year))
        .y((d) => y(d.number));

      const linePath = svg.select(".line-path");
      const linePath2 = svg.select(".line-path2");

      // Daten filtern je nach Step
      const filteredData =
        currentStepIndex === 1
          ? data2.slice(0, 4)
          : currentStepIndex === 2
          ? data2.slice(0, 7)
          : currentStepIndex === 3
          ? data2.slice(0, 9)
          : data2;

      // Linie zeichnen und erweitern
      linePath
        .datum(filteredData)
        .attr("d", line)
        .attr("stroke-dasharray", function () {
          return this.getTotalLength();
        })
        .attr("stroke-dashoffset", function () {
          return (
            this.getTotalLength() -
            this.getTotalLength() * (filteredData.length / data2.length)
          );
        })
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);

      // Zweite Linie nach letztem Schritt animieren
      if (currentStepIndex === 4) {
        linePath2
          .datum(data3)
          .attr("d", line)
          .attr("stroke-dasharray", function () {
            return this.getTotalLength();
          })
          .attr("stroke-dashoffset", function () {
            return this.getTotalLength();
          })
          .transition()
          .duration(2000)
          .ease(d3.easeLinear)
          .attr("stroke-dashoffset", 0);
      }
    }
  }, [currentStepIndex]);

  return (
    <div className="mythos_eins">
      <NavBar />
      <h1>Mythoswiderlegung</h1>

      <motion.hr
        animate={{ width: "50%" }}
        transition={{ duration: 0.5 }}
      ></motion.hr>

      <div className="myth_bg">
        <div className="myth_content">
          <h2>Mythos #1</h2>
          <br />
          <div className="myth_headline">
            <h2>
              Geflüchtete Menschen<br></br> wollen nicht arbeiten
            </h2>
          </div>
        </div>
      </div>

      <div className="myth_bg_second"></div>
      <div className="quote_container">
        <Reveal>
          <div className="quote">
            {/* <img src={Quote} alt="quote_symbol"></img> */}
            <h3>
              "Die von Ihnen eingeladenen Migranten kommen, um in unsere
              Sozialsysteme einzuwandern. Es handelt sich dabei nicht um
              Fachkräfte und Schutzsuchende, sondern um Sozialmigranten, die
              sich in unserer Hängematte ausruhen."
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
              „Das Schlaraffenland Deutschland wird zur Zuflucht für all
              diejenigen, die nicht arbeiten wollen.“
            </h3>
            <p>Björn Höcke, AfD-Kundgebung</p>
          </div>
        </Reveal>

        <Reveal2>
          <hr></hr>
        </Reveal2>
        <Reveal>
          <div className="quote">
            <h3>
              „Deutschland muss Einwanderung in seine Sozialsysteme verhindern
              und eine strengere Asylpolitik umsetzen.“
            </h3>
            <p>Friedrich Merz, Tagesspiegel 2022</p>
          </div>
        </Reveal>
      </div>

      <div className="wrap">
        <Reveal>
          <h2>Diese Aussagen verdeutlichen..</h2>
          <div className="diago_bg">
            <p>
              ..wie PolitikerInnen Populismus nutzen, um Stimmen zu gewinnen und
              eine auf Hetze basierende Stimmung zu schüren. Dabei werden Fakten
              verdreht, Statistiken falsch interpretiert und Desinformationen
              gestreut.
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

      <h2>Faktenanalyse</h2>
      <Reveal2>
        <hr></hr>
      </Reveal2>
      <h2>Erwerbsquote</h2>
      <div className="world_map_graph">
        <img src={World} alt=" World" />
        <div className="info_text">
          <p>
            Die Entwicklung der Erwerbsquote bei geflüchteten Männern, die im
            Rahmen der sogenannten 'Flüchtlingskrise' 2014 – 2016 nach
            Deutschland gekommen sind, wird im Zeitraum von mehreren Jahren
            analysiert:
          </p>
          {/* Container for the D3 chart */}
        </div>
      </div>

      <div className="wrap_grafik">
        <div className="scroll_container">
          <Scrollama offset={0.8} onStepEnter={onStepEnter}>
            <div id="grafik_erwerbsquote" ref={svgRef}></div>
            <Step data={1}>
              <div className="scroll_text">
                <p>
                  Zu Beginn der Migration ist die Erwerbsquote häufig niedrig
                  aufgrund von Integrationshürden. Allerdings zeigt sich nach
                  den ersten Jahren bereits eine stetige Steigerung, die die
                  zunehmende Arbeitsmarktintegration geflüchteter Menschen
                  verdeutlicht.
                </p>
              </div>
            </Step>

            <Step data={2}>
              <div className="scroll_text">
                <p>
                  Die Erwerbsquote geflüchteter Menschen zeigt eine konstante
                  Steigerung über die Zeit. Nachdem sie sich eingelebt, die
                  Sprache gelernt und Qualifikationen erworben haben,
                  integrieren sie sich zunehmend erfolgreich in den
                  Arbeitsmarkt.
                </p>
              </div>
            </Step>

            <Step data={3}>
              <div className="scroll_text">
                <p>
                  Nach etwa acht Jahren erreicht die Beschäftigungsquote
                  geflüchteter Menschen etwa 85%.
                </p>
              </div>
            </Step>

            <Step data={4}>
              <div className="scroll_text">
                <p>
                  Betrachtet man die Beschäftigungsquoten von ausländischen und
                  deutschen Männern über denselben Zeitraum, zeigt sich
                  folgendes:
                </p>
              </div>
            </Step>

            <Step data={4}>
              <div className="scroll_text">
                <p>
                  Nach acht Jahren Integrationszeit liegt die
                  Beschäftigungsquote geflüchteter Männer sogar über der von
                  einheimischen deutschen Männern. Dies verdeutlicht, dass
                  geflüchtete Männer langfristig erfolgreich in den Arbeitsmarkt
                  integriert sind.
                </p>
              </div>
            </Step>
          </Scrollama>
        </div>
      </div>

      <div className="wrap">
        <Reveal>
          <h2>Die Daten zeige..</h2>
          <div className="diago_bg">
            <p>
              ..dass geflüchtete Männer nach acht Jahren Integrationszeit eine
              höhere Beschäftigungsquote aufweisen als ihre einheimischen
              Kollegen. Dies beweist, dass Integrationsmaßnahmen effektiv sind
              und geflüchtete Menschen erfolgreich in den Arbeitsmarkt
              integriert werden.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <h2>Die tatsächlichen Fakten..</h2>
          <div className="diago_bg_2">
            <p>
              ..widerlegen die populistische Behauptung, dass geflüchtete
              Menschen grundsätzlich nicht arbeiten wollen. Die Zahlen
              bestätigen, dass geflüchtete Männer bei ausreichender Zeit und
              Unterstützung genauso engagiert im Arbeitsmarkt sind wie
              einheimische Arbeitnehmer.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <h2>Die kontinuierliche Steigerung..</h2>
          <div className="diago_bg_3">
            <p>
              ..der Erwerbsquote über Jahre hinweg hebt die Bedeutung
              langfristiger Integrationsstrategien hervor. Sie zeigt, dass
              nachhaltige Integrationsprogramme entscheidend sind, um die
              wirtschaftliche Teilhabe geflüchteter Menschen zu fördern.
            </p>
          </div>
        </Reveal>
      </div>

      <Mythos1Graph2 />

      <Mythos1Graph3 />

      <div className="wrap_grafik">
        <h2>
          Zusammenfassung<br></br> der <br></br>Widerlegung
        </h2>
        <Reveal2>
          <hr></hr>
        </Reveal2>
        <div className="summary_container">
          <img src={World} alt=" World" />
          <div className="info_text_summary">
            <p>
              Die Oben aufgeführten faktenbasierte Argumente widerlegen den
              Mythos " Geflüchtete wollen nicht arbeiten". Hier noch einmal die
              Erkenntnisse schwarz auf weiß zusammengefasst:
            </p>
            {/* Container for the D3 chart */}
          </div>
          <div className="farbverlauf"></div>
          <div className="summary">
            <Reveal>
              <div className="bullet_point_summary">
                <img src={InformationIcon} alt=" InformationIcon" />
                <p>
                  Die Erwerbsquote von Geflüchteten Männer ist nach ca. 8 Jahren
                  mindestens genau so hoch wie die von deutschen Männern
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="bullet_point_summary">
                <img src={InformationIcon} alt=" InformationIcon" />
                <p>
                  Bürokratische Hindernisse, fehlende medizinische Angebote und
                  Hilfe und ein anfängliches Arbeitsverbot haben einen großen
                  Einfluss auf die Erwerbsquote von Geflüchteten
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div className="bullet_point_summary">
                <img src={InformationIcon} alt=" InformationIcon" />
                <p>
                  Es gibt einen eindeutigen Zusammenhang zwischen
                  Wirtschaftswachstum und Zuwanderungen. Die Nachfrage nach
                  Arbeitskräften ist der wahre Motor der Migration
                </p>
              </div>
            </Reveal>

            <div className="summary_circles">
              <img src={Circles2} alt="circles2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MythosEins;
