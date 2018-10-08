var scatter; //renamed svg to scatter and made global so could be used in linking donut chart

d3.json("/load_data", function (data) {

  data = data['users'];

    // Part 1

    // ------ YOUR CODE GOES HERE -------- 

    // Convert experience_yr, hw1_hrs and age into numerical values
    // The following code confirms that these are all numbers from the database
    // console.log(typeof (data[0].experience_yr));
    // console.log(typeof (data[0].hw1_hrs));
    // console.log(typeof (data[0].age));


  scatter = d3.select("#scatter");

      margin = {top: 20, right: 10, bottom: 50, left: 20},
      width = +scatter.attr("width") - margin.left - margin.right,
      height = +scatter.attr("height") - margin.top - margin.bottom,
      g = scatter.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  
  var radius = d3.scaleSqrt()
    .range([2,5]);

    console.log(data);

  // Part 2  

  // ------ YOUR CODE GOES HERE -------- 

  // a. Create xScale and yScale scales

  var xScale;
  var yScale;

  xScale = d3.scaleLinear()
  .domain(d3.extent(data, function(d) { return d.experience_yr; }))
  .range([0, width]);

  yScale = d3.scaleLinear()
  .range([height, 0])
  .domain(d3.extent(data, function(d) { return d.hw1_hrs; }));


  // b. Create axes
  var xAxis;
  var yAxis;
  
  xAxis = d3.axisBottom()
  .scale(xScale);

  yAxis = d3.axisLeft()
  .scale(yScale);

  // c. define xScale and yScale domain() 
  // done in part (a) of creating the scales

  // this is radius domain - use it as a hint! :)
  radius.domain(d3.extent(data, function(d){
    return d.age;
  })).nice();


  // d. call xAxis
  g.append("g")
  .attr("transform", "translate(0, "+height+")")
  .call(xAxis);

  // e. call yAxis
  g.append("g")
  .call(yAxis);

  // f. use variable "bubble" to store cicrles
  var bubble; 

  bubble = g.selectAll("circle")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", function(d) { return xScale(d.experience_yr); })
  .attr("cy", function(d) { return yScale(d.hw1_hrs); })
  .attr("r", function(d) { return radius(d.age); })
  .style("fill", "steelblue");

  // ------ YOUR CODE END HERE -------- 
  

  bubble.attr("transform", "translate(30,15)scale(0.85)");

  g.append('text')
    .attr("transform", "rotate(-90)")
    .attr('x', -90)
    .attr('y', 15)
    .attr('class', 'label')
    .text('Hours spent on HW1');

  g.append('text')
    .attr('x', (width/2) + 60)
    .attr('y', height + 35)
    .attr('text-anchor', 'end')
    .attr('class', 'label')
    .text('Programming experience');

});

