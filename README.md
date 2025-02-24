## Project Description- Checkr
 The goal of this project is to develop a comprehensive and efficient background check
 application designed to automate and streamline the process of conducting background
 checks for individuals. This application will be primarily used by employers and other
 entities that require detailed information on individuals for security, employment.
## About Checkr application:
 The Checkr application process begins when a user initiates a background check by
 submitting the applicant’s details. Checkr then collects data from multiple sources,
 including court records, to verify the applicant's history. Once the data is gathered,
 Checkr compiles it into a detailed report that is accessible through the candidate details
 page. If the report reveals any issues like if the candidate has CONSIDER status
 instead of CLEAR, a pre-adverse action notice shoud be sent to the applicant, informing
 them of the findings and their right to dispute any inaccuracies. This ensures
 transparency and compliance with legal standards before any final adverse action is
 taken.
## Report.pdf [https://github.com/divyagariga/checkr/blob/main/report.pdf]
## create database 
 run the db_script.sql in mysql workbench

## How to run the application

# start the React frontend: 
 1.change to frontend directory and hit  <br>
 2. npm install --force <br>
 3. npm start  <br>
 4. navigate to [http://localhost:3001/](http://localhost:3001/) to see the frontend <br>

# start the spring boot backend api's
<B> (backend api's are protected through JWT authentication so we cant access them directly without bearer token ) <br>
open all backend folders in intellij as maven projects
1. run the service registry main class then cloud gateway main class <br>
2. then the user microservice main class and the candidate microservice main class <br>
3.open [http://localhost:8761/](http://localhost:8761/) service registry to check if cloud gateway, candidate <br>
microservice and user microservices are up.
4. once all the services are visible <br>

navigate to [http://localhost:3001/](http://localhost:3001/) and check the checkr app flow
