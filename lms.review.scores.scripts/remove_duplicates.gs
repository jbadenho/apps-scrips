function remove_duplicates() {
  Logger.log("Finding Duplicates In Target Sheets...");

  var target_sheet_1 = SpreadsheetApp.openById(
    "1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU"
  ).getSheetByName("self.assessment.scores");
  var target_data = target_sheet_1.getDataRange().getValues();
  var target_new = [];

  for (var i in target_data) {
    var row = target_data[i];
    var duplicate = false;
    for (var j in target_new) {
      if (row.join() == target_new[j].join()) {
        duplicate = true;
      }
    }
    if (!duplicate) {
      target_new.push(row);
    }
  }

  target_sheet_1.clearContents();
  target_sheet_1
    .getRange(1, 1, target_new.length, target_new[0].length)
    .setValues(target_new);

  var target_sheet_2 = SpreadsheetApp.openById(
    "1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU"
  ).getSheetByName("peer.assessment.scores");
  var target_data = target_sheet_2.getDataRange().getValues();
  var target_new = [];

  for (var i in target_data) {
    var row = target_data[i];
    var duplicate = false;
    for (var j in target_new) {
      if (row.join() == target_new[j].join()) {
        duplicate = true;
      }
    }
    if (!duplicate) {
      target_new.push(row);
    }
  }

  target_sheet_2.clearContents();
  target_sheet_2
    .getRange(1, 1, target_new.length, target_new[0].length)
    .setValues(target_new);

  var target_sheet_3 = SpreadsheetApp.openById(
    "1C_TIGtNL93YO9Aw7iZ-m0SViRf-IgujGmwa2RxSWcDU"
  ).getSheetByName("team.assessment.scores");
  var target_data = target_sheet_3.getDataRange().getValues();
  var target_new = [];

  for (var i in target_data) {
    var row = target_data[i];
    var duplicate = false;
    for (var j in target_new) {
      if (row.join() == target_new[j].join()) {
        duplicate = true;
      }
    }
    if (!duplicate) {
      target_new.push(row);
    }
  }

  target_sheet_3.clearContents();
  target_sheet_3
    .getRange(1, 1, target_new.length, target_new[0].length)
    .setValues(target_new);
}
