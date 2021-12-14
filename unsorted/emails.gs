//This will decide whether kids get official emails or reminders
function ChronoTrigger() {
  var today = CurrentDay();
  var weekday = WeekDay();

  if (today == 1) {
    return "timeFrame0";
  } else if (today == 19) {
    return "timeFrame1";
  }
}

// Chooses which email gets sent depending on the trigger
function MessageChoices(attendance, name, month, version) {
  var remainder = 18 - attendance;
  var email_reminder = HtmlService.createTemplateFromFile("Email_Reminder");
  var emailSerious = HtmlService.createTemplateFromFile("Email_Serious");
  var emailRevoke = HtmlService.createTemplateFromFile("Email_Revoke");

  emailSerious.first = name;
  emailRevoke.first = name;
  email_reminder.first = name;

  emailSerious.months = month;
  emailRevoke.months = month;
  email_reminder.months = month;

  emailSerious.total = attendance;
  emailRevoke.total = attendance;
  email_reminder.total = attendance;

  emailSerious.remaining = remainder;
  emailRevoke.remaining = remainder;
  email_reminder.remaining = remainder;

  if (version == "reminder") {
    return email_reminder.evaluate().getContent();
  } else if (version == "serious") {
    return emailSerious.evaluate().getContent();
  } else if (version == "revoke") {
    return emailRevoke.evaluate().getContent();
  }
}

// This function counts how many times people got flagged for horrible attendance, if they have been flagged for 3 months or more, they get sent a warning email
function sendFlagWarning(name, row, flagsheet, emailAddress, studentUser) {
  flaggedRange = flagsheet.getRange(
    row,
    getColumnNrByName(flagsheet, "Total Flags")
  );
  flaggedCount = flaggedRange.getValue();
  var email_hearing = HtmlService.createTemplateFromFile("Email_Warning");

  // I need this to get the student name to add to the email
  email_hearing.first = name;

  // I need this to get the number flags that the student got to add to the email
  email_warning.count = flaggedCount;
  if (flaggedCount >= 3) {
    email_warningToSend = email_warning.evaluate().getContent();
    MailApp.sendEmail({
      to: emailAddress, // Changes to emailAddress once testing is over
      subject: "WTC Attendance Flagging - " + studentUser,
      htmlBody: email_warningToSend,
    });
  }
  MailApp.sendEmail({
    to: "campus-team@wethinkcode.co.za", // NB: THIS WILL SEND TO TO CAMPUS TEAM BASED ON EVERYONE WHO HAS BEEN FLAGGED MORE THAN 3 TIMES
    subject: "WTC CPT Cohort 2021 Attendance Flag Warning email sent",
    htmlBody:
      "Message successfully sent to the following users: " + hearingList,
  });
}

// Sends the message to the appropriate email addresses
function sendEmail() {
  // Takes the Current Spreadsheet, looks for the appropriate sheet - e.g Attendance_November and gets the total number of rows to check through
  var SpreadSheet = SpreadsheetApp.getActiveSpreadsheet();
  var thisYear = CurrentYear();
  var month = CurrentMonth();

  var revokeList = [];
  var warningList = [];
  var reminderList = [];

  var attendanceSheet = SpreadSheet.getSheetByName("Attendance_" + month);
  var flaggingSheet = SpreadSheet.getSheetByName("Attendance_Flags");
  var rowNum = attendanceSheet.getLastRow();
  // Looking through each row in a loop, starting from the 2nd row, until the last one
  for (var row = 2; row < rowNum + 1; row++) {
    var flagColumn = getColumnNrByName(flaggingSheet, month + " " + thisYear);
    // Gets the column with student Usernames and assigns a Username to a variable
    var studentUserRange = attendanceSheet.getRange(row, 1);
    var studentUser = studentUserRange.getValue();
    var studentFirstRange = attendanceSheet.getRange(row, 2);
    var studentFirst = studentFirstRange.getValue();
    var version = "";
    // Gets the appropriate trigger for the appropriate message to send and Date to look out for
    var timeFrame = ChronoTrigger();

    // Gets the column with student Accounted for Attendance totals and assigns totals to a variable
    var attendanceRange = attendanceSheet.getRange(
      row,
      getColumnNrByName(attendanceSheet, "Total Days Accounted For")
    );
    var attendanceTotal = attendanceRange.getValue();

    // If this trigger is is true, check if the total attended days is more than 8, if not, send a very nice email about their bad attendance
    // Feel free to change the days accordingly if it doesn't seem right
    if (timeFrame == "timeFrame0") {
      if (attendanceTotal < 11) {
        version = "reminder";
        month = month;
        var emailAddress = attendanceSheet
          .getRange(row, getColumnNrByName(attendanceSheet, "Email"))
          .getValue();
        var message = MessageChoices(
          attendanceTotal,
          studentFirst,
          month,
          version
        );
        MailApp.sendEmail({
          to: emailAddress,
          subject: "WTC Attendance - " + studentUser,
          htmlBody: message,
        });
        reminderList.push(studentUser + "\n");
      }
    } else if (timeFrame == "timeFrame1") {
      // if (attendanceTotal < 20) {
      //   version = "revoke";
      //   var emailAddress = attendanceSheet.getRange(row,getColumnNrByName(attendanceSheet, "Email")).getValue();
      //   var message = MessageChoices(attendanceTotal,studentFirst,month, version);
      //   MailApp.sendEmail({
      //     to: emailAddress, // NB: THIS WILL SEND TO EVERYONE THAT HAS AN ATTENDANCE TOTAL LESS THAN 13 FOR THE MONTH, IF YOU WANT TO TEST ANYTHING, CHANGE THE RECIPIENT TO YOUR OWN EMAIL
      //     subject: "WTC Attendance - " + studentUser,
      //     htmlBody: message,
      //   });
      //   addFlagVal(row,flagColumn,flaggingSheet);
      //   revokeList.push(studentUser);
      // }
      if (attendanceTotal < 20) {
        version = "serious";
        var emailAddress = attendanceSheet
          .getRange(row, getColumnNrByName(attendanceSheet, "Email"))
          .getValue();
        var message = MessageChoices(
          attendanceTotal,
          studentFirst,
          month,
          version
        );
        MailApp.sendEmail({
          to: emailAddress, // NB: THIS WILL SEND TO EVERYONE THAT HAS AN ATTENDANCE BETWEEN 14 - 17 DAYS, IF YOU WANT TO TEST ANYTHING, CHANGE THE RECIPIENT TO YOUR OWN EMAIL
          subject: "WTC Attendance - " + studentUser,
          htmlBody: message,
        });
        addFlagVal(row, flagColumn, flaggingSheet);
        warningList.push(studentUser + "\n");
      } else {
        continue;
      }
    }
  }
  var reminderLength = reminderList.length;
  if (reminderLength > 0) {
    MailApp.sendEmail({
      to: "campus-team@wethinkcode.co.za", // NB: THIS WILL SEND AN EMAIL TO CAMPUS TEAM ABOUT EVERYONE WHO HAS BEEN SENT EMAILS OF BEING WARNED, IF YOU WANT TO TEST ANYTHING, CHANGE THE RECIPIENT TO YOUR OWN EMAIL
      cc: "buddy@wethinkcode.co.za",
      subject: "CPT Cohort 2021 Attendance Reminder List - " + month,
      htmlBody: "reminder emails successfully sent to " + reminderList,
    });
  }

  var revokeLength = revokeList.length;
  if (revokeLength > 0) {
    MailApp.sendEmail({
      to: "campus-team@wethinkcode.co.za", // NB: THIS WILL SEND AN EMAIL TO CAMPUS TEAM ABOUT EVERYONE WHO HAS BEEN SENT EMAILS OF BEING WARNED AND HAVING THEIR STIPEND REVOKED, IF YOU WANT TO TEST ANYTHING, CHANGE THE RECIPIENT TO YOUR OWN EMAIL
      cc: "buddy@wethinkcode.co.za",
      subject: "CPT Cohort 2021 Stipend Revoke List - " + month,
      htmlBody: "revoke emails successfully sent to " + revokeList,
    });
    console.log(revokeList);
  }
  var warningLength = warningList.length;
  if (warningLength > 0) {
    MailApp.sendEmail({
      to: "campus-team@wethinkcode.co.za", // NB: THIS WILL SEND AN EMAIL TO CAMPUS TEAM ABOUT EVERYONE WHO HAS BEEN SENT EMAILS OF BEING WARNED, IF YOU WANT TO TEST ANYTHING, CHANGE THE RECIPIENT TO YOUR OWN EMAIL
      cc: "buddy@wethinkcode.co.za",
      subject: "CPT Cohort 2021 Warning List - " + month,
      htmlBody: "soft warning emails successfully sent to " + warningList,
    });
    console.log(warningList);
  }
}
