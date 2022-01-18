# Box Demo Frontend

A small react project that allows users access a portal and upload documents into a Box folder as if they were applying for a loan.

Loan officers or administrators can then access the same portal (via an admin URL) to view the uploaded documents.

Created using create-react-app. Styling done primarily with Chakra-ui.

## Running the project

Ensure that you are running the flask webserver from this project: https://github.com/Avishek-Paul/box-demo-backend/tree/main

Run the following commands:

`npm start`

# Navigating the project

By default the app will be available at http://localhost:3000

Navigating to this page will allow you to view the main page. This is what an end user would see when visiting the page. They can upload documents here.
![image](https://user-images.githubusercontent.com/29755490/149863762-ed4959f3-1e32-4217-886f-6f21d0433817.png)


For administrators, they can navigate to http://localhost:3000/admin

This page is where they will be able to see a unique folder per loan applicant (named with a uuid). They can click into each folder and view the individual files.
![image](https://user-images.githubusercontent.com/29755490/149863813-1f130271-8617-4442-a0e4-646138a663aa.png)
