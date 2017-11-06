import * as reqMethods from '../../../server/request-helper';
import requestPromise from 'request-promise';
jest.mock('request-promise');

requestPromise.get.mockImplementation(() => 'mocked');

describe('server/request-helper', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });
    
    describe('requestPromiseGet', () => {
        it('should make a get request with the given object', () => {
            // Arrange
            const request = { foo: 'bar' };
            
            // Act
            reqMethods.requestPromiseGet(request);
            
            // Assert
            expect(requestPromise.get).toHaveBeenCalledWith(request);
        });
    });
    
    describe('buildRequest', () => {
        it('should return the expected request object with given uri', () => {
            // Arrange
            const uri = 'foo://bar/baz';
            const expected = {
                uri,
                json: true
            };
            
            // Act
            const actual = reqMethods.buildRequest(uri);
            
            // Arrange
            expect(actual).toEqual(expected);
        });
    });
    
    describe('getData', () => {
        it('should call buildRequest and then requestPromiseGet and return the response data', (done) => {
           // Arrange
           const uri = 'foo://bar/baz';
           reqMethods.buildRequest = jest.fn(() => {foo: 'bar'});
           reqMethods.requestPromiseGet = jest.fn(() => Promise.resolve({bar: 'baz'}));
           const expected = {bar: 'baz'};
           
           // Act
           reqMethods.getData(uri)
            .then(actual => {
                // Assert
                expect(reqMethods.buildRequest).toHaveBeenCalled();
                expect(reqMethods.requestPromiseGet).toHaveBeenCalled();
                expect(actual).toEqual(expected);
                done();
            })
            .catch(err => {
                done(new Error(err));
            });
        });
        
        it('Should handled the rejected requestPromiseGet response', () => {
            // Arrange
            const uri = 'foo://bar/baz';
            reqMethods.buildRequest = jest.fn(() => {foo: 'bar'});
            reqMethods.requestPromiseGet = jest.fn(() => Promise.reject('Promise Rejected Error'));
            const expectedError = {
                err: 'Promise Rejected Error',
                message: 'Failed on requestPromiseGet call for the uri' + uri
            }
           
           // Act
           reqMethods.getData(uri)
            .then(actual => {
                // Assert
                done(new Error('Should handle a rejected response'));
            })
            .catch(err => {
                try {
                    expect(err).toEqual(expectedError);
                    done();
                }
                catch (e) {
                    done(new Error(e));
                }
            });
        });
    });
});