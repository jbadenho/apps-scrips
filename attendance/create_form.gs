function creat_form() {
  var form = FormApp.create("New Form").setCollectEmail(true);
  Logger.log("form: " + form);

  var sheet = SpreadsheetApp.create("New Sheet");
  Logger.log("sheet: " + sheet);

  var form_id = DriveApp.getFileById(form.getId());
  Logger.log("form_id: " + form_id);

  var sheet_id = DriveApp.getFileById(sheet.getId());
  Logger.log("sheet_id: " + sheet_id);
  //folder.createFile(form_id.getBlob());
  //DriveApp.removeFile(form_id);

  var item = form.addCheckboxItem();
  item.setTitle("What condiments would you like on your hot dog?");
  item.setChoices([
    item.createChoice("Ketchup"),
    item.createChoice("Mustard"),
    item.createChoice("Relish"),
  ]);

  form
    .addMultipleChoiceItem()
    .setTitle("Do you prefer cats or dogs?")
    .setChoiceValues(["Cats", "Dogs"])
    .showOtherOption(true);
  form.addPageBreakItem().setTitle("Getting to know you");
  form.addDateItem().setTitle("When were you born?");
  form
    .addGridItem()
    .setTitle("Rate your interests")
    .setRows(["Cars", "Computers", "Celebrities"])
    .setColumns(["Boring", "So-so", "Interesting"]);

  var folder = DriveApp.getFolderById("1ulO6U5bah9VXRDaLZwvwGOxQl2Jn4iFI");
  Logger.log("folder: " + folder);

  Logger.log("Creating Copy of New Form...");
  var form_copy = DriveApp.getFileById(form_id.makeCopy(folder).getId());
  Logger.log("form_copy: " + form_copy);

  Logger.log("Creating Copy of New Sheet...");
  var sheet_copy = DriveApp.getFileById(sheet_id.makeCopy(folder).getId());
  Logger.log("sheet_copy: " + sheet_copy);

  Logger.log("Using Today's Date for Title of Form...");
  var date = Utilities.formatDate(new Date(), "GMT+2", "yyyy/MM/dd");
  Logger.log("date: " + date);

  Logger.log("Renaming Copy of New Form...");
  form_copy.setName(date + "_form");
  Logger.log("form_copy: " + form_copy);

  Logger.log("Renaming Copy of New Form...");
  sheet_copy.setName(date + "_sheet");
  Logger.log("sheet_copy: " + sheet_copy);

  Logger.log("form: " + form);
  Logger.log("Deleting New Form...");
  DriveApp.getFileById(form.getId()).setTrashed(true);

  Logger.log("sheet: " + sheet);
  Logger.log("Deleting New Sheet...");
  DriveApp.getFileById(sheet.getId()).setTrashed(true);

  Logger.log("Setting Form Response Destination...");

  var form_copy_destination = FormApp.openById(form_copy.getId());
  form_copy_destination.setDestination(
    FormApp.DestinationType.SPREADSHEET,
    sheet_copy.getId()
  );

  //form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());

  Logger.log("Published URL: " + form_copy.getUrl());

  //Logger.log("Creating Response for Form_Copy...");
  //var form_copy_id = FormApp.openById(form_copy.getId());
  //var form_copy_response = form_copy_id.createResponse();
  //form_copy_response.submit();

  //form.createResponse();
  //form_copy.setName("Attendance")
  //Logger.log('Published URL: ' + form.getPublishedUrl());
  //Logger.log('Editor URL: ' + form.getEditUrl());
}
