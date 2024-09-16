import World from "../assets/worldmap.svg";
import { useRef, useEffect, useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import * as d3 from "d3";
import { Reveal } from "./Reveal";
import "./Mythos1Graph3.css";
import { Reveal2 } from "./Reveal2";

function Mythos1Grafik3() {
  const margin = { top: 20, right: 10, bottom: 30, left: 40 };
  const width = 380 - margin.left - margin.right;
  const height = 280 - margin.top - margin.bottom;

  const [myGraphIsVisible, setMyGraphIsVisible] = useState();

  const data2 = [
    { year: 1971, Wirtschaftswachstum: 3.1, Nettozuwanderungen: 382069 },
    { year: 1972, Wirtschaftswachstum: 4.3, Nettozuwanderungen: 283939 },
    { year: 1973, Wirtschaftswachstum: 4.8, Nettozuwanderungen: 352564 },
    { year: 1974, Wirtschaftswachstum: 0.9, Nettozuwanderungen: -34600 },
    { year: 1975, Wirtschaftswachstum: -0.9, Nettozuwanderungen: -223902 },
    { year: 1976, Wirtschaftswachstum: 4.9, Nettozuwanderungen: -92847 },
    { year: 1977, Wirtschaftswachstum: 3.3, Nettozuwanderungen: 16915 },
    { year: 1978, Wirtschaftswachstum: 3.0, Nettozuwanderungen: 100851 },
    { year: 1979, Wirtschaftswachstum: 4.2, Nettozuwanderungen: 230741 },
    { year: 1980, Wirtschaftswachstum: 1.4, Nettozuwanderungen: 296791 },
    { year: 1981, Wirtschaftswachstum: 0.5, Nettozuwanderungen: 135104 },
    { year: 1982, Wirtschaftswachstum: -0.4, Nettozuwanderungen: -89476 },
    { year: 1983, Wirtschaftswachstum: 1.6, Nettozuwanderungen: -132772 },
    { year: 1984, Wirtschaftswachstum: 2.8, Nettozuwanderungen: -194445 },
    { year: 1985, Wirtschaftswachstum: 2.3, Nettozuwanderungen: 55559 },
    { year: 1986, Wirtschaftswachstum: 2.3, Nettozuwanderungen: 160076 },
    { year: 1987, Wirtschaftswachstum: 1.4, Nettozuwanderungen: 193247 },
    { year: 1988, Wirtschaftswachstum: 3.7, Nettozuwanderungen: 441139 },
    { year: 1989, Wirtschaftswachstum: 3.9, Nettozuwanderungen: 593962 },
    { year: 1990, Wirtschaftswachstum: 5.3, Nettozuwanderungen: 681872 },
    { year: 1991, Wirtschaftswachstum: 5.1, Nettozuwanderungen: 602523 },
    { year: 1992, Wirtschaftswachstum: 1.9, Nettozuwanderungen: 782071 },
    { year: 1993, Wirtschaftswachstum: -1.0, Nettozuwanderungen: 462096 },
    { year: 1994, Wirtschaftswachstum: 2.4, Nettozuwanderungen: 314998 },
    { year: 1995, Wirtschaftswachstum: 1.5, Nettozuwanderungen: 397935 },
    { year: 1996, Wirtschaftswachstum: 0.8, Nettozuwanderungen: 282197 },
    { year: 1997, Wirtschaftswachstum: 1.8, Nettozuwanderungen: 93664 },
    { year: 1998, Wirtschaftswachstum: 2.0, Nettozuwanderungen: 47098 },
    { year: 1999, Wirtschaftswachstum: 1.9, Nettozuwanderungen: 201975 },
    { year: 2000, Wirtschaftswachstum: 2.9, Nettozuwanderungen: 167120 },
    { year: 2001, Wirtschaftswachstum: 1.7, Nettozuwanderungen: 272723 },
    { year: 2002, Wirtschaftswachstum: -0.2, Nettozuwanderungen: 219288 },
    { year: 2003, Wirtschaftswachstum: -0.7, Nettozuwanderungen: 142645 },
    { year: 2004, Wirtschaftswachstum: 1.2, Nettozuwanderungen: 82543 },
    { year: 2005, Wirtschaftswachstum: 0.7, Nettozuwanderungen: 78953 },
    { year: 2006, Wirtschaftswachstum: 3.8, Nettozuwanderungen: 22791 },
    { year: 2007, Wirtschaftswachstum: 3.0, Nettozuwanderungen: 43912 },
    { year: 2008, Wirtschaftswachstum: 1.0, Nettozuwanderungen: -55743 },
    { year: 2009, Wirtschaftswachstum: -5.7, Nettozuwanderungen: -12782 },
    { year: 2010, Wirtschaftswachstum: 4.2, Nettozuwanderungen: 127677 },
    { year: 2011, Wirtschaftswachstum: 3.9, Nettozuwanderungen: 279330 },
    { year: 2012, Wirtschaftswachstum: 0.4, Nettozuwanderungen: 368945 },
    { year: 2013, Wirtschaftswachstum: 0.4, Nettozuwanderungen: 428607 },
    { year: 2014, Wirtschaftswachstum: 2.2, Nettozuwanderungen: 550483 },
    { year: 2015, Wirtschaftswachstum: 1.5, Nettozuwanderungen: 1139402 },
    { year: 2016, Wirtschaftswachstum: 2.2, Nettozuwanderungen: 499944 },
    { year: 2017, Wirtschaftswachstum: 2.7, Nettozuwanderungen: 416080 },
    { year: 2018, Wirtschaftswachstum: 1.0, Nettozuwanderungen: 399680 },
    { year: 2019, Wirtschaftswachstum: 1.1, Nettozuwanderungen: 327060 },
    { year: 2020, Wirtschaftswachstum: -3.8, Nettozuwanderungen: 220251 },
    { year: 2021, Wirtschaftswachstum: 3.2, Nettozuwanderungen: 329163 },
    { year: 2022, Wirtschaftswachstum: 1.8, Nettozuwanderungen: 1462089 },
    { year: 2023, Wirtschaftswachstum: -0.2, Nettozuwanderungen: 662964 },
  ];

  const svgRef = useRef();

  const [currentStepIndex, setCurrentStepIndex] = useState(null);

  const onStepEnter = ({ data }) => {
    setCurrentStepIndex(data);
  };

  const resetStepIndex = () => {
    setCurrentStepIndex(null);
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setMyGraphIsVisible(entry.isIntersecting);
    });

    observer.observe(svgRef.current);

    const svg = d3.select(svgRef.current).select("svg").remove(); // Clear existing SVG if any

    const svgContainer = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`); //svg sits nice and cozy in the container

    const x = d3
      .scaleLinear()
      .domain([1970, d3.max(data2, (d) => d.year)])
      .range([0, width]);

    const y0 = d3.scaleLinear().domain([-6, 6]).range([height, 0]); // Scale for Wirtschaftswachstum
    const y1 = d3.scaleLinear().domain([-400000, 1200000]).range([height, 0]); // Scale for Nettozuwanderungen

    // Add X-Axis
    svgContainer
      .append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(9).tickFormat(d3.format("d")));

    // Add Y-Axis for Wirtschaftswachstum
    svgContainer
      .append("g")
      .call(d3.axisLeft(y0))
      .append("text")
      .attr("fill", "#777")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "-3em")
      .style("text-anchor", "end")
      .text("Wirtschaftswachstum (%)");

    // Add Y-Axis for Nettozuwanderungen
    svgContainer
      .append("g")
      .attr("transform", `translate(${width}, 0)`)
      .call(d3.axisRight(y1))
      .append("text")
      .attr("fill", "#777")
      .attr("transform", "rotate(-90)")
      .attr("y", -15)
      .attr("dy", "3em")
      .style("text-anchor", "end")
      .text("Nettozuwanderungen");

    // Line for Wirtschaftswachstum
    const line1 = svgContainer
      .append("path")
      .datum(data2)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x((d) => x(d.year))
          .y((d) => y0(d.Wirtschaftswachstum))
      );

    const totalLength1 = line1.node().getTotalLength();
    line1
      .attr("stroke-dasharray", `${totalLength1} ${totalLength1}`)
      .attr("stroke-dashoffset", totalLength1)
      .transition()
      .duration(3000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);

    // Line for Nettozuwanderungen
    const line2 = svgContainer
      .append("path")
      .datum(data2)
      .attr("fill", "none")
      .attr("stroke", "yellow")
      .attr("stroke-width", 1.5)
      .attr(
        "d",
        d3
          .line()
          .x((d) => x(d.year))
          .y((d) => y1(d.Nettozuwanderungen))
      );

    const totalLength2 = line2.node().getTotalLength();
    line2
      .attr("stroke-dasharray", `${totalLength2} ${totalLength2}`)
      .attr("stroke-dashoffset", totalLength2)
      .transition()
      .duration(3000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);

    // Optional: Add points or other annotations
  }, [myGraphIsVisible]);

  useEffect(() => {
    const svgContainer = d3.select(svgRef.current).select("svg");

    if (currentStepIndex === 1) {
      svgContainer
        .append("circle")
        .attr("cx", 140)
        .attr("cy", 115)
        .attr("r", 55)
        .attr("stroke", "red")
        .attr("stroke-width", "2")
        .attr("fill", "none");
    }

    if (currentStepIndex === 2) {
      svgContainer
        .append("circle")
        .attr("cx", 250)
        .attr("cy", 140)
        .attr("r", 40)
        .attr("stroke", "red")
        .attr("stroke-width", "2")
        .attr("fill", "none");
    }

    resetStepIndex();
  }, [currentStepIndex]);

  return (
    <div className="wrap_grafik_2">
      <h2>Faktenanalyse</h2>
      <Reveal2>
        <hr></hr>
      </Reveal2>
      <h2>
        Wirtschaftswachstum<br></br> & <br></br>Nettozuwanderung
      </h2>

      <div className="container_graph_2">
        <img src={World} alt=" World" />
        <div className="infotext_grafik_einschraenkungen">
          <p>
            Im folgenden soll dargestellt werden, inwiefern eine wachsende
            Wirtschaft und die damit verbundene Nachfrage nach Arbeitskräften
            einen Einfluss auf Migration hat
          </p>
        </div>
      </div>

      <div className="wrap">
        <Reveal>
          <h2>Die folgende Grafik..</h2>
          <div className="diago_bg">
            <p>
              stellt den Zusammenhang zwischen dem Wirtschaftswachstum und der
              Nettozuwanderung in Deutschland her.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <h2>Die weiße Linie steht..</h2>
          <div className="diago_bg_2">
            <p>
              für das Wirtschaftswachstum in Deutschland zwischen den Jahren
              1970 - 2023.<br></br> Die{" "}
              <span style={{ color: "yellow", margin: 0, padding: 0 }}>
                gelbe
              </span>{" "}
              Linie steht für die Nettozuwanderungen, sprich die Zahl der
              Zugewanderten minus die Zahl der Menschen, die das Land im selben
              Jahr verlassen haben, im selben Zeitraum.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <h2>Die rechte Y-Achse</h2>
          <div className="diago_bg_3">
            <p>
              bezieht sich auf das Wirtschaftswachstum in %, die linke Y-Achse
              auf die Nettozuwanderungen in absoluter Zahl.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="wrap_grafik">
        <Scrollama offset={0.8} onStepEnter={onStepEnter}>
          <div id="grafik_motor_migration" ref={svgRef}></div>

          <Step data={1}>
            <div className="scroll_text">
              <p>
                Die Zuwanderung folgt der wirtschaftlichen Entwicklung wie ein
                Schatten, in der Regel im Abstand von sechs bis zwölf Monaten.
              </p>
            </div>
          </Step>

          <Step data={2}>
            <div className="scroll_text_two">
              <p>
                Eine wachsende Wirtschaft erhöht den Bedarf nach Arbeitskräften,
                dies ist der wahre Motor der Migration.
              </p>
            </div>
          </Step>
        </Scrollama>
      </div>

      <div className="wrap">
        <Reveal>
          <h2>Der Befund ist eindeutig:</h2>
          <div className="diago_bg">
            <p>
              Wenn das Wirtschafswachstum hoch und die Arbeitslosigkeit niedrig
              ist, dann werden die Arbeitskräfte knapp. Damit wird es
              wahrscheinlicher, dass MigrantInnen ein Arbeitsvisum erhalten.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <h2>Die Zuwanderung steigt..</h2>
          <div className="diago_bg_2">
            <p>
              wenn der Motor der Wirtschaft brummt. Die Nachfrage nach
              Arbeitskräften steigt.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <h2>Die Zuwanderung sinkt..</h2>
          <div className="diago_bg_3">
            <p>
              wenn der Motor der Wirtschaft stottert. Die Nachfrage nach
              Arbeitskräften sinkt.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default Mythos1Grafik3;
