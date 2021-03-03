Live view of the app: [![Netlify Status](https://api.netlify.com/api/v1/badges/f9a7f8d3-58ca-44ed-a038-ae8d2efd31a5/deploy-status)](https://app.netlify.com/sites/tcl-19-smart-shopping-list/deploys)

# Overview

## What is this project?

This project was set up by a group of four developers to create a “smart” shopping list app that learns your buying habits and helps you remember what you’re likely to need to buy on your next trip to the store. 

## How does it work?

As a user, you will enter items (e.g., “Greek yogurt” or “Paper towels”) into your list. Each time you buy the item, you mark it as purchased in the list. Over time, the app comes to understand the intervals at which you buy different items. If an item is likely to be due to be bought soon, it rises to the top of the shopping list.

## Check out a video demo of the app here:

[![](https://cdn.zappy.app/33815167c45d74c3ae5af232de633add.png)](https://www.youtube.com/watch?v=mwj74mE9s64&t)

<hr>

# Project setup

## Download Node and NPM

* `npm` is distributed with Node.js which means that when you download Node.js, you automatically get `npm` installed on your computer.
* Follow the [instructions here to install Node.js and `npm`](https://nodejs.org/en/).

## Clone project locally



## Update dependencies

* Once you have the project locally and you are in the project directory, you’ll want to update all the project’s dependencies. To do so, type the following into your terminal: `npm update`
![screenshot of npm update in the terminal](https://cdn.zappy.app/b7619c19e38166329334430335746d3b.png)
* Maybe take a sip of coffee or check in on Twitter, this could take a minute -- don’t worry.


Added firebase and react-firebase-hooks as project dependencies. According to firebase docs and this stackoveflow question, it is not a security risk to expose your firestore configuration details though it includes your API key. It could however be a security risk to store sensitive credentials like API keys for other platforms in a gitHub repository. The best place for them is in the .env file which you then ignore in .gitignore.

react-router-dom

## Access the project in your browser

* After you’ve cloned the project locally and updated the dependencies, you should be able to see the project at `localhost:3000`.
![screenshot of the react project](https://cdn.zappy.app/30d5733fe9abc6d74d3adde2d046c101.png)