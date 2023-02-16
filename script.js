const data = [55000, 48000, 27000, 66000, 90000];
const margin = { top: 20, right: 20, bottom: 50, left: 50 };
const width = 600 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

// create bar chart
const svg = d3.select("#chart")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// create x-axis
const x = d3.scaleBand()
  .domain(data.map((d, i) => i))
  .range([0, width])
  .padding(0.1);

// create y-axis
const y = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([height, 0]);

// add x-axis to chart
svg.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(x));

// add y-axis to chart
svg.append("g")
  .call(d3.axisLeft(y));

// add data to chart
svg.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x", (d, i) => x(i))
  .attr("y", d => y(d))
  .attr("width", x.bandwidth())
  .attr("height", d => height - y(d));
