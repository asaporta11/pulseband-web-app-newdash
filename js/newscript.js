var svgWidth = parseInt($('#bar-chart').css('width'));
var svgHeight = parseInt($('#bar-chart').css('height'));

var margins = {
    left: 100,
    right: 100,
    top: 100,
    bottom: 100
};


var dataset = [
    {val: 129, name: "Blood Pressure", max: 200, unit: "systolic"},
    {val: 70, name: "Heart Rate", max: 200, unit: "bpm" },
    {val: 4500, name: "Activity", max: 20000, unit: "steps" },
    {val: 50, name: "Cholesterol", max: 200, unit: "mmHg"},
    {val: 60, name: "Blood Sugars", max: 200, unit: "mmHg"},
    {val: 18, name: "BMI", max: 30, unit: "BMI"}
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
            .attr("width", svgWidth - (margins.left + margins.right))
            .attr("height", svgHeight - (margins.top + margins.bottom));

var xAxis = svg.append("g");
var xScale = d3.scale.ordinal(); 

var i;

xScale.domain(dataset.map(function(d){
        return d.name;
    }))
    .rangeBands([margins.left, (svgWidth - margins.right)], .1)

xAxis.attr("class","axis")
        .attr("transform", "translate(0," + (svgHeight - margins.top) + ")")
        .call(d3.svg.axis()
            .scale(xScale)
            .orient("bottom"))



d3.chart("rectGraph", {

  initialize: function() {
    var chart = this; 
    chart.yScale = d3.scale.linear();

    // Initialize tooltip
    var tip = d3.tip().html(function(d) { return d.val + " " + d.unit; });

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

        // paint new elements
        "merge": function() {
            
          this.attr("x", 0)//x pos set to 0 for each chart
            .attr("width", chart._width)
            .attr("y", chart._height - margins.bottom) //set y value to 0 on axis
            .attr("height", 0); //set height to 0 (state before transition)


            this.transition() //initiates transition
                .delay(function(data, i){ return i * 20; })
                .duration(1000)
                .ease("elastic")
                .attr("y", function(d){
                    return chart.yScale(d.val); //specifies y value to transition to
                })
                .attr("height",function(d){
                    return chart._height - margins.bottom - chart.yScale(d.val); //specifies height value to transition to 
                })//move to after transition because this is the final height

             this.on('mouseover', tip.show)
                .on('mouseout', tip.hide);
            return this;
        }
      }
    });
  },

  transform: function(data){
    chart.yScale.domain([0, data[0].max])
            .range([chart._height - margins.bottom, margins.top]);
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

for(i=0; i < dataset.length; i++){
  var chart = svg.append("g")
    .attr("transform", "translate(" + xScale(dataset[i].name) + ", 0)")
    .chart("rectGraph")
    .width(xScale.rangeBand())
    .height(svgHeight);
    chart.draw([dataset[i]]);
}


//update input 
d3.select("#nRadius").on("input", function() {
  update(+this.value);
});

// Initial starting radius of the circle 
update(dataset[0].val);

// update the elements
function update(nRadius) {

  // adjust the text on the range slider
  d3.select("#nRadius-value").text(nRadius);
  d3.select("#nRadius").property("value", nRadius);

  // update the circle radius
  holder.selectAll("rect") 
    .attr("y", nRadius);
}


// create an instance of the chart on a d3 selection
// var chart = svg.append("g")
//   .attr("transform", "translate(" + xScale(dataset[0].name) + ", 0)")
//   .chart("rectGraph")
//   .width(xScale.rangeBand())
//   .height(svgHeight);

// render it with some data
// chart.draw([dataset[0]]);

