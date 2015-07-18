var events = {
  updateInputValues: function(rect, yValue){
    var rectNumber = $(rect).closest('.rect').data('rect');
    var roundedInputY = Math.round(yValue);
    $('#rect'+ rectNumber).val(roundedInputY);
  },
  sliderValueChange: function(){
    slider.value(Math.random()*100);
  }
}