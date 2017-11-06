# Transit Tracking Application
A Simple application to get the duration for next bus for a specified route, stop and direction

## Demo
A Live Demo of the application can be seen here https://infinite-beach-72496.herokuapp.com/

## Tech Stack

Front-end is built using React. Backend is built using Express (Node). Babel/Webpack is used for transpiling and bundling the client application.

### Installing Packages
* `npm install`

### Building application
* `npm run build`

### Running Application
* `npm start`

Vist "localhost:8080" in browser to view the application

### Using The API

#### API Endpoint
The following endpoints are available:

| Endpoints       | Usage          | Params         |
|-----------------|----------------|----------------|
| `GET /api/getNextBusTime?route=Uptown&stop=knollwood&direction=east` | Get the next trip departure time for the route at the mentioned stop |


### Testing Application
* `npm run test`
Note: jest-cli needs may need to installed globally in some machines. (npm install -g jest-cli)

### Development Environment

This application is developed in the below Environment

node - v6.11.1
npm - v5.5.1
