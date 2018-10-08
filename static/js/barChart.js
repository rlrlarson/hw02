var data, txt, svg, x, y, bins, bar;
var formatCount = d3.format(",.0f");

d3.json("/load_data", function (error, json_data) {

//I added a lot of ; into the end of the code
  if(!error){
     data = json_data['users'];
     map = data.map(function(d,i){ return parseFloat(d.age); });
     createVis();
  }

  else{
    console.log("Data not loaded!!!");
  }

});

function createVis(){
   
    // visualize the total number of users
    // use txt variable defined above
   
    txt = d3.select("#total_users_text")
      .append("text");

    // Part 1  

    // ------ YOUR CODE GOES HERE -------- 

    // into .text attribute pass the lenghts of the data

    txt.text(data.length);


    txt  
      .style("text-anchor", "start")
      .style("font-size", "30px")
      .style("font-style", "italic")
      .attr("fill", "#888")
      .attr("y", 440)
      .attr("x", 10);

    svg = d3.select("#barChart")
        margin = {top: 20, right: 45, bottom: 45, left: 0},
        width = +svg.attr("width") - margin.left - margin.right,
        height = +svg.attr("height") - margin.top - margin.bottom,
        g = svg.append("g")
               .attr("transform",
                     "translate(" + margin.left + "," + margin.top + ")");

    // Part 2  

    // ------ YOUR CODE GOES HERE -------- 

    console.log(map);

    // a. Create x and y scale
    x = d3.scaleLinear()
    .domain([d3.min(map),d3.max(map)])
    .rangeRound([0, width]);

    bins = d3.histogram()
    .domain(x.domain())
    .thresholds(x.ticks(11))
    (map);

    y = d3.scaleLinear()
    .domain([0, d3.max(bins, function(d) { return d.length; })]) // get the max height of histogram
    .range([height, 0]);

    // b. Create bins and histogram
    // done in part a
    console.log(bins);

    // c. Create bars (rect)
    bar = g.selectAll(".bar")
    .data(bins)
    .enter()
    .append("g")
      .attr("class", "bar")
      .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; });

    console.log(x(bins[1].x1) - x(bins[1].x0) - 1);

    bar.append("rect")
  //  .attr("x", 1)
    .attr("width", (x(bins[1].x1) - x(bins[1].x0)))
    .attr("height", function(d) { return height - y(d.length); })
    .attr("fill", "#9b0a0a");

    // d. Create bar labels

    bar.append("text")
    .attr("x", (x(bins[1].x1) - x(bins[1].x0)) / 2)
    .attr("y", -4)
    .attr("text-anchor", "middle")
    .text(function(d) { return formatCount(d.length); });

    // e. Call Axes
    g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

    // f. Create Axes label

}

