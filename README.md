# budget-tracker-pwa

Budget Tracker Progressive Web App - 

The user can add expenses and deposits to their budget with or without a connection. When entering transactions offline, the total will be populated when brought back online.

Deployed to Heroku: https://budget-progressive-web-app.herokuapp.com/


## User Story

> AS AN avid traveller <br />
> I WANT to be able to track my withdrawals and deposits with or without a data/internet connection <br />
> SO THAT my account balance is accurate when I am traveling


## Features

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

* [Chart.js](https://www.chartjs.org/)
* [Bootstrap](https://getbootstrap.com/)
* HTML
* JavaScript

### Backend

* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [MongoDB](https://www.mongodb.com/) - primary database
* [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) - offline database
* [Webpack](https://webpack.js.org/)



## License

[MIT License](https://choosealicense.com/licenses/mit/)

Copyright (c) 2020 Courtney J. Seto

