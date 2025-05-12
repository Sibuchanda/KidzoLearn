import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import * as topojson from "topojson-client";

const stateColors = {
  Maharashtra: "#f9c74f",
  Gujarat: "#90be6d",
  Rajasthan: "#f9844a",
  Karnataka: "#43aa8b",
  TamilNadu: "#577590",
  MadhyaPradesh: "#f94144",
  WestBengal: "#b983ff",
  Kerala: "#ff6b6b",
  Bihar: "#6a4c93",
  Odisha: "#ffb703",
  // Add more based on available `d.properties.name`
};

const StatesOfIndia = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 1000;
    const height = 800;

    const projection = d3.geoMercator()
      .center([78.9629, 23.5937])
      .scale(1200)
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    fetch("/india.topo.json")
      .then((res) => res.json())
      .then((indiaData) => {
        const states = topojson.feature(indiaData, indiaData.objects.india).features;

        svg
          .attr("width", width)
          .attr("height", height)
          .style("background", "#f0f8ff")
          .style("position", "relative");

        // Tooltip container
        const tooltip = d3
          .select("#tooltip")
          .style("position", "absolute")
          .style("visibility", "hidden")
          .style("background", "#fff")
          .style("padding", "8px 12px")
          .style("border-radius", "8px")
          .style("box-shadow", "0 2px 6px rgba(0,0,0,0.2)")
          .style("font-size", "16px")
          .style("color", "#222")
          .style("pointer-events", "none");

        svg.selectAll("path")
          .data(states)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("fill", (d) => stateColors[d.properties.name] || "#ccc")
          .attr("stroke", "#555")
          .attr("stroke-width", 0.5)
          .on("mousemove", function (event, d) {
            tooltip
              .style("top", `${event.clientY + 10}px`)
              .style("left", `${event.clientX + 10}px`)
              .html(`<strong>${d.properties.name}</strong>`)
              .style("visibility", "visible");
            d3.select(this).attr("fill", "orange");
          })
          .on("mouseleave", function (event, d) {
            tooltip.style("visibility", "hidden");
            d3.select(this).attr("fill", stateColors[d.properties.name] || "#ccc");
          });
      });
  }, []);

  return (
    <div className="flex justify-center items-center p-4 relative">
      <svg ref={svgRef}></svg>
      <div id="tooltip"></div>
    </div>
  );
};

export default StatesOfIndia;
