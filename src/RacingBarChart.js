import React, { useRef, useEffect } from "react";
import useResizeObserver from "./useResizeObserver";
import { select, scaleBand, scaleLinear, max } from "d3";

function RacingBarChart({ data }) {
  const wrapperRef = useRef();
  const svgRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  useEffect(() => {
    const svg = select(svgRef.current);
    if (!dimensions) return;
    data.sort((a, b) => b.value - a.value);
    const yScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, dimensions.height])
      .paddingInner(0.1);
    const xScale = scaleLinear()
      .domain([0, max(data, (entry) => entry.value)])
      .range([0, dimensions.width]);
    svg
      .selectAll(".bar")
      .data(data, (entry, index) => entry.name)
      .join((enter) =>
        enter.append("rect").attr("y", (entry, index) => yScale(index))
      )
      .attr("class", "bar")
      .attr("fill", (entry) => entry.color)
      .attr("x", 0)
      .attr("height", yScale.bandwidth())
      .transition()
      .attr("width", (entry) => xScale(entry.value))
      .attr("y", (entry, index) => yScale(index));
    svg
      .selectAll(".label")
      .data(data, (entry, index) => entry.name)
      .join((enter) =>
        enter.append("text").attr("y", (entry, index) => yScale(index))
      )
      .text((entry) => `🦓 ${entry.name} ${entry.value}`)
      .attr("class", "label")
      .transition()
      .attr("y", (entry, index) => yScale(index) + yScale.bandwidth() / 2 + 5);
  }, [data, dimensions]);
  return (
    <div ref={wrapperRef}>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default RacingBarChart;
