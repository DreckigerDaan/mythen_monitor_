import World from "../assets/worldmap.svg";
import "./Mythos1Grafik2.css";
import * as d3 from "d3";
import { useRef, useEffect, useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import WorkIcon from "../assets/icon_work.svg";
import LipsIcon from "../assets/icon_lips.svg";
import StarIcon from "../assets/icon_star.svg";
import SnakeIcon from "../assets/icon_snake.svg";
import { Reveal2 } from "./Reveal2";

function Mythos1Graph2() {
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

  const svgRef = useRef();

  const [currentStepIndex2, setCurrentStepIndex] = useState(null);
  const [myGraphIsVisible, setMyGraphIsVisible] = useState();

  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  useEffect(() => {
    const svg = d3.select(svgRef.current).select("svg").remove();
    let svgContainer;

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setMyGraphIsVisible(entry.isIntersecting);
    });

    observer.observe(svgRef.current);

    const svgElement = d3.select(svgRef.current).select("svg");

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data2, (d) => d.year)])
      .range([0, width]);

    const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    if (svgElement.empty()) {
      svgContainer = d3
        .select(svgRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`); //svg sits nice and coozy in the container

      // Add X-Axis
      svgContainer
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x).ticks(9).tickFormat(d3.format("d")));

      // Add Y-Axis
      svgContainer.append("g").call(d3.axisLeft(y)).attr("class", "y-axis");

      //Add Y-Axis Text
      svgContainer
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

      // Add vertical gridlines
      svgContainer
        .selectAll("xGrid")
        .data(x.ticks().slice(1))
        .join("line")
        .attr("x1", (d) => x(d))
        .attr("x2", (d) => x(d))
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "#e0e0e0")
        .attr("stroke-width", 0.1);

      // Add horizontal gridlines
      svgContainer
        .selectAll("yGrid")
        .data(y.ticks().slice(1))
        .join("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", (d) => y(d))
        .attr("y2", (d) => y(d))
        .attr("stroke", "#e0e0e0")
        .attr("stroke-width", 0.1);

      // Create the line generator
      const line = d3
        .line()
        .x((d) => x(d.year))
        .y((d) => y(d.number));

      if (myGraphIsVisible) {
        const path = svgContainer
          .append("path")
          .datum(data2)
          .attr("fill", "none")
          .attr("stroke", "yellow")
          .attr("stroke-width", 1.5)
          .attr("d", line);

        // Animations-Setup basierend auf dem Schritt
        const totalLength = path.node().getTotalLength();
        path
          .attr("stroke-dasharray", totalLength)
          .attr("stroke-dashoffset", totalLength)
          .transition()
          .duration(2000)
          .attr("stroke-dashoffset", 0);
      }
    }
  }, [myGraphIsVisible]);

  useEffect(() => {
    const svgContainer = d3.select(svgRef.current).select("svg").select("g");

    const x = d3
      .scaleLinear()
      .domain([0, d3.max(data2, (d) => d.year)])
      .range([0, width]);

    const y = d3.scaleLinear().domain([0, 100]).range([height, 0]);

    if (currentStepIndex2 >= 1 && !svgContainer.select(".image-work").node()) {
      svgContainer
        .append("svg:image")
        .attr("class", "image-work")
        .attr("xlink:href", "src/assets/icon_work.svg")
        .attr("width", 50)
        .attr("height", 50)
        .attr("x", x(data2[0].year))
        .attr("y", y(data2[0].number + 20));
    }

    if (currentStepIndex2 >= 2 && !svgContainer.select(".image-lips").node()) {
      svgContainer
        .append("svg:image")
        .attr("class", "image-lips")
        .attr("xlink:href", "src/assets/icon_lips.svg")
        .attr("width", 50)
        .attr("height", 50)
        .attr("x", x(data2[1].year + 0.1))
        .attr("y", y(data2[1].number + 22));
    }

    if (currentStepIndex2 >= 3 && !svgContainer.select(".image-star").node()) {
      svgContainer
        .append("svg:image")
        .attr("class", "image-star")
        .attr("xlink:href", "src/assets/icon_star.svg")
        .attr("width", 50)
        .attr("height", 50)
        .attr("x", x(data2[2].year))
        .attr("y", y(data2[2].number + 20));
    }

    if (currentStepIndex2 >= 4 && !svgContainer.select(".image-snake").node()) {
      svgContainer
        .append("svg:image")
        .attr("class", "image-snake")
        .attr("xlink:href", "src/assets/icon_snake.svg")
        .attr("width", 50)
        .attr("height", 50)
        .attr("x", x(data2[3].year))
        .attr("y", y(data2[3].number + 20));
    }
  }, [currentStepIndex2]);
  return (
    <div className="wrap_grafik_2">
      <h2>Allerdings bestehen auch viele Einschränkungen..</h2>
      <Reveal2>
        <hr></hr>
      </Reveal2>

      <div className="container_graph_2">
        <img src={World} alt=" World" />
        <div className="infotext_grafik_einschraenkungen">
          <p>
            für geflüchtete Menschen, auf die sie keinen Einfluss haben, die
            jedoch in den ersten Jahren zu einer niedrigen Erwerbsquote führen.
            Diese Herausforderungen werden in der deutschen Integrationspolitik
            oft nicht ausreichend berücksichtigt und erschweren den
            Integrationsprozess erheblich.
          </p>
        </div>
      </div>

      <div className="scroll_container">
        <Scrollama offset={0.8} onStepEnter={onStepEnter}>
          <div id="grafik_einschraenkungen" ref={svgRef}></div>
          <Step data={1}>
            <div className="scroll_text">
              <p>
                In den ersten neun Monaten nach ihrer Ankunft haben geflüchtete
                Menschen in Deutschland kein Arbeitsrecht. Diese Frist kann
                jedoch erheblich verlängert werden, da die Bearbeitung durch die
                überlasteten Ämter oft länger dauert.
              </p>
            </div>
          </Step>
          <Step data={2}>
            <div className="scroll_text">
              <p>
                Es gibt zwar in Deutschland die notwendigen Strukturen für
                Deutschkurse, jedoch mangelt es an ausreichend qualifiziertem
                Personal, um alle geflüchteten Menschen zeitnah zu unterrichten.
              </p>
            </div>
          </Step>
          <Step data={3}>
            <div className="scroll_text">
              <p>
                Im Ausland erworbene Qualifikationen werden in Deutschland oft
                nicht anerkannt, was die Chancen auf eine Arbeitsplatzfindung
                verringert. Zudem fehlt es an Möglichkeiten, diese Kompetenzen
                durch Prüfungen oder vergleichbare Verfahren offiziell zu
                validieren.
              </p>
            </div>
          </Step>
          <Step data={4}>
            <div className="scroll_text">
              <p>
                Viele geflüchtete Menschen leiden aufgrund traumatischer
                Erfahrungen aus ihrem Herkunftsland und der Fluchtroute unter
                psychischen Belastungen. Der Zugang zu psychologischer Betreuung
                und Traumatherapie ist jedoch begrenzt, was die Integration
                zusätzlich erschwert.
              </p>
            </div>
          </Step>

          <Step data={5}>
            <div className="scroll_text_special"></div>
          </Step>
        </Scrollama>
      </div>

      <div className="list_container">
        <div className="list_item">
          <img src={WorkIcon} alt="icon_work"></img>
          <p>Arbeitsverbot</p>
        </div>
        <div className="list_item">
          <img src={LipsIcon} alt="icon_lips"></img>
          <p>nicht ausreichend Deutschkurse</p>
        </div>
        <div className="list_item">
          <img src={StarIcon} alt="icon_star"></img>
          <p>keine Anerkennung von Qualifikationen</p>
        </div>
        <div className="list_item">
          <img src={SnakeIcon} alt="icon_snake"></img>
          <p>keine psychologisch Betreuung</p>
        </div>
      </div>
    </div>
  );
}

export default Mythos1Graph2;
