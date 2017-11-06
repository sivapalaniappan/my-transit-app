# Transit Tracking Application
A Simple application to get the duration for next bus for a specified route, stop and direction

## Demo
A Live Demo of the application can 

# API Server

To install and start the API server, run the following commands in this directory:
* `npm install`

* `npm build`
* `npm start`
* `npm test`

## Using The API

### API Endpoint

The following endpoints are available:

| Endpoints       | Usage          | Params         |
|-----------------|----------------|----------------|
| `GET /api/getNextBusTime?route=Uptown&stop=knollwood&direction=east` | Get the next trip departure time for the route at the mentioned stop |
