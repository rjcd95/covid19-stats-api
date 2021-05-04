# Covid-19 Stats Information

This is an React application that implement NodeJS API to show covid-19 statistics by country. 

## Features
- Implement [Covid19 RapidApi](https://rapidapi.com/api-sports/api/covid-193) to get data
- Auth:
  - Login
  - Register
  - JWT
  - Refresh Token
- Stats Information:
  - List all
  - Implement Pagination
  - Filter by search text (country name)
  - Sort by column name and order ASC/DESC
  - Sync stats from api
- Stat information by country
  - Show current statistic of selected country.
  - Allow update information (new cases, critical cases, recovered cases, new deaths, new tests)

### Installation

Access to directory

```sh
$ cd covid19-stats-api
```

Install the dependencies

```sh
$ npm install
```

### Serve

To serve in the browser

```sh
$ npm run start
```

To run tests

```sh
$ npm run test
```
