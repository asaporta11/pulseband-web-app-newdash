var svgWidth = parseInt($('#bar-chart').css('width'));
var svgHeight = 420;
var sliderHeight = 23;

var svg = d3.select('#bar-chart').append('svg')
    .attr('width', '100%')
    .attr('height', svgHeight);
var svgSlide = d3.select('#slider').append('svg')
    .attr('width', 718)
    .attr('height', sliderHeight)
    .chart('slider')
    .width(718)//chart width
    .height(sliderHeight);     //chart height

var xAxis = svg.append('g');
var xScale = d3.scale.ordinal();
var maxAxis = svg.append('g');

////////////////////////////////////////////////////////////////////////////////////////////////////////////

xScale.domain(dataset.map(function(d) {
    return d.name;
}))
    .rangeBands([margins.left, (svgWidth - margins.right)], .1);

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
    charts.push(chart)
    charts[i].on('drag', function(d){
            this.draw([d]);
            events.updateInputValues(d.name, d.val);
        })
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

//sets input values and updates field as user increments up/down
$(".field input").each(function(i) {
    var id = "#" + $(this).attr("id");
    d3.select(id).on("input", function() {
        update(this.value, i);  //updates field value
        events.sliderValueChange(); //updates risk slider
    });
    d3.select(id).property("value", dataset[i].val); //initially sets value in input field upon page load
});

// adjust the text
function update(nValue, index) {
    dataset[index].val = nValue;
    charts[index].draw([dataset[index]]);
}

//max axis at top 
var max_xScale = xScale.domain(dataset.map(function(d) {
        return 'max: ' + d.max;
    }))
    .rangeBands([margins.left, (svgWidth - margins.right)], .1);

maxAxis.attr('class', 'axis')
    .attr('transform', 'translate(0,' + (margins.top - 10) + ')')
    .call(d3.svg.axis()
    .scale(max_xScale)
    .orient('top'));

// //position input fields
// $('.field').each(function(i){
    
// });


// d3.select('.field')
//     .html()
//     .style('left', xScale(0) + 'px')

// for(var i = 0; i < dataset.length; i++){
//     xScale([i])
// }







