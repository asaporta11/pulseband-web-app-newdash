d3.chart("slider", {
    initialize: function() {
        var chart = this;
        var slideTriHeight = 15;
        chart.xScale = d3.scale.threshold();
        chart.sliderxScale = d3.scale.linear()
            .domain([0,100]);

        var rectGroup = this.base.append('g');
        var sliderGroup = this.base.append('g'); 
        var textGroup = this.base.append('g'); 

        chart.layer("sliderLayer", sliderGroup, {
            // select the elements we wish to bind to and bind the data to them.
            dataBind: function(data) {
                return this.selectAll('g.sliderPath').data(data);
            },
            insert: function() {
                var group = this.append('g')
                    .classed('sliderPath', true)
                    .attr('transform', 'translate('+ 0 +', 12)');
                group.append('path')
                    .attr("d", d3.svg.symbol().type('triangle-down'))
                    .style('fill', 'white')
                    .style('stroke', 'black')
                    .style('stroke-width', 1);

                return this;  
            },
            events: {
                // paint all elements
                "merge": function() {
                    this.transition()
                        .ease('linear')
                        .attr('transform', function(d) {
                            console.log(d);
                            return 'translate('+ chart.sliderxScale(d) +', 12)';
                        })
                    return this;
                }
            }
        });

        chart.layer("textLayer", textGroup, {
            // select the elements we wish to bind to and bind the data to them.
            dataBind: function(data) {
                return this.selectAll('g.text').data(data);
            },
            insert: function() {
                var group = this.append('g')
                    .classed('text', true)
                    .attr('transform', 'translate('+ 0 +', 12)');
                group.append('text');

                return this;  
            },
            events: {
                // paint all elements
                "merge": function() {
                    this.select('text')
                        .text(function(d){
                            return d;
                        });
                    return this;
                }
            }
        });

        chart.transform = function(data) {
            chart.sliderxScale.range([0, chart._width]);
            drawRectangles();
            return data;
        };

        function drawRectangles(){
            rectGroup.append('rect')
                .attr('y', slideTriHeight)
                .attr('x', 0)
                .attr('width', chart._width)
                .attr('height', chart._height - slideTriHeight)
                .style('stroke', 'black')
                .style('stroke-width', 1); 


        }
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
