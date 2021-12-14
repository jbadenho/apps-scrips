function copy_rows() {
  var sheet = SpreadsheetApp.openById(
    "1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU"
  ).getSheetByName("repo.overview");

  for (var i = 1472; i <= 1841; i++) {
    var l = i;

    for (var k = i; k <= l + 5; k++) {
      var row_original = sheet.getRange(k, 1).getRow();

      sheet.insertRowAfter(row_original);

      for (var j = 1; j <= 4; j++) {
        var cell_value = sheet.getRange(k, j).getValue();

        sheet.getRange(k + 1, j).setValue(cell_value);
      }
      i++;
    }
  }
}
