var docTemplate = "your-template-id-here";
var docName = "Work Status";

function onFormSubmit(e) {
  
  var email = "who-will-you-send-it-to@mail.com";
  
  // Get the values from the form. e.values returns an array
  var date = e.values[0];
  var respondent = e.values[1];
  var job_transfer_status = e.values[2];
  var foreman = e.values[3];
  var available_to_work = e.values[4];
  
  // e.namedValues returns an object that contains keys and values for the form
  // var objectFormValues = e.namedValues;
  
  // Create a copy of the template on line 1, with a new name, and get the copy's ID
  var copyId = DriveApp.getFileById(docTemplate).makeCopy(docName + ' for HardtElectric').getId();
  
  // Open the copy of the template using the copy's ID
  var copyDoc = DocumentApp.openById(copyId);  

  // Get access to the body of the template to access text
  var copyBody = copyDoc.getActiveSection();
    
  // Replace certain text in the body of the template copy using the variables from the form
  // Edit the template copy with data from the form
  copyBody.replaceText('keyDate', date);
  copyBody.replaceText('keyJobTransferStatus', job_transfer_status);
  copyBody.replaceText('keyForeman', foreman);
  copyBody.replaceText('keyAvailableToWork', available_to_work);
  copyBody.replaceText('keyRespondent', respondent);  

  // Save and close the edited copy of the template
  copyDoc.saveAndClose();
  
  // Create a pdf of the edited copy of the template
  var pdf = DriveApp.getFileById(copyId).getAs("application/pdf");
  
  // Create the subject for the email using the respondent of the form
  var subject = 'Job Status Tracker for ' + respondent;
  // Create the body of the email using the respondent and date values from the form
  var body = 'Work Status for ' + respondent + ' submitted on ' + date;
  // Send the email to the designated person or persons from line 6, with the subject, body and pdf(attached)
  MailApp.sendEmail(email, subject, body,{attachments: pdf});
  
  // Delete the copy of the template edited with the form date. The copy now lives on as a pdf sent via email
  DriveApp.getFileById(copyId).setTrashed(true);
}
