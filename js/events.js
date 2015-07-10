var events = {
  dragmove: function (d) {             
    d3.select(this)
      .attr("y", function(d) { 
        return d3.mouse(this)[1];
      })
      .attr("height", ( svgHeight - margins.bottom - d3.mouse(this)[1] ));
  }
}

  
