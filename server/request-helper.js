import requestPromise from 'request-promise';

export function requestPromiseGet(request) {
    return requestPromise.get(request);
}

export function buildRequest(uri) {
    const request = {
        uri,
        json: true
    };

    return request;
}

export function getData(uri) {
    const request = exports.buildRequest(uri);

    return exports.requestPromiseGet(request)
        .then(data => Promise.resolve(data))
        .catch(err => {
          const response = {
            err,
            message: 'Failed on requestPromiseGet call for the uri' + uri
          };
          
          Promise.reject(response);
        });
}
