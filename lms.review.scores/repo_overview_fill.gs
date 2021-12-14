function repo_overview_fill() {
  var sheet = SpreadsheetApp.openById(
    "1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU"
  ).getSheetByName("repo.overview");

  for (var i = 567; i <= 567; i++) {
    //Logger.log("row: "+i+"");
    var k = 2;
    for (var j = 4; j <= 135; j++) {
      var cell_value = sheet
        .getRange(i, j)
        .setFormula(
          "=IFERROR(ROUND(DIVIDE(QUERY({'total.repo.stats'!A:AS},\"SELECT Col" +
            k +
            ' WHERE Col1 = "&repo.overview!C' +
            i +
            "&\"\",0),QUERY(UNIQUE(team.repo.stats!A2:A367),\"SELECT COUNT(Col1) WHERE Col1 != '' LABEL COUNT(Col1) ''\",0)),0),0)"
        )
        .getValue();
      sheet.getRange(i, j).setValue(cell_value);
      j++;
      var cell_value = sheet
        .getRange(i, j)
        .setFormula(
          "=IFERROR(ROUND(DIVIDE(QUERY({'team.repo.stats'!A:AT},\"SELECT Col" +
            (k + 1) +
            ' WHERE Col2 = "&repo.overview!C' +
            i +
            '&" AND Col1 = \'"&repo.overview!B' +
            i +
            '&"\'",0),QUERY(UNIQUE(repo.overview!A2:B1842),"SELECT COUNT(Col1) WHERE Col2 = \'"&repo.overview!B' +
            i +
            "&\"' LABEL COUNT(Col1) ''\",0)),0),0)"
        )
        .getValue();
      sheet.getRange(i, j).setValue(cell_value);
      j++;
      var cell_value = sheet
        .getRange(i, j)
        .setFormula(
          "=IFERROR(QUERY({'self.repo.stats'!A:AU},\"SELECT Col" +
            (k + 2) +
            " WHERE Col1 = '\"&repo.overview!A" +
            i +
            "&\"' AND Col2 = '\"&repo.overview!B" +
            i +
            '&"\' AND Col3 = "&repo.overview!C' +
            i +
            '&"",0),0)'
        )
        .getValue();
      sheet.getRange(i, j).setValue(cell_value);
      k++;
    }
  }
}

// \"&QUERY(UNIQUE(team.repo.stats!A2:A367),\"SELECT COUNT(Col1) WHERE Col1 != '' LABEL COUNT(Col1) ''\",0)&\"
// \"&QUERY(UNIQUE(repo.overview!A2:B1842),\"SELECT COUNT(Col1) WHERE Col2 = '"&B3&"' LABEL COUNT(Col1) ''\",0)&\"
