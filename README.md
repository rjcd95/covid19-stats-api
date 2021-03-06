# Covid-19 Stats Information

This is an API created with NodeJs + Express + MongoDb that provide stats information about covid19 in al countries.

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
### Settings

Create a .env file for dev and test enviroment and based on .env.example file, add your owns settings

```sh
touch env.dev
touch env.test
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
