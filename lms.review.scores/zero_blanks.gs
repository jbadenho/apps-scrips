function zero_blanks() {
  var sheet = SpreadsheetApp.openById(
    "1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU"
  ).getSheetByName("repo.scores");
  var LastRow = sheet.getLastRow();
  var LastColumn = sheet.getLastColumn();
  var range = sheet
    .getRange(1, 1, LastRow, LastColumn)
    .offset(0, 0, sheet.getDataRange().getNumRows());

  range.setValues(
    range.getValues().map(function (row) {
      return row.map(function (cell) {
        return !cell ? 0 : cell;
      });
    })
  );
}
