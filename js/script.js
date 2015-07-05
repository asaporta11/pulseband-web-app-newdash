var width = parseInt($('#bar-chart').css('width'));
var height = parseInt($('#bar-chart').css('height'));

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
    {val: 40, name: "History"}
];

var dataset2 = [
    {val: 10, name: "Blood Pressure"},
    {val: 50, name: "Heart Rate"},
    {val: 45, name: "Age"},
    {val: 70, name: "Activity"},
    {val: 90, name: "Cholesterol"},
    {val: 60, name: "Blood Sugars"},
    {val: 20, name: "History"}
];


var svg = d3.select("#bar-chart").append("svg")
            .attr("width", width - (margins.left + margins.right))
            .attr("height", height - (margins.top + margins.bottom));


d3.chart("rectGraph", {

  initialize: function() {
    var chart = this; 
    chart.yScale = d3.scale.linear();
    chart.xScale = d3.scale.ordinal(); 
    chart.xAxis = this.base.append("g");
    chart.yAxis = this.base.append("g");
    // Initialize tooltip
    var tip = d3.tip().html(function(d) { return d.val + "% Risk"; });

    //tooltip
    svg.call(tip)

    // create a layer of circles that will go into
    // a new group element on the base of the chart
    chart.layer("rectGroup", this.base.append("g"), {

      // select the elements we wish to bind to and
      // bind the data to them.
      dataBind: function(data) {
        return this.selectAll("rect")
          .data(data);
      },

      // insert actual circles
      insert: function() {
        return this.append("rect");
      },

      // define lifecycle events
        events: {

        // paint new elements, but set their radius to 0
        // and make them red
        "merge": function() {
            
          this.attr("x", function(d){
                return chart.xScale(d.name);
            })
            .attr("width", chart.xScale.rangeBand())
            .attr("y", chart._height - margins.bottom) //set y value to 0 on axis
            .attr("height", 0); //set height to 0 


            this.transition() //initiates transition
                .attr("y", function(d){
                    return chart.yScale(d.val); //specifies y value to transition to
                })
                .attr("height",function(d){
                    return chart._height - margins.bottom - chart.yScale(d.val); //specifies height value to transition to 
                })//move to after transition because final height

             this.on('mouseover', tip.show)
                .on('mouseout', tip.hide);
            return this;
        }
      }
    });
  },

  transform: function(data){
    var dataValues = data.map(function(d){
        return d.val;
    });

    chart.xScale.domain(data.map(function(d){
            return d.name;
        }))
        .rangeBands([margins.left, chart._width - margins.right], 0.1)

    chart.yScale.domain([0, d3.max(dataValues)])
            .range([chart._height - margins.bottom, margins.top]);

    
    chart.xAxis.attr("class","axis")
        .attr("transform", "translate(0," + (chart._height - margins.top) + ")")
        .call(d3.svg.axis()
            .scale(chart.xScale)
            .orient("bottom"))

    chart.yAxis.attr("class", "axis")
        .attr("transform", "translate(" + margins.left + ",0)")
        .call(d3.svg.axis()
            .scale(chart.yScale)
                .orient("left"))

    return data; 
  },

  // set/get the width to use for the rects as they are
  // rendered.
  width: function(newWidth) {
    if (arguments.length === 0) {
      return this._width;
    }
    this._width = newWidth;
    return this;
  },
  height: function(newHeight) {
    if (arguments.length === 0) {
      return this._height;
    }
    this._height = newHeight;
    return this;
  }
});
// create an instance of the chart on a d3 selection
var chart = svg.chart("rectGraph")
  .width(width)
  .height(height);

// render it with some data
chart.draw(dataset);

