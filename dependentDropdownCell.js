// To get the script to run onEdit, admin must set up a trigger to run onEdit and give permission to the sheet
function onEdit() { 
  
  // Get the spreadsheet that is being interacted with
  var ss = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // This spreadsheet has the data for the dropdpown 
  var sheetName = 'name-of-sheet'
  var customerContactsSS = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName); 
  
  // Get the cell in the interacted with spreadsheet that is actually being interacted with
  var activeCell = ss.getActiveCell();
  
  // Get the value in that cell
  var activeCellValue = activeCell.getValue();
  
  // Get the row of the interacted cell
  var activeRow = ss.getActiveCell().getRow();

  // Get the colum of the interacted cell
  var activeColumn = ss.getActiveCell().getColumn();
  
  // Get the column of the thing you want changed when the interacted cell is changed
  // i.e, this is the column where it will say each companies contacts.
  var contactsColumn = activeColumn + 1

  // Create an array to store contacts for a company
  var contacts = [];
  
  // Only act if certain cells are interacted with, within a given range
  if(ss.getActiveCell().getColumn() == 3 && ss.getActiveCell().getRow() > 3){
    
    // Get the companies and contacts from the spreadsheet, 'Customer Contacts' spread sheet
    var customerContactsDataValues = customerContactsSS.getRange(4, 1, customerContactsSS.getLastRow(), 2).getValues();

    // Loop throught the array of arrays from
    for (var i = 0; i < customerContactsDataValues.length; i++) {
      var contactsRow = "";
      for (var j = 0; j < customerContactsDataValues[i].length; j++) {     
        if ( customerContactsDataValues[i][j] == activeCellValue ) {
          // Get the contacts and push them into the contacts array from line 37
          contactsRow = customerContactsDataValues[i][j-1]; // get the row to place the contacts
          contacts.push(contactsRow);
        }
      }
    }
    // Create a new rule for a validation, providing data from the collection of contacts
    var rangeRule = SpreadsheetApp.newDataValidation().requireValueInList(contacts);

    // Set the validation for a specific cell using the new rule
    ss.getRange(activeRow, contactsColumn).setDataValidation(rangeRule); 
  }
  
}
