const timestamp = require('unix-timestamp');
import moment from 'moment';
import getData from './request-helper';
import _ from 'lodash';

export default function findNextDepartureTime (routeName, stopName, directionName) {

  return exports.getRouteId(routeName)
    .then(routeId => {

      if(!routeId) {
        return 'Route Name Not Found';
      }

      return exports.getDirectionId(routeId, directionName)
        .then(directionId => {

          if(!directionId) {
            return 'This Bus Route Does not operate on the given direction';
          }

          return exports.getStopId(routeId, directionId, stopName)
            .then(stopId => {

              if(!stopId) {
                return 'This is not a valid stop for this bud route';
              }

              const tripInformation = {
                routeId,
                directionId,
                stopId
              };

              return exports.getStopTripSchedules(tripInformation)
                .then(stopTripSchedule => {

                  if(!stopTripSchedule || stopTripSchedule.length === 0) {
                    return 'No More trips on this route for today';
                  }

                  return exports.calculateDepartureTime(stopTripSchedule);
                });
            });
        });
    });
}

export function getRouteId (reqRoute) {
  const requestUri = 'http://svc.metrotransit.org/NexTrip/Routes';

  return getData(requestUri)
      .then(res => {

          const selectedRoute = findFromResponse(res, 'Description', reqRoute)[0]; // Assuming
          if(!selectedRoute) {
            return false;
          }

          return selectedRoute.Route;
      });
}

export function getDirectionId (routeId, reqDirection) {
    const requestUri = `http://svc.metrotransit.org/NexTrip/Directions/${routeId}`;

    return getData(requestUri)
        .then(res => {

            const selectedDirection = findFromResponse(res, 'Text', reqDirection)[0];
            if(!selectedDirection) {
              return false;
            }

            return selectedDirection.Value;
        });
}

export function getStopId (routeId, directionId, reqStop) {
    const requestUri = `http://svc.metrotransit.org/NexTrip/Stops/${routeId}/${directionId}`;

    return getData(requestUri)
        .then(res => {
            const selectedStop = findFromResponse(res, 'Text', reqStop)[0];

            if(!selectedStop) {
              return false;
            }

            return selectedStop.Value;
        });
}

function findFromResponse (collection, searchKey, searchValue) {
    return _.filter( collection, (item) => {
        return _.includes(item[searchKey].toLowerCase(), searchValue.toLowerCase());
    });
}

export function getStopTripSchedules (tripInformation) {
    const requestUri = `http://svc.metrotransit.org/NexTrip/${tripInformation.routeId}/${tripInformation.directionId}/${tripInformation.stopId}`;

    return getData(requestUri)
        .then(stopTripSchedule => stopTripSchedule);
}

export function calculateDepartureTime (stopDepartureInformation) {
    let timeToNextBus;

    const convertedStopDetails = stopDepartureInformation.map(stopDeparture => {
        if(stopDeparture && stopDeparture.DepartureTime) {
            stopDeparture.DepartureTimeMs = parseInt(_.trim(stopDepartureInformation[0].DepartureTime, '/Date()').split('-')[0]);
            return stopDeparture;
        }
    });

    const sortedStopDetails = _.sortBy(convertedStopDetails, ['DepartureTimeMs']);

    const duration = new Date(sortedStopDetails[0].DepartureTimeMs) - new Date();

    timeToNextBus = Math.floor(moment.duration(duration).asMinutes()) + ' Minutes';

    return timeToNextBus;
}
