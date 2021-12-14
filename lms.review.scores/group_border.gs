function group_border() {
  //var sheet = SpreadsheetApp.openById("1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU").getSheetByName("repo.numbers");
  //setup spreadsheet
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = SpreadsheetApp.openById(
    "1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU"
  ).getSheetByName("repo.scores");

  // get key variables
  var LastRow = sheet.getLastRow();
  var LastColumn = sheet.getLastColumn();

  //erase any current formatting
  var ClearRange = sheet
    .getRange(1, 1, LastRow, LastColumn)
    .setBorder(false, false, false, false, false, false); // clear all formatting

  // get the data
  var data = sheet
    .getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
    .getValues();

  // setup new array
  var ListofFruits = new Array();

  // Loop through the fruits (Column A)
  for (var i in data) {
    var row = data[i][0].toString();

    // search for unqiue values
    if (ListofFruits.indexOf(row) == -1) {
      // if value =-1, then the variable is unique

      // Logger.log(row+" is not referenced. Adding it");//DEBUG
      // underline the previous row
      var range = sheet
        .getRange(+i + 1, 1, 1, LastColumn)
        .setBorder(
          true,
          false,
          false,
          false,
          false,
          false,
          "black",
          SpreadsheetApp.BorderStyle.SOLID_SMALL
        ); // format if true

      // continue to build array
      ListofFruits.push(row);
    }
  }
  // underline the last row of the fruits column
  var range = sheet
    .getRange(LastRow, 1, 1, LastColumn)
    .setBorder(
      null,
      null,
      true,
      null,
      false,
      false,
      "black",
      SpreadsheetApp.BorderStyle.SOLID_SMALL
    ); // format if true
  // Logger.log(ListofFruits);// DEBUG
}

//function group_border() {
//  //setup spreadsheet
//  var ss = SpreadsheetApp.getActiveSpreadsheet();
//  var sheet = SpreadsheetApp.openById(
//    "1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU"
//  ).getSheetByName("repo.numbers");
//
//  // get key variables
//  var LastRow = sheet.getLastRow();
//  var LastColumn = sheet.getLastColumn();
//
//  //erase any current formatting
//  var ClearRange = sheet
//    .getRange(1, 1, LastRow, LastColumn)
//    .setBorder(false, false, false, false, false, false); // clear all formatting
//
//  // get the data
//  var data = sheet
//    .getRange(1, 1, sheet.getLastRow(), sheet.getLastColumn())
//    .getValues();
//
//  // setup new array
//  var ListofFruits = new Array();
//
//  // Loop through the fruits (Column A)
//  for (var i in data) {
//    var row = data[i][0].toString();
//
//    // search for unqiue values
//    if (ListofFruits.indexOf(row) == -1) {
//      // if value =-1, then the variable is unique
//
//      // Logger.log(row+" is not referenced. Adding it");//DEBUG
//      // underline the previous row
//      var range = sheet
//        .getRange(+i + 1, 1, 1, LastColumn)
//        .setBorder(
//          true,
//          false,
//          false,
//          false,
//          false,
//          false,
//          "black",
//          SpreadsheetApp.BorderStyle.SOLID_SMALL
//        ); // format if true
//
//      // continue to build array
//      ListofFruits.push(row);
//    }
//  }
//  // underline the last row of the fruits column
//  var range = sheet
//    .getRange(LastRow, 1, 1, LastColumn)
//    .setBorder(
//      null,
//      null,
//      true,
//      null,
//      false,
//      false,
//      "black",
//      SpreadsheetApp.BorderStyle.SOLID_SMALL
//    ); // format if true
//  // Logger.log(ListofFruits);// DEBUG
//}
