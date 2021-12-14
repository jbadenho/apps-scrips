function CurrentYear() {
  var date = new Date();
  var year = date.getFullYear();
  return year;
}

function WeekDay() {
  return Utilities.formatDate(new Date(), "GMT", "EEEE");
}

// Gets the current month today and returns it as a string - e.g January
function CurrentMonth() {
  var date = new Date();
  var month = date.getMonth();
  if (month == 0) {
    return "January";
  } else if (month == 1) {
    return "February";
  } else if (month == 2) {
    return "March";
  } else if (month == 3) {
    return "April";
  } else if (month == 4) {
    return "May";
  } else if (month == 5) {
    return "June";
  } else if (month == 6) {
    return "July";
  } else if (month == 7) {
    return "August";
  } else if (month == 8) {
    return "September";
  } else if (month == 9) {
    return "October";
  } else if (month == 10) {
    return "November";
  } else if (month == 11) {
    return "December";
  }
}

function AddTime() {
  var SpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  var time = new Date();
  var timestamp = Utilities.formatDate(time, "GMT+2:00", "HH:mm");
  return timestamp;
}

// Gets the current day and returns it as the day of the month
function CurrentDay() {
  var date = new Date();
  var day = date.getDate();
  if (day.toString().length == 1) {
    var day = "0" + day;
  }
  return day;
}
