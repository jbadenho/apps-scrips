function copy_data_only() {
  //Logger.log(SpreadsheetApp.openById("1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU").getSheetByName("law.of.averages"));
  Logger.log("Opening Source Sheet...");

  var source_sheet = SpreadsheetApp.openById(
    "1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU"
  ).getSheetByName("law.of.averages");
  //var source_range = source_sheet.getDataRange();
  var source_range = source_sheet.getRange(1, 1, source_sheet.getLastRow(), 6);
  var source_values = source_range.getValues();
  var source_row = source_values.length;
  var source_column = source_values[0].length;

  Logger.log("Finding Target Sheet...");

  if (
    SpreadsheetApp.openById(
      "1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU"
    ).getSheetByName("overview") == null
  ) {
    Logger.log("Target Sheet Not Found, Creating...");
    SpreadsheetApp.getActiveSpreadsheet().setActiveSheet(
      SpreadsheetApp.openById(
        "1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU"
      ).insertSheet("overview")
    );
    //SpreadsheetApp.getActiveSpreadsheet().moveActiveSheet(SpreadsheetApp.getActiveSpreadsheet().getNumSheets());
    SpreadsheetApp.getActiveSpreadsheet().moveActiveSheet(0);
  }

  var target_sheet = SpreadsheetApp.openById(
    "1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU"
  ).getSheetByName("overview");
  var target_range = target_sheet.getRange(1, 1, source_row, source_column);

  Logger.log("Copying Data From Source To Target...");
  target_range.setValues(source_values);

  Logger.log("Changing Target Index Values...");
  //SpreadsheetApp.openById("1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU").getSheetByName("overview").getRange("B1").setValue("total.average.percentage");
  target_sheet.getRange("B1").setValue("total.ave.%");
  target_sheet.getRange("C1").setValue("self.total.ave.%");
  target_sheet.getRange("D1").setValue("member.total.ave.%");
  target_sheet.getRange("E1").setValue("team.total.ave.%");
  target_sheet.getRange("F1").setValue("member.marked.total.ave.%");
  target_sheet.autoResizeColumns(1, 6);
}

//function copy_data_only() {
//  //Logger.log(SpreadsheetApp.openById("1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU").getSheetByName("law.of.averages"));
//  Logger.log("Opening Source Sheet...");
//
//  var source_sheet = SpreadsheetApp.openById(
//    "1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU"
//  ).getSheetByName("law.of.averages");
//  //var source_range = source_sheet.getDataRange();
//  var source_range = source_sheet.getRange(1, 1, source_sheet.getLastRow(), 6);
//  var source_values = source_range.getValues();
//  var source_row = source_values.length;
//  var source_column = source_values[0].length;
//
//  Logger.log("Finding Target Sheet...");
//
//  if (
//    SpreadsheetApp.openById(
//      "1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU"
//    ).getSheetByName("overview") == null
//  ) {
//    Logger.log("Target Sheet Not Found, Creating...");
//    SpreadsheetApp.getActiveSpreadsheet().setActiveSheet(
//      SpreadsheetApp.openById(
//        "1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU"
//      ).insertSheet("overview")
//    );
//    //SpreadsheetApp.getActiveSpreadsheet().moveActiveSheet(SpreadsheetApp.getActiveSpreadsheet().getNumSheets());
//    SpreadsheetApp.getActiveSpreadsheet().moveActiveSheet(0);
//  }
//
//  var target_sheet = SpreadsheetApp.openById(
//    "1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU"
//  ).getSheetByName("overview");
//  var target_range = target_sheet.getRange(1, 1, source_row, source_column);
//
//  Logger.log("Copying Data From Source To Target...");
//  target_range.setValues(source_values);
//
//  Logger.log("Changing Target Index Values...");
//  //SpreadsheetApp.openById("1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU").getSheetByName("overview").getRange("B1").setValue("total.average.percentage");
//  target_sheet.getRange("B1").setValue("total.ave.%");
//  target_sheet.getRange("C1").setValue("self.total.ave.%");
//  target_sheet.getRange("D1").setValue("member.total.ave.%");
//  target_sheet.getRange("E1").setValue("team.total.ave.%");
//  target_sheet.getRange("F1").setValue("member.marked.total.ave.%");
//  target_sheet.autoResizeColumns(1, 6);
//}
