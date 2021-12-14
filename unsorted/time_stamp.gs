function TimeStampOUT() {
  // function to record the timestamps of when someone takes out a laptop
  var sprSheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = sprSheet.getActiveSheet();
  var activeRange = sheet.getActiveRange();

  var outCell = sheet.getRange(
    activeRange.getRowIndex(),
    getColumnNrByName(sheet, "Laptop Out")
  );
  var timeVal = sheet.getRange(
    activeRange.getRowIndex(),
    getColumnNrByName(sheet, "Out Time")
  );

  var today = new Date();
  var hours = today.getHours();
  var mins = ("0" + today.getMinutes()).slice(-2);
  var time = hours + ":" + mins;

  // FIXED: Timestamp no longer overwritten on edit if there is a recorded timestamp in the cell
  if (outCell.isChecked() == true) {
    if (timeVal.getValue() == "") {
      timeVal.setValue(time);
    }
  }
}

function TimeStampIN() {
  var sprSheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = sprSheet.getActiveSheet();
  var activeRange = sheet.getActiveRange();

  //hehehe... cause incels
  var inCell = sheet.getRange(
    activeRange.getRowIndex(),
    getColumnNrByName(sheet, "Laptop In")
  );
  var timeVal = sheet.getRange(
    activeRange.getRowIndex(),
    getColumnNrByName(sheet, "Intake Time")
  );

  var today = new Date();
  var hours = today.getHours();
  var mins = ("0" + today.getMinutes()).slice(-2);
  var time = hours + ":" + mins;

  // FIXED: Timestamp no longer overwritten on edit if there is a recorded timestamp in the cell
  if (inCell.isChecked() == true) {
    if (timeVal.getValue() == "") {
      timeVal.setValue(time);
    }
  }
}
