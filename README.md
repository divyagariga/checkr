## Requirements
node >= 20  <br>
npm >= version  <br>
java <br>
intellij <br>
mysql <br>
vscode <br>

## create database 
 run the db_script.sql in mysql workbench

## How to run the application

# start the React frontend: 
 1.change to frontend directory and hit  <br>
 2. npm install --force <br>
 3. npm start  <br>
 4. navigate to [http://localhost:3001/](http://localhost:3001/) to see the frontend <br>

# start the spring boot backend api's

open all backend folders in intellij as maven projects
1. run the service registry main class then cloud gateway main class <br>
2. then the user microservice main class and the candidate microservice main class <br>
3.open [http://localhost:8761/](http://localhost:8761/) service registry to check if cloud gateway, candidate <br>
microservice and user microservices are up.
4. once all the services are visible <br>

navigate to [http://localhost:3001/](http://localhost:3001/) and check the checkr app flow