var events = {
  updateInputValues: function(name, yValue){
    // var rectNumber = $(rect).closest('.rect').data('rect');
    var roundedInputY = Math.round(yValue);
    name = name.replace(/\s/g, '');
    $('#'+ name).val(roundedInputY);
  },
  sliderValueChange: function(){
    slider.value(events.getRiskValue());
  },
  getRiskValue: function(){

    var percentOfSelf;
    var cumulativeSum = 0; 
    var averageRisk;
    for (var i = 0; i < dataset.length; i++){
      percentOfSelf = dataset[i].val / dataset[i].max;
      cumulativeSum += percentOfSelf;
    }
    averageRisk = cumulativeSum / dataset.length * 100;
    return Math.round(averageRisk);
  } 
}