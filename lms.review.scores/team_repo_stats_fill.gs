function team_repo_stats_fill() {
  var sheet = SpreadsheetApp.openById(
    "1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU"
  ).getSheetByName("team.repo.stats");

  for (var i = 2; i <= 365; i++) {
    Logger.log("row: " + i + "");

    for (var j = 3; j <= 46; j++) {
      //Logger.log("row: "+i+", column: "+j+"");

      var cell_value = sheet
        .getRange(i, j)
        .setFormula(
          "=IFERROR(QUERY({'repo.stats.pull'!A:AU};\"SELECT SUM(Col" +
            (j + 1) +
            ") WHERE Col2 = '\"&team.repo.stats!A" +
            i +
            '&"\' AND Col3 = "&team.repo.stats!B' +
            i +
            '&" LABEL SUM(Col' +
            (j + 1) +
            ") ''\";0),0)"
        )
        .getValue();

      sheet.getRange(i, j).setValue(cell_value);
    }
  }
}

/*
function team_repo_stats_fill() {
  var sheet = SpreadsheetApp.openById("1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU").getSheetByName("team.repo.stats");
  var cell = sheet.getRange("C269");
  cell.setFormula("=QUERY('repo.stats.pull'!A:AU;\"SELECT SUM(D) WHERE B = '\"&team.repo.stats!A266&\"' AND C = \"&team.repo.stats!B266&\" LABEL SUM(D) ''\";0)");
}
*/

/*
var range = SpreadsheetApp.getActiveSheet().getActiveRange();
var numRows = range.getNumRows();
var numCols = range.getNumColumns();
var writeValues = []
for (var i = 1; i <= numRows; i++) {
  var row = []
  for (var j = 1; j <= numCols; j++) {
    var currentValue = range.getCell(i,j).getValue();
    var withString = currentValue + " string";
    row.push(withString)
  }
  writeValues.push(row)
}
range.setValues(writeValues)
*/
