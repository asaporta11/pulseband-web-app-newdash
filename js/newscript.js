var svgWidth = parseInt($('#bar-chart').css('width'));
var svgHeight = 420;

var svg = d3.select('#bar-chart').append('svg')
    .attr('width', '100%')
    .attr('height', svgHeight);

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

d3.chart("rectGraph", {
    initialize: function() {
        var chart = this;
        chart.yScale = d3.scale.linear();

        // Initialize tooltip
        var tip = d3.tip().html(function(d) {
            //console.log(chart.yScale(d3.mouse(this)[1]));
            return d.val + " " + d.unit;
        });

        //tooltip
        svg.call(tip)

        // create a layer of circles that will go into
        // a new group element on the base of the chart
        chart.layer("rectGroup", this.base, {

            // select the elements we wish to bind to and
            // bind the data to them.
            dataBind: function(data) {
                return this.selectAll('g.rect').data(data);
            },

            // insert actual bars
            insert: function() {
                var group = this.append('g')
                    .classed('containBar', true);
                group.append('rect');
                group.append('line');
                return this;    
            },

            // define lifecycle events
            events: {
                // paint new elements
                "merge": function() {

                    //for draggable beh
                    var drag = d3.behavior.drag()
                        .origin(function(d) {
                            return d.val;
                        })
                        .on("drag", function(d) {
                            var group = d3.select(this); //can't do this.select because in this context (drag function), you're selecting a node in the dom 
                            group.select('rect')
                                .attr("y", function() {
                                    var yValue = chart.yScale.invert(d3.mouse(this)[1]);
                                    events.updateInputValues(this, yValue);
                                    return d3.mouse(this)[1];
                                })
                                .attr("height", (svgHeight - margins.bottom - d3.mouse(this)[1]));
                            group.select('line')
                                .attr("y1", function() {
                                    return d3.mouse(this)[1] + 7;
                                })
                                .attr("y2", function() {
                                    return d3.mouse(this)[1] + 7;
                                });
                        });

                    this.select('rect')
                        .attr("x", 0) //x pos set to 0 for each chart
                        .attr("width", chart._width)
                        .attr("y", chart._height - margins.bottom) //set y value to 0 on axis
                        .attr("height", 0); //set height to 0 (state before transition)

                    this.select('rect')
                        .transition() //initiates transition for rects
                        .delay(function(data, i) {
                            return i * 20;
                        })
                        .duration(2000)
                        .ease("elastic")
                        .attr("y", function(d) {
                            return chart.yScale(d.val); //specifies y value to transition to
                        })
                        .attr("height", function(d) {
                            return chart._height - margins.bottom - chart.yScale(d.val); //specifies height value to transition to 
                        });


                    //draws line on bar    
                    this.select("line")
                        .attr("x1", 20)
                        .attr("y1", svgHeight - margins.bottom)
                        .attr("x2", 80)
                        .attr("y2", svgHeight - margins.bottom)
                        .transition()
                        .delay(function(d, i) {
                            return i * 20;
                        })
                        .duration(2000)
                        .ease("elastic")
                        .attr("x1", 20)
                        .attr("y1", function() {
                            return chart.yScale(dataset[i].val) + 7;
                        })
                        .attr("x2", 80)
                        .attr("y2", function() {
                            return chart.yScale(dataset[i].val) + 7;
                        })
                        .attr("stroke", "black")
                        .attr("stroke-width", 1);

                    //Calls drag event and tooltip   
                    this.call(drag);
                    this.on('mouseover', tip.show).on('mouseout', tip.hide);
                    return this;
                }
            }
        });
    },

    transform: function(data) {
        chart.yScale.domain([0, data[0].max])
            .range([chart._height - margins.bottom, margins.top]);
        return data;
    },
    width: function(newWidth) {
        if (arguments.length === 0) return this._width;
        this._width = newWidth;
        return this;
    },
    height: function(newHeight) {
        if (arguments.length === 0) return this._height;
        this._height = newHeight;
        return this;
    }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
    chart.draw([dataset[i]]);
}

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
        update(this.value, i);
    });
    d3.select(id).property("value", dataset[i].val); //initially updates value in input field upon page load
});

// adjust the text
function update(nValue, index) {
    var node = $(".rect" + index).find("rect")[0];
    d3.select((".rect" + index)).select("g").select("rect")
        .transition()
        .delay(function(data, i) {
            return i * 20;
        })
        .duration(1500)
        .ease("elastic")
        .attr("height", svgHeight - margins.bottom - yScaleArray[index](nValue))
        .attr("y", function() {
            return yScaleArray[index](nValue);
        });

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

//  % Risk Slider
var slider = d3.slider().on("slide", function(evt, value) {
    d3.select('#slider4text').text(value);
})
d3.select('#slider')
    .call(slider);


