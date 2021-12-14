function main_outside() {
  var sheet = SpreadsheetApp.openById(
    "1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU"
  ).getSheetByName("index");
  var index = sheet.getDataRange().getLastRow();
  var cell_value = sheet.getRange(index, 1).getValue();

  if (cell_value > 1842) {
    var triggers = ScriptApp.getProjectTriggers();
    for (var i in triggers) {
      var funcName = triggers[i].getHandlerFunction();

      if (funcName == "repo_overview_fill_outside") {
        ScriptApp.deleteTrigger(funcName);
      }
    }
  }

  repo_overview_fill_outside(cell_value);

  cell_value = cell_value + 3;

  sheet.getRange(index + 1, 1).setValue(cell_value);
}
