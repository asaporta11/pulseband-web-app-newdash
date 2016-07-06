var svgWidth = parseInt($('#bar-chart').css('width'));
var svgHeight = 460;
var sliderHeight = 33;
var sliderWidth = 718;

// var svgWidth = parseInt($('#bar-chart').css('width'));
// var svgHeight = 420;
// var sliderHeight = 23;

var svg = d3.select('svg')
    .attr('width', '100%')
    .attr('height', svgHeight);
// var svg = d3.select('#bar-chart').append('svg')
//     .attr('width', '100%')
//     .attr('height', svgHeight);
var svgSlide = d3.select('#slider').append('svg')
    .attr('width', sliderWidth)
    .attr('height', sliderHeight)
    .chart('slider')
    .width(sliderWidth) //chart width
    .height(sliderHeight); //chart height

var xAxis = svg.append('g');
var xScale = d3.scale.ordinal();
var maxAxis = svg.append('g');

////////////////////////////////////////////////////////////////////////////////////////////////////////////

xScale.domain(dataset.map(function(d) {
    return d.name;
}))
    .rangeBands([margins.left, (svgWidth - margins.right)], 0.1, 0); //padding is .1 and outer padding is 0 

xAxis.attr('class', 'axis')
    .attr('transform', 'translate(0,' + (svgHeight - margins.bottom) + ')')
    .call(d3.svg.axis()
        .scale(xScale)
        .orient('bottom'));

////////////////////////////////////////////////////////////////////////////////////////////////////////////
var charts = [];
//draws each bar for each item in the dataset
for (i = 0; i < dataset.length; i++) {
    var chart = svg.append("g")
        .classed("rect" + i, true)
        .classed("rect", true)
        .attr("transform", "translate(" + xScale(dataset[i].name) + ", 0)")
        .attr("data-rect", i)
        .chart("rectGraph")
        .width(xScale.rangeBand())
        .height(svgHeight);
    charts.push(chart);
    charts[i].on('drag', events.drawGraph);
    chart.draw([dataset[i]]);
}
svgSlide.draw([events.getRiskValue()]);


var yScaleArray = []; //Make an array of yScale, given each respective datapoint's max value (to be used for scaling nValue below)

function initYscales() {
    for (var i = 0; i < dataset.length; i++) {
        var yScale = d3.scale.linear();
        yScale.domain([0, dataset[i].max])
            .range([svgHeight - margins.bottom, margins.top]);
        yScaleArray.push(yScale);
    }
}
initYscales();

// adjust the text
function update(nValue, index) {
    dataset[index].val = nValue;
    charts[index].draw([dataset[index]]);
}

//max axis at top 
var max_xScale = d3.scale.ordinal()
    .domain(dataset.map(function(d) {
        return 'max: ' + d.max;
    }))
    .rangeBands([margins.left, (svgWidth - margins.right)], 0.1);

maxAxis.attr('class', 'axis')
    .attr('transform', 'translate(0,' + (margins.top - 10) + ')')
    .call(d3.svg.axis()
        .scale(max_xScale)
        .orient('top'));

// Make input fields
var inputMargin = svgWidth * 0.1 / (dataset.length - 1);

var inputContainer = d3.select('#input-field');
inputContainer.selectAll('input')
    .data(dataset)
    .enter()
    .append('input')
    .classed('field', true)
    .attr({
        'id': function(d) {
            return d.name.replace(/\s/g, '');
        },
        'type': 'number',
        'min': 0,
        'max': function(d) {
            return d.max;
        },
        'step': function(d) {
            return d.step;
        },
        'value': function(d) {
            return d.val;
        },
    })
    .style({
        'width': xScale.rangeBand() * 0.8 - 2 + 'px',
        'margin-top': '10px',
        'margin-bottom': '40px',
        'margin-right': inputMargin * 2 + 'px'   
    }) //sets width of input
.on('input', function(d, i) {
    update(this.value, i); //updates field value
    events.sliderValueChange(); //updates risk slider
});

//Position input fields 
d3.select('#input-field')
    .style('margin-left', xScale(dataset[0].name) + 'px');

