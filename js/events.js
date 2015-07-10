var events = {
  dragmove: function (d) {
    // console.log("d3.event.sourceEvent.y: " + d3.event.sourceEvent.y);
    // console.log("d3.mouse(this)[1]: " + d3.mouse(this)[1]);
    // console.log("svgHeight: " + svgHeight);
    // console.log("margins.bottom: " + margins.bottom);                
    d3.select(this)
      .attr("y", function(d) { 
        return d3.mouse(this)[1];
      })
      .attr("height", ( svgHeight - margins.bottom - d3.mouse(this)[1] ));
  }
}