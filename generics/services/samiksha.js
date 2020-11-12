/**
 * name : samiksha.js
 * author : Aman
 * Date : 24-Mar-2020
 * Description : All samiksha service related api calls.
 */

//dependencies
const request = require("request");
let samikshaServiceBaseURL = process.env.SAMIKSHA_APPLICATION_ENDPOINT;


/**
  * Update entity data
  * @function
  * @name updateEntity
  * @returns {Json} returns updated entity data.
*/

const updateEntity = function ( entityId, data ) {

    const updateEntityUrl = `${samikshaServiceBaseURL}${constants.endpoints.ENTITY_UPDATE}/${entityId}?type=""`;

    let options = {
        headers: {
          "content-type": "application/json",
          "internal-access-token": process.env.INTERNAL_ACCESS_TOKEN
        },
        json: data
    };
    
    return new Promise(async (resolve, reject) => {
        try {
            
            request.post(updateEntityUrl,options,callback);

            function callback(err,data){
                if( err ) {
                    return resolve({
                        status : httpStatusCode.bad_request.status,
                        message : 
                        constants.apiResponses.SAMIKSHA_SERVICE_SERVER_DOWN
                    });
                } else {
                    let entityUpdate = data.body;
                    return resolve(entityUpdate);
                }
            }

        } catch (error) {
            return reject(error);
        }
    })
}


/**
  * Create entity 
  * @function
  * @name createEntity
  * @returns {Json} returns created entity data.
*/

const createEntity = function (entityType, data ) {

    const createEntityUrl = `${samikshaServiceBaseURL}${constants.endpoints.ENTITY_CREATE}?type=${entityType}`;

    let options = {
        headers: {
          "content-type": "application/json",
          "internal-access-token": process.env.INTERNAL_ACCESS_TOKEN
        },
        json: { data : data }
    };
    
    return new Promise(async (resolve, reject) => {
        try {
            
            request.post(createEntityUrl,options,callback);

            function callback(err,data){
                if( err ) {
                    return resolve({
                        status : httpStatusCode.bad_request.status,
                        message : 
                        constants.apiResponses.SAMIKSHA_SERVICE_SERVER_DOWN
                    });
                } else {
                    let entityCreate = data.body;
                    return resolve(entityCreate);
                }
            }

        } catch (error) {
            return reject(error);
        }
    })
}


/**
  * Get observation status
  * @function
  * @name getObservationStatus
  * @returns {Promise} returns a promise.
*/

const getObservationStatus = function (userId, solutionExternalId, entityId) {

    const getObservationStatusUrl = `${samikshaServiceBaseURL}${constants.endpoints.GET_OBSERVATION_STATUS}${solutionExternalId}?userId=${userId}&entityId=${entityId}`;

    let options = {
        headers: {
          "content-type": "application/json",
          "internal-access-token": process.env.INTERNAL_ACCESS_TOKEN
        }
    };
    
    return new Promise(async (resolve, reject) => {
        try {
            
            request.get(getObservationStatusUrl,options,callback);

            function callback(err,data){
                if( err ) {
                    return resolve({
                        status : httpStatusCode.bad_request.status,
                        message : 
                        constants.apiResponses.SAMIKSHA_SERVICE_SERVER_DOWN
                    });
                } else {
                    let observationStatus = data.body;
                    return resolve(JSON.parse(observationStatus));
                }
            }

        } catch (error) {
            return reject(error);
        }
    })

}


module.exports = {
    updateEntity : updateEntity,
    createEntity : createEntity,
    getObservationStatus : getObservationStatus
};