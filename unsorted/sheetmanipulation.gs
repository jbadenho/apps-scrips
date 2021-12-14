function getColumnNrByName(sheet, name) {
  var range = sheet.getRange(1, 1, 1, sheet.getMaxColumns());
  var values = range.getValues();

  for (var row in values) {
    for (var col in values[row]) {
      if (values[row][col] == name) {
        col = Number(col);
        return parseInt(col + 1);
      }
    }
  }
}

function addFlagVal(row, column, flagSheet) {
  flagSheet.getRange(row, column).setValue(1);
}
