
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = $(".chart").width() - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;  //a time format of d3//

var x = d3.time.scale()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
  .tickFormat(function(d) {
    	return d.toFixed(1) + "%";
     }); 

var line = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.unemployment_rate); });

var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("js/data.json", function(error, data) {
	console.log(data);

  data.forEach(function(d) {
    d.date = parseDate(d.date);
    d.unemployment_rate = +d.unemployment_rate;   //turing our string version of time into a formate that d3 can read//
  });

  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain(d3.extent(data, function(d) { return d.unemployment_rate; })); //time dates and space//
  //([0,20])
  

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Unemployment Rate (%)");

  svg.append("path")
      .datum(data)
      .attr("class", "line")
      .attr("d", line);

  svg.selectAll(".dot")
  .data(data)
  .enter()
  .append("circle")
  .attr("cx", function(d){
  	return x(d.date);
  })

.attr("cy", function(d){
  	return y(d.unemployment_rate);
  })

.attr("r", 5)
.on("mouseover",function(d){
	var dispDate = moment(d.date).format("MMM.D, YYYY");
	$(".tt").html(
"<div class='date'>"+dispDate+"</div>"+
"<div class='val'>"+d.unemployment_rate+"</div>"

		);
	$(".tt").show();
})
.on("mouseout", function(d){
	$(".tt").hide();
})

.on("mousemove", function(d){
	var pos = d3.mouse(this);

	var left = pos[0] + margin.left+ 15 - $(".tt").width() -10;
	var top = pos[1] + margin.top - $(".tt").height() - 10;

$(".tt").css({
	"left" : left + "px",  
	"top" : top + "px"
})

})


});





