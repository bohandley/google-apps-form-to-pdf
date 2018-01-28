# google-apps-scripts
Use Google Apps Scripts to:

1. Create a form linked to a sheet and send an email as

    - access data from a google form
    - access a google doc template 
    - make a copy of the template 
    - edit the copy 
    - send it as a pdf attachment by email.

2. Create a Dependent Dropdown Cell in Google Sheets

    - Access data from a second Google Sheet
    - Loop through a collection of data
    - Create a dropdown cell that is dependent on data from another Dropdown 


## How to Set Up a Google Form to Use the workStatusFormScript.js

1. Create a folder in Google Drive

2. Create a google sheet in the drive.

3. Under the tools option in the Google sheet, create a form for the sheet.

4. Click on the link or click on tools and navigate to 'edit form'.

5. Select 'Settings' from the dropdown menu from creating the form. Choose 'Collect email addresses'. 

6. Create questions for the form.

7. In the form creation, click on responses.

8. Look for the green flag with the plus, click this. This will take you to the google sheet with which the form is associated. If there is no sheet linked to the form, create a new google sheet. This will populate the sheet with headers that correspond with your question values.

9. Navigate to the google sheet linked to the form.

10. Click on 'Tools' in the google sheet.

11. Click on script editor. Enter the script editor page.

12. Change the name of the function to `function onFormSubmit(e){}`. This will change the function displayed in the menu from 'myfunction' to 'onFormSubmit.' This is very important. Changing the name of the function to `onFormSubmit` gives the script authorization to use the function `openById` which is necessary to edit the pdf.

13. Click on Edit in the menu. Click on 'Current Project's triggers' near the bottom of the dropdown menu. A window will pop up.

14. Click on 'No triggers set up. Click here to add one now.'

15. Create new trigger with these options in the three drop down menus:
    - Run 'onFormSubmit'
    - Events 'from spreadsheet' 
    - 'on form submit'

16. Save the trigger.

17. Accept permissions for the script. This allows the script to view the spreadsheet and run code for it.

18. Choose an account for the permissions(your account). Allow for permissions.

19. Copy and paste the code from workStatusFormScript.js. Get ready enter some specific values and variables for your script. 

### How to implement the code in the script

This code describes the following
- getting the template for the pdf by ID
- accessing form values
- copying the template
- editing text in the template with values from the form
- converting the template file to a pdf
- sending the pdf by email 

#### The Template
1. Get a template for your pdf. 

2. Get the id number for the template. The template described below is a To Do List template. Find your own or create one from indtructions (here)[https://www.wikihow.com/Create-a-Template-in-Google-Docs]
    Every google template has a URL. The id number is found in a google docs url.
    https://docs.google.com/document/d/1FQAJ8v0oWv0EM7uHXp18bKPYaClwPVmnUqG2DwO9GzY/edit
    - id = _1FQAJ8v0oWv0EM7uHXp18bKPYaClwPVmnUqG2DwO9GzY_
    
3. Create a variable called documentId and set it equal to the template id.
```
var docTemplate = "1FQAJ8v0oWv0EM7uHXp18bKPYaClwPVmnUqG2DwO9GzY"
```

4.  Create a variable called docName and set it equal to the name of your template.
```
var docName = "name-of-your-template"
```

5. Within the function onFormSubmit(), create the variable email and set it equal to the email address of the person or personsyou would like to email the pdf to. 
```
var email = "bob@greatemail.com, melinda@greateremail.com"
```

#### The Form Values
6. Access the values from the form using `e.values`. This returns an array of values. The value at the 0 position of the array, `e.values[0]`, is the timestamp. When creating the form, if you have chosen to 'Collect email addresses,' the email address of the respondent will be at the 1 position, `e.values[1]`. All other values are listed by the order of how the questions were created.
```
    var date = e.values[0];
    var respondent = e.values[1];
    var firstQuestion = e.values[2];
    var secondQuestion = e.values[3];
    var thirdQuestion = e.values[4];
```

#### Create a Copy of the Template
7. Create a variable called `copyId` and set it equal to `DriveApp.getFileById(docTemplate)`. Notice that the method getFileById() takes the variable `docTemplate` which we assigned in step 3.
```
var copyId = DriveApp.getFileById(docTemplate)
```

8. Chain the method .makeCopy() the the previous code and pass the variable `docName` to .makeCopy().
```
var copyId = DriveApp.getFileById(docTemplate).makeCopy(docName)
```

9. To customize the name of the copy of the template, concatenate a string to docName(add a word in quotes).
```
var copyId = DriveApp.getFileById(docTemplate).makeCopy(docName + "copy")
```

10. Chain .getId() to the functions in step 9. copyId is now equal to the ID of the copy of the template we just made.
```
var copyId = DriveApp.getFileById(docTemplate).makeCopy(docName + "copy").getId();
```

11. Create a variable called `copyDoc` and set it equal to `DocumentApp.openById(copyId)`. This creates an actual copy of the template in the same file in which the original file exists.
```
var copyDoc = var copyDoc = DocumentApp.openById(copyId);
```

#### Edit the Copy of the Template

12. Create a variable called `copyBody` and set it equal to `copyDoc.getActiveSection()`. `copyBody` is now an object, and the text of this object can now be edited.
```
var copyBody = copyDoc.getActiveSection();
```

13. Chain the method replaceText() to copyBody.
```
copyBody.replaceText()
```
Replace text takes two arguments. The first argument is the text to be replaced and second argument is the text that is replacing the original text. We identify the text in our template by snake case starting with the word 'key', i.e., 'keyDate' in the template will be replaced with our variable `date`.

14. Pass the key, 'keyDate',  from the template to the method replaceText() and then pass variable from the form, `date`.
```
copyBody.replaceText('keyDate', date);
```

15. Replace all other text in a similar manner. Choose the key from the template, pass it as the first argument to replaceText, choose the value from the form and pass it as the second argument.

16. Call saveAndClose() on copyDoc to finish editing.
```
copyDoc.saveAndClose();
```

#### Convert the Template Copy to pdf
17. Create a variable called `pdf` and set it equal to `DriveApp.getFileById(copyId)`. Notice that we pass the var `copyId` to the method getFileById().
```
var pdf = DriveApp.getFileById(copyId)
```

18. Chain the method getAs("application/pdf") to the code in step 17. 
```
var pdf = DriveApp.getFileById(copyId).getAs("application/pdf");
```

We now have a pdf of the edited template.

#### Send the Email with the pdf as an Attachment
19. Create a variable called `subject` and set it equal to a string. This will be the subject line for the email. You may also concatenate any variables from the form by adding them to the string, i.e.
```
var subject = 'A form was sent on this date and time' + date;
```

20. Create a variable called `body` and set it equal to a string. 
```
var body = 'This is the body of the email which may contain a variable like the Respondent: " + respondent;
```

21. Pass the variables `subject` and `body` to the MailApp.sendEmail(). 
```
MailApp.sendEmail(subject, body)
```
sendEmail() takes an option to send an attachment. Let's pass in that option.

22. Pass in the option `{attachments: pdf}` to sendEmail().
```
MailApp.sendEmail(subject, body, {attachments: pdf});
```

### Destroy the Copy

23. Get the copied and edited template by passing its ID, `copyId`, to DriveApp.getFileById().
```
DriveApp.getFileById(copyId)
```

24. Chain the method setTrashed() to the code in line 23 and pass the boolean `true` to the function.
```
DriveApp.getFileById(copyId).setTrashed(true);
```
You can now fill out the form, create a pdf and send it as an email. Enjoy!

## Use dependentDropdownCell.js to Create a Dependent Dropdown Menu

1. Select a range of cells.

2. Right click to create validation of values for the dropdown selection of each cell in the range of cells.

3. Choose a range of data from a spread sheet, i.e., `'Your-sheet'!A1:A10`

4. Identify a collection of data in a second spreadsheet associated with the first dropdown menu.

5. Create a collection of arrays with associated data.

6. Loop through the array of arrays and identify where values meet a condition dependent on the first dropdown cell value.

7. Create a collection from all values that meet the previous condition.

8. Use this collection to create a rule for a validation.

9. Create the validation

