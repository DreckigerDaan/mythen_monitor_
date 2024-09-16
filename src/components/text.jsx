import Quote from "../assets/quotes_icon.svg";
import "./MythosEins.css";
import World from "../assets/world_map_cropped.png";
import InformationIcon from "../assets/icon_information.svg";
import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import NavBar from "./NavBar";
import { motion } from "framer-motion";

function text() {
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

  const [currentStepIndex, setCurrentStepIndex] = useState(null);
  const svgRef = useRef();

  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  useEffect(() => {
    console.log(currentStepIndex);
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
        .ease(d3.easeExp)
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
          .ease(d3.easeExp)
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
      <div className="world_map_graph">
        <img src={World} alt="World" />
        <div className="info_text">
          <p>
            Schauen wir uns die Entwicklung der Erwerbsquote von geflüchteten
            Männern an:
          </p>
        </div>
      </div>
      <div className="wrap_grafik">
        <div className="scroll_container">
          <Scrollama offset={0.8} onStepEnter={onStepEnter}>
            <div id="grafik_erwerbsquote" ref={svgRef}></div>
            <Step data={1}>
              <div className="scroll_text">
                <p>
                  Die Erwerbsquote startet niedrig, doch eine Steigerung ist
                  erkennbar.
                </p>
              </div>
            </Step>
            <Step data={2}>
              <div className="scroll_text">
                <p>
                  Die Steigung bleibt konstant. Menschen lernen die Sprache und
                  erlangen Qualifikationen.
                </p>
              </div>
            </Step>
            <Step data={3}>
              <div className="scroll_text">
                <p>In 8 Jahren hat sich die Erwerbsquote deutlich erhöht.</p>
              </div>
            </Step>
            <Step data={4}>
              <div className="scroll_text">
                <p>
                  Im Vergleich zu deutschen Staatsbürgern bleiben jedoch
                  Unterschiede bestehen.
                </p>
              </div>
            </Step>
          </Scrollama>
        </div>
      </div>
    </div>
  );
}

export default text;
