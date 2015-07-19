d3.chart("rectGraph", {
    initialize: function() {
        var chart = this;
        var firstDraw = true; //to make it transition on first load but not again 
        var healthyBase = this.base.append('g');
        var rectBase = this.base.append('g');

        chart.yScale = d3.scale.linear();

        // create a layer of circles that will go into
        // a new group element on the base of the chart
        chart.layer("rectGroup", rectBase, {

            // select the elements we wish to bind to and
            // bind the data to them.
            dataBind: function(data) {
                return this.selectAll('g.containBar').data(data);
            },

            // insert actual bars, and group containing both the line and text at the top of each bar 
            insert: function() {
                var group = this.append('g')
                    .classed('containBar', true);
                group.append('rect')
                    .attr("x", chart._width*0.1) //x pos set to 0 for each chart
                    .attr("width", chart._width*0.8)
                    .attr("y", chart._height - margins.bottom) //set y value to 0 on axis
                    .attr("height", 0); //set height to 0 (state before transition)

                var lineTextGroup = group.append('g')
                    .classed('topBarGroup', true)
                    .attr('transform', "translate(0,"+ (svgHeight - margins.bottom) +")");
                lineTextGroup.append('line');
                lineTextGroup.append('text');    
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
                            events.sliderValueChange();
                            d.val = chart.yScale.invert(d3.mouse(this)[1]);
                            chart.trigger('drag', d);        
                        });

                    if(firstDraw){ //if firstDraw is true will initiate loop
                        rectSelection = this.select('rect')
                            .transition() //initiates transition for rects
                            .delay(function(data, i) {
                                return i * 20;
                            })
                            .duration(2000)
                            .ease("elastic");

                        //top bar group contains the line and text at the top of each bar 
                        topBarSelection = this.select('.topBarGroup')
                            .transition()
                            .delay(function(d, i) {
                                return i * 20;
                            })
                            .duration(2000)
                            .ease("elastic");
                                
                    }else{
                        rectSelection = this.select('rect');
                        topBarSelection = this.select('.topBarGroup');   
                    }
                    firstDraw = false;   

                    rectSelection.attr("y", function(d) {
                            return chart.yScale(d.val); //specifies y value to transition to
                        })
                        .attr("height", function(d) {
                            return chart._height - margins.bottom - chart.yScale(d.val); //specifies height value to transition to 
                        }); 

                    topBarSelection.attr('transform', function(d) { 
                            return "translate(0," + chart.yScale(d.val) + ")"; 
                        });    
                    //draws line on bar    
                    this.select("line")
                        .attr("x1", 20)
                        .attr("y1", function() {
                            return 7;
                        })
                        .attr("x2", 80)
                        .attr("y2", function() {
                            return 7;
                        })
                        .attr("stroke", "black")
                        .attr("stroke-width", 1); 

                    //draws the text on bar
                    this.select('text')
                        .attr("x", chart._width / 2) 
                        .attr("y", function(d) {
                            return 25
                        })
                        .text(function(d) { 
                            return parseInt(d.val) +" "+d.unit+"";
                        })  
                        .style('text-anchor', 'middle')
                        .attr('fill', "black") 

                    this.call(drag);
                    return this;
                }
            }
        });
        chart.layer("healthyGroup", healthyBase, {  

            // select the elements we wish to bind to and
            // bind the data to them.
            dataBind: function(data) {
                return this.selectAll('g.healthy').data(data);
            },

            // insert actual bars, and group containing both the line and text at the top of each bar 
            insert: function() {
                var group = this.append('g')
                    .classed('healthy', true)
                    .append('line');
                    
  
                return this;  
            },

            // define lifecycle events
            events: {
                // paint new elements
                "merge": function() {
                    //for draggable beh
                    
                    return this;
                }
            }
        });
    },

    transform: function(data) {
        var adjustData; 
        if( data.val > data.max ){
            adjustData = [{ val: data.max }]; 
        }else{

        }
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