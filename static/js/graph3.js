

var width = "700px"
var height = "700px"
var svgBackgroundColor = '#264653';

var svg = d3.select('.graph')
	.append('svg')
	.attr("width", width)
	.attr("height", height)
	.style('background-color', svgBackgroundColor);

var container = svg.append("g")
	.attr("transform", "translate(120,10)");

var numRows = 10;
var numCols = 10;
var data = d3.range(numCols*numRows);	

container.selectAll("use")
	.data(data)
	.enter().append("use")

var hunger_icon = svg.append("defs") //figure out what a 'def' is and how it should be used
	.append("g")//somehow i have to link my data here I think (equivalently)
	.attr("id","hunger_icon");


hunger_icon.append("path")
	.attr("d","m 320.15748,13.30189 c -23.81068,0 -43.02535,19.428795 -43.02535,43.239411 0,23.810617 19.21467,43.025012 43.02535,43.025012 23.81076,6.85e-4 43.23941,-19.214395 43.23941,-43.025012 0,-23.810616 -19.42865,-43.239411 -43.23941,-43.239411 z m -67.21374,110.23875 c -22.3166,0 -40.02856,17.08068 -40.02856,38.10274 l 0,174.4557 c 0,26.66835 38.53017,26.66835 38.53017,0 l 0,-137.85238 13.69961,0 0,393.00771 c 0,12.02827 10.77783,22.04748 23.54622,22.04748 12.76824,0 22.47593,-10.02058 22.47593,-22.04748 l 0,-216.41077 17.98074,0 0,216.41077 c 0,12.0269 9.92175,22.04748 22.68999,22.04748 12.76832,0 23.54622,-10.01921 23.54622,-22.04748 l 0,-393.00771 13.48556,0 0,137.85238 c 0,26.66835 38.53016,26.66835 38.53016,0 l 0,-174.4557 c 0,-21.02206 -17.71196,-38.10274 -40.02856,-38.10274 l -134.42748,0 z")
	.style("stroke","#264653")

//var not_hungry = "#4D908E";
//var hungry = "#adf7b6";

//variables for the font family, and some colors
var fontFamily = "helvetica";
var twitterFill = '#264653'//"#4D908E";
var twitterFillActive = "#adf7b6";


var drawGraph = function(){

	var dropMenu = d3.select("#selDataset")

    d3.json("../static/data/dummy_data.json").then((data) => {
        console.log(data)
		
		var metadata = data.metadata
		var locations = d3.values(data.states)

		console.log(locations)
        locations.forEach((place) => {
            dropMenu
            .append("option")
            .text(place)
            .property("value", place);
        });
		var first_state = locations[0]
	
		updateMetadata(first_state)
		updateChart(first_state)
	})



}

function updateChart(selection) {
	d3.json("../static/data/dummy_data.json").then(d => {


		//x and y axis scales
		var y = d3.scaleBand()
			.range([0,400])
			.domain(d3.range(numRows));
	
		var x = d3.scaleBand()
			.range([0, 250])
			.domain(d3.range(numCols));

		//the data is just an array of numbers for each cell in the grid


		var metadata = d.metadata

		console.log(selection)

		var filtered_data = metadata.filter(obj => obj.state === selection)
		var percentNumber = filtered_data[0].hunger * 100
		console.log("percent number",percentNumber)

		container.selectAll("use")
			.attr('id','use_blocks')
			.attr("xlink:href", "#hunger_icon")
			.attr("id", function(d){return "id"+d;})
			.attr('x', function(d){return x(d%numCols);})
			.attr('y', function(d){return y(Math.floor(d/numCols));})
			.attr('fill', function(d){return d < percentNumber ? twitterFillActive : twitterFill;})
			.style('stroke', '#adf7b6');

		d3.selectAll("#hunger_icon")
			.attr("transform","scale(0.05)")



	})

}

function updateMetadata(selection) {
	d3.json("../static/data/dummy_data.json").then((data) => {
        var metadata = data.metadata
		var filtered_data = metadata.filter(obj => obj.state === selection)
		console.log(filtered_data[0].hunger)
		var percentNumber = filtered_data[0].hunger
	})
}

function optionChanged(dropSel){
	updateChart(dropSel)
	updateMetadata(dropSel)
}

drawGraph()