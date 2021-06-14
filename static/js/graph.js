// git file for interactive d3 graph

var drawgraph = function(){
    
    var svg = d3.select('.graph').append('svg')

    var w = "500"
    var h = "500"

    svg.attr("width", w).attr("height",h).attr('background-color','#264653')

    var cols = 10
    var rows = 10

    var placemarkers = d3.range(cols*rows)

    var yscale = d3.scaleBand()
                .range([0,250])
                .domain(d3.range(rows))

    var xscale = d3.scaleBand()
                .range([0,250])
                .domain(d3.range(cols))

    var container = svg.append("g")
                .attr("transform","translate(120,120)")


    d3.xml("../images/Stickman.svg").then(data => {
    var icons = svg.append("defs")
            .append("g")
            .attr("id","hungerIcon")
    })

    var percentNumber = 85;

    var not_hungry = "#4D908E";
    var hungry = "#adf7b6";

    container.selectAll("use")
        .data(placemarkers)
        .enter().append("use")
        .attr("id", function(d) {return "id"+d})
        .attr("id", function(d){ return "id"+d})
        .attr("x", function(d){ return xscale(d%cols)})
        .attr("y", function(d){ return yscale(Math.floor(d/cols))})
        .attr('fill', function(d){ return d < percentNumber ? not_hungry : hungry})
        .style('stroke', 'black')
}

drawgraph();