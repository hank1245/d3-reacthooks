import logo from "./logo.svg";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import {
  select,
  line,
  axisBottom,
  scaleBand,
  scaleLinear,
  max,
  axisRight,
  curveCardinal,
} from "d3";

function App() {
  const [data, setData] = useState([25, 100, 45, 60, 20, 30, 40]);
  const svgRef = useRef(null);
  useEffect(() => {
    const svg = select(svgRef.current).attr("width", 300).attr("height", 150);
    const width = svg.attr("width");
    const height = svg.attr("height");
    //scale
    const xAxisG = svg.append("g").attr("transform", `translate(0,${height})`);
    const yAxisG = svg.append("g").attr("transform", `translate(${width},0)`);
    const xScale = scaleLinear().domain([0, 6]).range([0, width]);
    const yScale = scaleLinear().domain([0, height]).range([height, 0]);
    const xAxis = axisBottom(xScale).ticks(data.length);
    const yAxis = axisRight(yScale);
    xAxisG.call(xAxis);
    yAxisG.call(yAxis);
    //line
    const myLine = line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(curveCardinal);

    svg
      .selectAll(".line")
      .data([data])
      .join("path")
      .attr("class", "line")
      .attr("d", (d) => {
        return myLine(d);
      })
      .attr("fill", "none")
      .attr("stroke", "blue");
  }, [data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default App;
