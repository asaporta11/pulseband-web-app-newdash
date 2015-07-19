var margins = {
  left: 100,
  right: 100,
  top: 50,
  bottom: 20
};

var dataset = [
  { val: 129, name: 'Blood Pressure', max: 200, unit: 'systolic'},
  { val: 70, name: 'Heart Rate', max: 190, unit: 'bpm' },
  { val: 4500, name: 'Activity', max: 20000, unit: 'steps' },
  { val: 50, name: 'Cholesterol', max: 210, unit: 'mmHg' },
  { val: 60, name: 'Blood Sugars', max: 450, unit: 'mmHg' },
  { val: 18, name: 'BMI', max: 56, unit: 'BMI' }
];

var datasetMore = [
  { val: 129, name: 'Blood Pressure', max: 240, unit: 'systolic', healthyMin: 110, healthyMax:140 },
  { val: 70, name: 'Heart Rate', max: 190, unit: 'bpm', healthyMin: 50, healthyMax: 80},
  { val: 4500, name: 'Activity', max: 20000, unit: 'steps', healthyMin: 5000, healthyMax:20000 },
  { val: 50, name: 'Cholesterol', max: 210 , unit: 'mmHg', healthyMin:60, healthyMax: 100 },
  { val: 60, name: 'Blood Sugars', max: 450, unit: 'mmHg', healthyMin: 90, healthyMax: 120  },
  { val: 18, name: 'BMI', max: 56, unit: 'BMI', healthyMin: 18.5, healthyMax: 24.9 }
];

  // { val: 129, name: 'Blood Pressure', max: 200, unit: 'systolic', healthyMin: 60, healthyMax: 90 },
//Note: 
//x- axis chart._height - margins.bottom