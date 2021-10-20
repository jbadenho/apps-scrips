function clear_data() {
  var target_sheet = SpreadsheetApp.openById(
    "1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU"
  ).getSheetByName("overview");

  Logger.log("Clearing Target Sheet Data...");
  //target_sheet.deleteRows(1, target_sheet.getLastRow());
  target_sheet.clear();
}
