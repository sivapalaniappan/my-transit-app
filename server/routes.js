import findNextDepartureTime from './departure-time-processor';

export default function apiRoutes(app) {
  app.get('/api/getNextBusTime', (req, res) => {
    const { query = {} } = req;
    const {
      route = '',
      stop = '',
      direction = ''
    } = query;

    if(!route || !stop || !direction) {
      return res.json('Bad Request. Please provide all Mandatory information');
    }

    findNextDepartureTime(route, stop, direction)
      .then(data => res.json(data))
      .catch(error => {
        console.log('comeing to this catch block')
        res.json(error)
      });
  });
}
