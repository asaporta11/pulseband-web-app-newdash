

var width = parseInt($('#bar-chart').css('width'));
var height = parseInt($('#bar-chart').css('height'));
var barPadding = 1;
var margins = {
    left: 100,
    right: 100,
    top: 100,
    bottom: 100
};


var dataset = [
    {val: 100, name: "Blood Pressure"},
    {val: 40, name: "Heart Rate"},
    {val: 45, name: "Age"},
    {val: 70, name: "Activity"},
    {val: 50, name: "Cholesterol"},
    {val: 60, name: "Blood Sugars"},
    {val: 40, name: "History"}];

var dataValues = dataset.map(function(d){
    return d.val;
});

//Create SVG element and add to the DOM
var svg = d3.select("#bar-chart").append("svg")
            .attr("width", width - (margins.left + margins.right))
            .attr("height", height - (margins.top + margins.bottom));

var xScale = d3.scale.ordinal()
    .domain(dataset.map(function(d){
        return d.name;
    }))
    .rangeBands([margins.left, width - margins.right], 0.1)

var yScale = d3.scale.linear()
    .domain([0, d3.max(dataValues)])
    .range([height - margins.bottom, margins.top]) 

// Initialize tooltip
var tip = d3.tip().html(function(d) { return d.val + "% Risk"; });

//tooltip
svg.call(tip)

var rects = svg.selectAll("rect") 
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", function(d){
        return xScale(d.name);
    })
    .attr("width", xScale.rangeBand())
    .attr("y", height - margins.bottom) //set y value to 0 on axis
    .attr("height", 0); //set height to 0 


rects.transition() //initiates transition
    .attr("y", function(d){
        return yScale(d.val); //specifies y value to transition to
    })
    .attr("height",function(d){
        return height - margins.bottom - yScale(d.val); //specifies height value to transition to 
    })//move to after transition because final height

 rects.on('mouseover', tip.show)
    .on('mouseout', tip.hide);


svg.append("g")
    .attr("class","axis")
    .attr("transform", "translate(0," + (height - margins.top) + ")")
    .call(d3.svg.axis()
                .scale(xScale)
                .orient("bottom"))


svg.append("g")
    .attr("class", "axis")
    .attr("transform", "translate(" + margins.left + ",0)")
    .call(d3.svg.axis()
                .scale(yScale)
                .orient("left"))
















//          OLD
//          BAR graph from this site http://vegibit.com/create-a-bar-chart-with-d3-javascript/

// var chartdata = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120,
//     135, 150, 165, 180, 200, 220, 240, 270, 300, 330, 370, 410]; 

// var margin = {top: 30, right: 10, bottom: 30, left: 50}

// var height = 400 - margin.top - margin.bottom, //height minus t and b margins
//     width = 720 - margin.left - margin.right, //width minus l and r margins
//     barWidth = 40, 
//     barOffset = 20;

// var dynamicColor;
 
// var yScale = d3.scale.linear()              //define y axis
//     .domain([0, d3.max(chartdata)])         //make the domain the height of the highest value of the dataset 
//     .range([0, height])                     //make the range the height of the graph area
 
// var xScale = d3.scale.ordinal()             //define x axis on an ordinal scale 
//     .domain(d3.range(0, chartdata.length))  //make the domain the width of the chart dataset
//     .rangeBands([0, width])                 //make the rangeBands(interval, padding)

// var colors = d3.scale.linear()              //define specific colors for graphs
//     .domain([0, chartdata.length * .33, chartdata.length * .66, chartdata.length])
//     .range(['#d6e9c6', '#bce8f1', '#faebcc', '#ebccd1'])

// var awesome = d3.select('#bar-chart').append('svg')         //define 'awesome' append an svg to the bar chart div
//     .attr('width', width + margin.left + margin.right)      //720 px 
//     .attr('height', height + margin.top + margin.bottom)    //400px
//     .style('background', '#bce8f1')                         //set background color
//     .append('g')
//     .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')    //move the graph down
//     .selectAll('rect').data(chartdata)                      //assign a data value to each rectangle
//     .enter().append('rect')                                 //now make the rectangles for every data value
//     .style({                                                
//         'fill': function (data, i) {                        //for data, i 
//             return colors(i);                               //return colors by index value
//         }, 'stroke': '#31708f', 'stroke-width': '2'         //make stroke 
//     })
//     .attr('width', xScale.rangeBand())                      //feed x axis as def for width
//     .attr('x', function (data, i) {                         
//         return xScale(i);                                   //AA - how does this work with "width" above? Just saying go through xScale    
//     })
//     .attr('height', 0)                                      //AA - huh? height is 0? Or (height,0)?
//     .attr('y', height)                                      //Assign height to y?
//     .on('mouseover', function (data) {                      //On mouseover, change color        
//         dynamicColor = this.style.fill;                     //define dynamicColor variable
//         d3.select(this)
//             .style('fill', '#3c763d')                       //fill svg with this color
//     })
//      .on('mouseout', function (data) {                      //On mouseout, fill back to the way it was
//         d3.select(this)
//             .style('fill', dynamicColor)
//     })

// awesome.transition()                         //make a transition for var awesome (bar graph stored in a variable (not executed yet))               
//     .attr('height', function (data) {        //make the height based off yScale   
//         return yScale(data);
//     })
//     .attr('y', function (data) {             //make y height - AA - why minus yscale data? doesn't that make it really small?
//         return height - yScale(data);
//     })
//     .delay(function (data, i) {             //delay each rect's appearance by 20ms
//         return i * 20;
//     })
//     .duration(2000)                         //takes 2 secs to appear
//     .ease('elastic')                        //use elastic as the way it goes in

// var verticalGuideScale = d3.scale.linear()  //define this var the height of the max value in the chart data
//     .domain([0, d3.max(chartdata)])
//     .range([height, 0])

// var vAxis = d3.svg.axis()                   //define x axis 
//     .scale(verticalGuideScale)              //set the scale to be the height of above
//     .orient('left')                         //put it on the left
//     .ticks(10)                              //give it a suggestion of 10 ticks

// var verticalGuide = d3.select('svg').append('g')
// vAxis(verticalGuide)
// verticalGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
// verticalGuide.selectAll('path')
//     .style({fill: 'none', stroke: "#3c763d"})
// verticalGuide.selectAll('line')
//     .style({stroke: "#3c763d"})

// var hAxis = d3.svg.axis()
//     .scale(xScale)
//     .orient('bottom')
//     .ticks(chartdata.size)

// var horizontalGuide = d3.select('svg').append('g')
// hAxis(horizontalGuide)
// horizontalGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) + ')')
// horizontalGuide.selectAll('path')
//     .style({fill: 'none', stroke: "#3c763d"})
// horizontalGuide.selectAll('line')
//     .style({stroke: "#3c763d"});

// //OLD STUFF

// var HEIGHT = parseInt($('.graph-area').css('height')); //get height of the graph-area div
// var WIDTH = parseInt($('.graph-area').css('width'));
// var MARGINS = {
//   left: 100, 
//   right: 100, 
//   top: 100, 
//   bottom: 100
// }

// var dataBP = [
//   {x: 0, y: 52},
//   {x: 1, y: 53},
//   {x: 2, y: 53},
//   {x: 3, y: 50},
//   {x: 4, y: 55},
//   {x: 5, y: 62},
//   {x: 6, y: 70},
//   {x: 7, y: 143},
//   {x: 8, y: 78},
//   {x: 9, y: 75},
//   {x: 10, y: 75},
//   {x: 11, y: 70},
//   {x: 12, y: 70},
//   {x: 13, y: 66},
//   {x: 14, y: 90},
//   {x: 15, y: 77},
//   {x: 16, y: 70},
//   {x: 17, y: 64},
//   {x: 18, y: 73},
//   {x: 19, y: 101},
//   {x: 20, y: 70},
//   {x: 21, y: 63},
//   {x: 22, y: 60},
//   {x: 23, y: 58},
//   {x: 24, y: 54},
// ];

// var xScale = d3.scale.linear()
//  .range([MARGINS.left, WIDTH - MARGINS.right])
//  .domain([0, 24]); //make the x scale and tick points
 
// var yScale = d3.scale.linear()
//  .range([HEIGHT - MARGINS.top, MARGINS.bottom])
//  .domain([40, 180]); //make y scale and tick points

// var line = d3.svg.line()
//  .x(function(d){return xScale(d.x);})
//  .y(function(d){return yScale(d.y);}); 

// // Graph BP
// d3.select('.graph-area svg').append("g").append('path') 
//  .attr('d', line(dataBP))
//  .attr('stroke', 'red')
//  .attr('stroke-width', 2)
//  .attr('fill', 'none');

// var totalLength = d3.select('.graph-area svg path').node().getTotalLength();

// d3.selectAll('.graph-area svg path')
//    .attr("stroke-dasharray", totalLength + " " + totalLength)
//   .attr("stroke-dashoffset", totalLength)
//   .transition()
//     .duration(2000)
//     .ease("linear")
//     .attr("stroke-dashoffset", 0);


// var xAxis = d3.svg.axis().scale(xScale).orient("bottom"); //orient x axis
// var yAxis = d3.svg.axis().scale(yScale).orient("left"); //orient y axis

// d3.select('.graph-area svg').append('g')
//  .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
//  .attr("class","axis")
//  .call(xAxis);

// d3.select('.graph-area svg').append('g') 
//  .attr("transform", "translate(" + MARGINS.left + ",0)")
//  .attr("class","axis")
//  .call(yAxis);

// //Make Slider
//   var bisectY = d3.bisector(function(d) {return d.x;}).left; //maybe data.x instead of d?
  
//   var svg = d3.select('svg');
  
//   var focus = svg.append("g")
//    .attr("class", "focus")
//    .style("display", "none");


//   focus.append("circle")
//       .attr("r", 4.5);

//   focus.append("text")
//       .attr("x", 9)
//       .attr("dy", ".35em");

//   svg.on("mouseover", function() { focus.style("display", null); })
//      .on("mouseout", function() { focus.style("display", "none"); })
//      .on("mousemove", mousemove);

//   function mousemove() {
//    var data; 
//    var xValue = xScale.invert(d3.mouse(this)[0]);
//    var i = bisectY(dataBP, xValue, 1);
//    var data0 = dataBP[i-1];
//    var data1 = dataBP[i];
//    if (xValue - data0.x > data1.x - xValue){
//      data = data1;
//    } else {
//      data = data0;
//    }
//     focus.attr("transform", "translate(" + xScale(data.x) + "," + yScale(data.y) + ")");
//     focus.select("text").text(data.y);
//    }



// // BAR GRAPH 
// var dataSteps = [10, 10, 10, 10, 10, 4000, 1050, 1000, 300, 400, 500, 370, 420, 800, 500, 20, 200, 10, 100, 50, 300, 200, 10, 0  ]

// var svgBar = d3.select("#graph-area-bar")
//                 .append("svg")
//                 .attr("width", WIDTH)
//                 .attr("height", HEIGHT);

// var barPadding = 1;

// var xScaleBar = d3.scale.linear()
//  .range([MARGINS.left, WIDTH - MARGINS.right])
//  .domain([0, dataSteps.length]); //make the x scale and tick points
 
// var yScaleBar = d3.scale.linear()
//  .range([HEIGHT - MARGINS.top, MARGINS.bottom])
//  .domain([0, d3.max(dataSteps)]); //make y scale and tick points

// // var xAxisBar = d3.svg.axis().scale(xScaleBar).orient("bottom"); //orient x axis
// // var yAxisBar = d3.svg.axis().scale(yScaleBar).orient("left"); //orient y axis

// // d3.select('#graph-area-bar svg').append('g')
// //  .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
// //  .attr("class","axis")
// //  .call(xAxisBar);

// // d3.select('#graph-area-bar svg').append('g') 
// //  .attr("transform", "translate(" + MARGINS.left + ",0)")
// //  .attr("class","axis")
// //  .call(yAxisBar);

// // // var verticalGuideScale = d3.scale.linear()

// // var line = d3.svg.axis()
// //  .x(function(d){return xScaleBar(d.x);})
// //  .y(function(d){return yScaleBar(d.y);})


// // svgBar.selectAll("rect")
// //       .data(dataSteps)
// //       .enter()
// //       .append("rect")
// //       .attr("x", function(d,i){
// //         return i * (WIDTH/dataSteps.length);
// //       })
// //       .attr("y", function(d){
// //         return HEIGHT - d; //height minus data value because origin (0,0) is upper LH corner, so essentially starting drawing the svg from the upper L corner of each bar and drawing down from there (drawing top down)
// //       })
// //       .attr("width", WIDTH/dataSteps.length - barPadding)
// //       .attr("height", function(d){
// //         return d; //giving each bar it's height 
// //       })
// //       .attr("fill", function(d){
// //         return "rgb(0, 0, " + (d*10) + ")"; //makes the graph multicolored by data type
// //       });

// //       // on color: 
// //       //Here, d is multiplied by 10, and then used as the blue value in an rgb() 
// //       //color definition. So the greater values of d (taller bars) will be more 
// //       //blue. Smaller values of d (shorter bars) will be less blue 
// //       //(closer to black). The red and green components of the color are fixed at 
// //       //zero.


// //       // .attr("class", "bar")
// //       // .style("height", function(d){
// //       //   var barHeight = d*5; //make bars tall
// //       //   return barHeight + "px";
// //       // });



// // // var HEIGHT = parseInt($('.graph-area').css("height")); //get the height of the graph div
// // // var WIDTH = parseInt($('.graph-area').css("width")); //get the width of the graph div
// // // var MARGINS = {
// // // 	left: 45,
// // // 	right: 30,
// // // 	top: 30,
// // // 	bottom: 30
// // // };// margins between the graph-area div and the graph itself 

// // // var dataRisk = [
// // //  {x: 0, y: 90},
// // //  {x: 1, y: 87},
// // //  {x: 2, y: 80},
// // //  {x: 3, y: 76},
// // //  {x: 4, y: 71},
// // //  {x: 5, y: 68},
// // //  {x: 6, y: 90},
// // //  {x: 7, y: 10},
// // //  {x: 8, y: 2},
// // //  {x: 9, y: 43},
// // //  {x: 10, y: 84},
// // //  {x: 11, y: 33},
// // //  {x: 12, y: 30}
// // // ]

// // // var dataChol = [
// // //  {x: 0, y: 10},
// // //  {x: 1, y: 27},
// // //  {x: 2, y: 83},
// // //  {x: 3, y: 2},
// // //  {x: 4, y: 50},
// // //  {x: 5, y: 34},
// // //  {x: 6, y: 90},
// // //  {x: 7, y: 10},
// // //  {x: 8, y: 2},
// // //  {x: 9, y: 43},
// // //  {x: 10, y: 84},
// // //  {x: 11, y: 13},
// // //  {x: 12, y: 30}
// // // ]

// // // var dataSug = [
// // //  {x: 0, y: 90},
// // //  {x: 1, y: 92},
// // //  {x: 2, y: 88},
// // //  {x: 3, y: 82},
// // //  {x: 4, y: 83},
// // //  {x: 5, y: 79},
// // //  {x: 6, y: 72},
// // //  {x: 7, y: 75},
// // //  {x: 8, y: 70},
// // //  {x: 9, y: 66},
// // //  {x: 10, y: 68},
// // //  {x: 11, y: 67},
// // //  {x: 12, y: 60}
// // // ]

// // // var xScale = d3.scale.linear()
// // // 	.range([MARGINS.left, WIDTH - MARGINS.right])
// // // 	.domain([0, 12]); //make the x scale and tick points
// // // var yScale = d3.scale.linear()
// // // 	.range([HEIGHT - MARGINS.top, MARGINS.bottom])
// // // 	.domain([0, 100]); //make y scale and tick points

// // // var xAxis = d3.svg.axis().scale(xScale).orient("bottom"); //orient x axis
// // // var yAxis = d3.svg.axis().scale(yScale).orient("left"); //orient y axis

// // // d3.select('.graph-area svg').append('g')
// // // 	.attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
// // // 	.call(xAxis);
// // // d3.select('.graph-area svg').append('g')
// // // 	.attr("transform", "translate(" + MARGINS.left + ",0)")
// // // 	.call(yAxis);

// // // var line = d3.svg.line()
// // // 	.x(function(d){return xScale(d.x);})
// // // 	.y(function(d){return yScale(d.y);})

// // // // Graph Total Risk (Avg)
// // // d3.select('.graph-area svg').append('path')
// // // 	.attr('d', line(dataRisk))
// // // 	.attr('stroke', 'red')
// // // 	.attr('stroke-width', 2)
// // // 	.attr('fill', 'none');

// // // // Graph Cholestorol 
// // // d3.select('.graph-area svg').append('path')
// // // 	.attr('d', line(dataChol))
// // // 	.attr('stroke', 'blue')
// // // 	.attr('stroke-width', 2)
// // // 	.attr('fill', 'none');

// // // // Graph Sugar Intake
// // // d3.select('.graph-area svg').append('path')
// // // 	.attr('d', line(dataSug))
// // // 	.attr('stroke', 'yellow')
// // // 	.attr('stroke-width', 2)
// // // 	.attr('fill', 'none');
// // // 	// .append("svg:title")
// // // 	// .text(function(d){
// // // 	// 	return d.x;
// // // 	// });	

// // // // Make path for slider? 

// // //   var bisectY = d3.bisector(function(d) {return d.x;}).left; //maybe data.x instead of d?
  
// // //   var svg = d3.select('svg');
  
// // //   var focus = svg.append("g")
// // //   	.attr("class", "focus")
// // //   	.style("display", "none");


// // //   focus.append("circle")
// // //       .attr("r", 4.5);

// // //   focus.append("text")
// // //       .attr("x", 9)
// // //       .attr("dy", ".35em");

// // //   svg.on("mouseover", function() { focus.style("display", null); })
// // //      .on("mouseout", function() { focus.style("display", "none"); })
// // //      .on("mousemove", mousemove);

// // //   function mousemove() {
// // //   	var data; 
// // //   	var xValue = xScale.invert(d3.mouse(this)[0]);
// // //   	var i = bisectY(dataRisk, xValue, 1);
// // //   	var data0 = dataRisk[i-1];
// // //   	var data1 = dataRisk[i];
// // //   	if (xValue - data0.x > data1.x - xValue){
// // //   		data = data1;
// // //   	} else {
// // //   		data = data0;
// // //   	}
// // //     focus.attr("transform", "translate(" + xScale(data.x) + "," + yScale(data.y) + ")");
// // //     focus.select("text").text(data.y);
// // //   	}



// // // the code above this works 

// //  // var x0 = x.invert(d3.mouse(this)[0]),
// //     //     i = bisectDate(dataRisk, x0, 1),
// //     //     d0 = dataRisk[i - 1],
// //     //     d1 = dataRisk[i],
// //     //     d = x0 - d0.x > d1.x - x0 ? d1 : d0;

// // // //




// // // // // ****    Slider Counter Try     **** //  //












// // // var x = $('g[transform="translate(0,370)"].tick'); //
// // // // var t = parseInt($(x[0]).attr("transform")); 

// // // $(x[0]).attr("transform"); 

// // // for var(i=0; i<x.length; i++){
// // // 	var t = $(x.[i]).attr("transform");
// // // 	var u = t.slice(10,13); 
// // // 	var v = parseInt(u);
// // // 	$('div[data-index=\"' + i + '\"]').css('left',v);
// // // }

// // // $("graph-area div").mouseenter(function(){
// // // 	var dataX = $(".graph-area div").data();
// // // 	$("graph-area #status").text("Value: "+ dataX);
// // // }); 


// // //// .mouseleave(function(){
// // //// });



// // // var xPos; 
// // // var yPos;
// // // // var xTickPos;

// // // document.querySelectorAll('[data-index]').onmouseover = function(event){
// // // 	// xTickPos = d3.select('svg')....
// // // 	xPos = dataRisk[event.pageX];
// // // 	yPos = dataRisk[event.pageY];

// // // 	document.getElementById('#status').text("yValue: "+ yPos);
// // // };

// // //

// // // document.querySelectorAll('[data-index]').addEventListener("mouseover", myScript)

// // // var linesGroupText = -1;
// // // var lines = -1; 
// // // var hoverContainer, hoverLine, hoverLineXOffset, hoverLineYOffset, hoverLineGroup; 

// // // var handleMouseOutGraph = function(event) {	
// // // 	// hide the hover-line
// // // 	hoverLine.classed("hide", true);
		
// // // 	setValueLabelsToLatest();
		
// // // 	//debug("MouseOut graph [" + containerId + "] => " + mouseX + ", " + mouseY)
		
// // // 	// user is no longer interacting
// // // 	userCurrentlyInteracting = false;
// // // 	currentUserPositionX = -1;
// // // 	}
	
// // // // Append a group to contain all lines
// // // lines = graph.append("svg:g")
// // // 				.attr("class", "lines")
// // // 			.selectAll("path")
// // // 				.data(data.values); // bind the array of arrays

// // // // Continue this reference so the selector doesn't show up every mouse event
// // // hoverContainer = container.querySelector('g .lines');

// // // // When mouse moves 
// // // $(container).mouseleave(function(event) {
// // // 			handleMouseOutGraph(event);
// // // 		})
		
// // // $(container).mousemove(function(event) {
// // // 			handleMouseOverGraph(event);
// // // 		})		
