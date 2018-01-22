# google-apps-form-to-pdf
This script is used to access google apps form data with a google business account. The script allows you to:

- access a google doc template 
- make a copy of the template 
- edit the copy 
- send it as an email to selected people.

## How to use the script

1. Create a folder in Google Drive

2. Create a google sheet in the drive.

3. Under the tools option in the Google sheet,
    create a form for the sheet.

4. Click on the link or 
    click on tools and navigate to 'edit form'

5. Create questions for the form.

5. In the form creation, click on responses.

6. Look for the green flag with the plus, click this and link the form to a google sheet or create a new google sheet.

7. Navigate to the google sheet.

8. Click on Tools in the google sheet.

9. Click on script editor. Enter the script editor page

10. Click on Edit. look down to Current Project's triggers.

11. Click on  'No triggers set up. Click here to add one now.'

12. Create new trigger with these options in the three drop down menus:
    Run 'name-of-your-function'
    Events 'from spreadsheet' 
    'on form submit'

13. Save the trigger.

14. Accept permissions for the script. This allows the script to view the spreadsheet and run code for it.

15. Choosing an account for the permissions(your account). Allow for permissions.

16. Begin typing your code that will run when the form is submitted.

CODE FOR FORM SUBMIT

This code describes the following
-accessing form values
-creating a pdf with these values
-sending the pdf by email 

1. Get a template for your pdf. 

2. Git the id number for the template.
    Every google template has a URL. The id number is italicized in the url below.
    https://docs.google.com/document/d/*1xDRqPZEe_T2Z7GrGPmC3eFGo50UfFV_vXkfYwiiHqJ4*/edit

3. Create a variable called documentId and set it equal to the template id.

    documentId = "1xDRqPZEe_T2Z7GrGPmC3eFGo50UfFV_vXkfYwiiHqJ4"
