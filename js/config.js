var margins = {
  left: 100,
  right: 100,
  top: 50,
  bottom: 20
};

var dataset = [
  { val: 129, name: 'Blood Pressure', max: 240, unit: 'systolic', step: 1, healthyMin: 110, healthyMax:140, healthyRange: 30 },
  { val: 70, name: 'Heart Rate', max: 190, unit: 'bpm', step: 1, healthyMin: 50, healthyMax: 80, healthyRange: 30 },
  { val: 4500, name: 'Activity', max: 20000, unit: 'steps',step: 500, healthyMin: 5000, healthyMax:20000, healthyRange: 15000 },
  { val: 50, name: 'Cholesterol', max: 210 , unit: 'mmHg', step: 1, healthyMin:60, healthyMax: 100, healthyRange: 40 },
  { val: 60, name: 'Blood Sugars', max: 450, unit: 'mmHg', step: 5, healthyMin: 90, healthyMax: 120, healthyRange: 30 },
  { val: 18, name: 'BMI', max: 56, unit: 'BMI', step: 0.5, healthyMin: 18.5, healthyMax: 24.9, healthyRange: 6.4 }
];




//Note: 
//x- axis chart._height - margins.bottom