var drawGraph = function(){

	//number of icons to color in to visualize percent
	var percentNumber = 92;

	//variables for the font family, and some colors
	var fontFamily = "helvetica";
	var twitterFill = "#4D908E";
	var twitterFillActive = "#adf7b6";
	var svgBackgroundColor = '#264653';

	const width = "700";
	const height = "700";

	//create an svg with width and height
	var svg = d3.select('.graph')
		.append('svg')
		.attr("width", width)
		.attr("height", height)
    	.style('background-color', svgBackgroundColor);


    var twitter = svg.append("defs") //figure out what a 'def' is and how it should be used
		.append("g")//somehow i have to link my data here I think (equivalently)
		.attr("id","hunger_icon");


    twitter.append("path")
        .attr("d","m 320.15748,13.30189 c -23.81068,0 -43.02535,19.428795 -43.02535,43.239411 0,23.810617 19.21467,43.025012 43.02535,43.025012 23.81076,6.85e-4 43.23941,-19.214395 43.23941,-43.025012 0,-23.810616 -19.42865,-43.239411 -43.23941,-43.239411 z m -67.21374,110.23875 c -22.3166,0 -40.02856,17.08068 -40.02856,38.10274 l 0,174.4557 c 0,26.66835 38.53017,26.66835 38.53017,0 l 0,-137.85238 13.69961,0 0,393.00771 c 0,12.02827 10.77783,22.04748 23.54622,22.04748 12.76824,0 22.47593,-10.02058 22.47593,-22.04748 l 0,-216.41077 17.98074,0 0,216.41077 c 0,12.0269 9.92175,22.04748 22.68999,22.04748 12.76832,0 23.54622,-10.01921 23.54622,-22.04748 l 0,-393.00771 13.48556,0 0,137.85238 c 0,26.66835 38.53016,26.66835 38.53016,0 l 0,-174.4557 c 0,-21.02206 -17.71196,-38.10274 -40.02856,-38.10274 l -134.42748,0 z")



    var numRows = 10;
	var numCols = 10;

	//x and y axis scales
	var y = d3.scaleBand()
		.range([0,400])
		.domain(d3.range(numRows));

	var x = d3.scaleBand()
		.range([0, 250])
		.domain(d3.range(numCols));

	//the data is just an array of numbers for each cell in the grid
	data = d3.range(numCols*numRows);

	//container to hold the grid
	var container = svg.append("g")
		.attr("transform", "translate(120,10)");


    var percentNumber = 70;

    var not_hungry = "#4D908E";
    var hungry = "#adf7b6";
    
    container.selectAll("use")
        .data(data)
        .enter().append("use")
        .attr('id','use_blocks')
        .attr("xlink:href", "#hunger_icon")
        .attr("id", function(d){return "id"+d;})
        .attr('x', function(d){return x(d%numCols);})
        .attr('y', function(d){return y(Math.floor(d/numCols));})
        .attr('fill', function(d){return d < percentNumber ? twitterFillActive : twitterFill;})
        .style('stroke', '#adf7b6');


    d3.selectAll("#hunger_icon")
        .attr("transform","scale(0.05)")
        .attr("stroke","red")
    
    var test = container.append('text').text("this is information about hungry people")
                    .attr('id','text_info')
                    .attr("font-size","15px")
                    .attr('x',50)
                    .attr('y',50)
                    .style('fill','white')


        



}
drawGraph()