function self_repo_stats_fill() {
  var sheet = SpreadsheetApp.openById(
    "1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU"
  ).getSheetByName("self.repo.stats");

  for (var i = 2; i <= 1842; i++) {
    //Logger.log("row: "+i+"");

    for (var j = 4; j <= 47; j++) {
      //Logger.log("row: "+i+", column: "+j+"");

      var cell_value = sheet
        .getRange(i, j)
        .setFormula(
          "=IFERROR(QUERY({'repo.stats.pull'!A:AU};\"SELECT SUM(Col" +
            j +
            ") WHERE Col1 = '\"&self.repo.stats!A" +
            i +
            "&\"' AND Col2 = '\"&self.repo.stats!B" +
            i +
            '&"\' AND Col3 = "&self.repo.stats!C' +
            i +
            '&" LABEL SUM(Col' +
            j +
            ") ''\";0),0)"
        )
        .getValue();

      sheet.getRange(i, j).setValue(cell_value);
    }
  }
}
