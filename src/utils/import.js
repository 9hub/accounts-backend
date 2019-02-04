var XLSX = require('xlsx');

var readWorkSheet = function(worksheet, size) {
  var values = [];
  var properties = [];
  var counter = 0;
  for (z in worksheet) {
    if(z[0] === '!') continue;
    properties.push(worksheet[z].v);
    counter++;
    if (counter > size) {
      counter = 0;
      values.push(properties);
      properties = [];
    }
  }
  return values;
};

// http://stackoverflow.com/questions
// /11089399/count-with-a-b-c-d-instead-of-0-1-2-3-with-javascript
function toLetters(num) {
  "use strict";
  var mod = num % 26,
    pow = num / 26 | 0,
    out = mod ? String.fromCharCode(64 + mod) : (--pow, 'Z');
  return pow ? toLetters(pow) + out : out;
}

var readWorkSheetMap = function(worksheet, size) {
  var values = [];
  if (size > 26) {
    throw new Error('current function does not take into account longer files');
  }
  var map = worksheet['!ref'].split(':')[1];
  var max_x = map[0];
  var max_y = map.substring(1);
  console.log(map);

  for (var y = 1; y <= parseInt(max_y); y++) {
    var properties = [];
    for (var x = 1; x <= size; x++) {
      var key = toLetters(x) + y;
      if (worksheet[key]) {
        properties.push(worksheet[key].v);
      } else {
        properties.push(null);
      }
    }
    values.push(properties);
  }
  return values;
};

exports.excel = function(req, res, next) {
  var file_name = req.body.file_name;
  var workbook = XLSX.readFile('public/files/' + file_name);
  var first_sheet_name = workbook.SheetNames[0];

  /* Get worksheet */
  var worksheet = workbook.Sheets[first_sheet_name];
  // var values = readWorkSheet(worksheet, 5);
  var values = readWorkSheetMap(worksheet, 8);
  res.json(values);
};
