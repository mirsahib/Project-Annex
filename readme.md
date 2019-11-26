## how to run this project in you local computer

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

go to public/js folder

make change **admin.js**,**login.js**,**operator.js** file (most of the code are written there)

## Issues

    1. User authentication is not done
    2. database update after each new entry from the data entry operator is not done
    3. Data operator entry is not connected with the database (make change to routers/operator.js file)
