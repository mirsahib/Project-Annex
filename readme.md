## System Description

This application will generate visual representation of semester wise student enrollment, and categorize it by the school and majors. It will have options to compare results with others semesters from previous semesters and give us a numeric comparison, which will help the university officials to make decisions.
The application will collect data given by the University. Adding the data in our application will add all the students in our database. By sorting and categorizing the students we can generate statistical data with any other activity.

## How to run this project in your local computer

**Step:1**
install node js
[For Window User]https://nodejs.org/en/download/

For Linux user ---> go to terminal

```
sudo apt update
sudo apt install nodejs
sudo apt install npm
```

Step:2
Download the repository (green right button of the repository)
or else if you have bash terminal

`git clone https://github.com/mirsahib/Project-Annex.git`

Step:4
Optional:(for linux user bash terminal)

```
cd Download
```

Step:5
open you cmd or bash terminal navigate to the repository directory then run

`npm install`

Step:6
run the project(in nodemon)

`npm run test`

## If you want to make any change to this project

To change the code
go to public/js folder

make change **admin.js**,**login.js**,**operator.js** file (most of the code are written there)

To change the design
go to public/css folder to change the frontend design
or public/img to make change to login page (**login_cover.jpg** very important)

## Issues

1. User authentication is not done
2. database update after each new entry from the data entry operator is not done
3. Data operator entry is not connected with the database (make change to **routers/operator.js** file)

**NB: This project was build on tight schedule so i apologies for my untidy code,In the future i will add comment and refactor this project**

#### Day 1 fix
[Sql query added:](https://github.com/mirsahib/Project-Annex/blob/master/sql_query.txt)
