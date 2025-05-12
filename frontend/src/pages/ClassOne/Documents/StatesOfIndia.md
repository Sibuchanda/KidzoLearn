
# States of India Map (React + D3 + TopoJSON)

## Used Files

- `StatesOfIndia.jsx`: Main React component
- `india.topo.json`: TopoJSON file containing map boundaries for Indian states (`/public` folder)
- Tooltip: A simple floating `<div>` element that shows state names when we hover

---

## What the Map Does

- Renders an SVG map of India  
- Colors each state with a fixed color  
- Shows state name as a tooltip when hovered  
- Tooltip follows the mouse cursor

---

## How It Works

### 1. **Setup the SVG**
We use `d3.select()` to create an SVG and clear any existing content.

```js
const svg = d3.select(svgRef.current);
svg.selectAll("*").remove();
```

### 2. **Set the Projection**
We use `geoMercator` projection centered on India with scale and translate for positioning.

```js
const projection = d3.geoMercator()
  .center([78.9629, 23.5937])
  .scale(1200)
  .translate([width / 2, height / 2]);
```

### 3. **Draw States Using TopoJSON**
We fetch the TopoJSON data, convert it to GeoJSON with `topojson.feature()`, then draw each state using D3’s path generator.

```js
const states = topojson.feature(indiaData, indiaData.objects.india).features;

svg.selectAll("path")
  .data(states)
  .enter()
  .append("path")
  .attr("d", path)
  .attr("fill", d => stateColors[d.properties.name] || "#ccc")
```

### 4. **Tooltip on Hover**
When the user hovers over a state:
- Change color to orange
- Show tooltip near cursor

```js
.on("mousemove", (event, d) => {
  tooltip
    .style("top", `${event.clientY + 10}px`)
    .style("left", `${event.clientX + 10}px`)
    .html(`<strong>${d.properties.name}</strong>`)
    .style("visibility", "visible");
})
.on("mouseleave", (event, d) => {
  tooltip.style("visibility", "hidden");
})
```

---

## State Color Logic

We define a `stateColors` object with fixed colors for each state. This keeps the map consistent on every page load.

```js
const stateColors = {
  Maharashtra: "#f9c74f",
  Gujarat: "#90be6d",
  etc...
};
```


## Where to Put Files

- `StatesOfIndia.jsx` → In your components folder (e.g., `src/components`)
- `india.topo.json` → In the `public/` folder so it can be fetched with `fetch("/india.topo.json")`

---

