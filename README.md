# budget-tracker-pwa

Budget Tracker Progressive Web App - 

The user can add expenses and deposits to their budget with or without a connection. When entering transactions offline, the total will be populated when brought back online.

Deployed to Heroku: https://budget-progressive-web-app.herokuapp.com/


## User Story

> AS AN avid traveller <br />
> I WANT to be able to track my withdrawals and deposits with or without a data/internet connection <br />
> SO THAT my account balance is accurate when I am traveling


## Functionality

### Offline

  * Enter deposits
  * Enter expenses
  * Entries are stored in local indexedDB

### Online

  * Enter deposits
  * Enter expenses
  * Entries are stored to MongoDB database
  * Offline entries are added to tracker database


## Technologies

### FrontEnd

* Chart.js
* Bootstrap CSS Framework
* HTML
* JavaScript

### Backend

* Node.js
* Express
* MongoDB - primary database
* IndexedDB - offline database
* Webpack



## License

[MIT License](https://choosealicense.com/licenses/mit/)

Copyright (c) 2020 Courtney J. Seto

