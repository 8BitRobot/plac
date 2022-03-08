## Overview
Plac is a web application that allows users to submit and view crowd-sourced reviews on programming languages and libraries. By gathering reviews from programmers accredited with a specific language (as evidenced by their GitHub activity), Plac helps beginners and new developers figure out which modules are best suited to their new project.

## User Features:
1. Github Authentication - Users will be able to log into the website with GitHub’s own secure sign-on protocols and contribute to the Plac libararies.

2. Reviewer Reputations -  Using the GitHub API and a user’s repository history, Plac will compute a user’s “reputation” score (like StackOverflow does) with the languages they’ve worked on in order to provide visitors with the context they need behind a person’s review. 

3. Meaningfully searching through server-side data - Users will be able to search through Plac's Libraries by using the search-bar at the top of the site.

4. Uploading data from client to backend -  Obviously, there’s no review system without reviews from its users. Plac will therefore allow users to submit reviews of a given library and, in addition to a general text form wherein the user can submit overall thoughts, Plac will provide additional fields and forms for more specific questions to help visitors filter and sort the different reviews.

## Install Dependencies:

#### Install [Node](https://nodejs.org/en/download/)

#### Install [MongoDB](https://docs.mongodb.com/manual/installation/#:~:text=MongoDB%20Installation%20Tutorials%20¶%20%20%20%20Platform,%20%20Install%20MongoDB%20Enterprise%20with%20Docker%20)

## Starting the Application
To start the project, first clone the github repository using the command:
```
git clone https://github.com/8BitRobot/plac.git
cd plac
```

## To Start the Frontend (React):
```
cd frontend
npm install
npm start
```
## To Start the Backend (Node and MongoDB):
Create a file `backend/githubsso.json` and put your github `clientID` and `clientSecret` inside in JSON format. Explanations for `clientID` and `clientSecret` can be found [here](https://docs.github.com/en/rest/guides/basics-of-authentication).

An example is 
```
{
"clientId" : "[this is the clientID]"
"clientSecret: "[this is the clientSecret]"
}
```

Afterwards, simply run
```
cd backend
npm install
npm start
```
## Run Backend Shell Scripts:

1. Populate the database with a list of programming languages: `backend/dblanguages.sh`

2. Populate the database with a list of reviews for the existing languages: `backend/dbpopulate.sh`

3. If you want to clear all of the populated reviews and languages that were loaded: `backend/dbclear.sh`
