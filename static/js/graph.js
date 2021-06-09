// git file for interactive d3 graph

var svg = d3.select('.graph').append('svg')

svg.attr("width", "700px").attr("height","800px")

var line = 0
var xpos = 0
var ypos = 0


xpos = i%linelength
ypos = i/linelength - 1

j = 0
x = 0

for(i = 0; i < 808; i++) {
    console.log("j = ", j)
    x = i * 30
    svg.append('image')
        .attr('xlink:href', "../images/Stickman.svg")
        .attr('height', 50)
        .attr('width', 19)
        .attr('class','hungry')
        .attr("x", xpos)
        .attr("y", ypos)

    if(((i+1) * 30) > (700 * (j+1))){
        console.log("greater than 700")
        x = i * 30
        j = j+1
    }
}
console.log(j)