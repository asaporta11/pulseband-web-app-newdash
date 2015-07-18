var events = {
  updateInputValues: function(name, yValue){
    // var rectNumber = $(rect).closest('.rect').data('rect');
    console.log(name, yValue);
    var roundedInputY = Math.round(yValue);
    name = name.replace(/\s/g, '');
    $('#'+ name).val(roundedInputY);
  },
  sliderValueChange: function(){
    slider.value(Math.random()*100);
  }
}