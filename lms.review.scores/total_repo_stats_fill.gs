function total_repo_stats_fill() {
  var sheet = SpreadsheetApp.openById(
    "1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU"
  ).getSheetByName("total.repo.stats");

  for (var i = 2; i <= 7; i++) {
    //Logger.log("row: "+i+"");

    for (var j = 2; j <= 45; j++) {
      //Logger.log("row: "+i+", column: "+j+"");

      var cell_value = sheet
        .getRange(i, j)
        .setFormula(
          "=IFERROR(QUERY({'team.repo.stats'!A:AT};\"SELECT SUM(Col" +
            (j + 1) +
            ') WHERE Col2 = "&total.repo.stats!A' +
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
