/**
 * name : samiksha.js
 * author : Aman
 * Date : 24-Mar-2020
 * Description : All samiksha service related api calls.
 */

//dependencies
//let urlPrefix = process.env.APPLICATION_BASE_HOST + process.env.SAMIKSHA_BASE_URL + process.env.URL_PREFIX; 
let urlPrefix = process.env.APPLICATION_BASE_HOST + process.env.SAMIKSHA_BASE_URL + process.env.URL_PREFIX; 
const request = require("request");

/**
  * Update entity data
  * @function
  * @name updateEntity
  * @returns {Promise} returns a promise.
*/

const updateEntity = function ( data ) {

    const updateEntityUrl = `${urlPrefix}${constants.endpoints.ENTITY_UPDATE}/${data.entityId}?type=${data.entityType}`;

    let options = {
        headers: {
          "content-type": "application/json",
          "internal-access-token": process.env.INTERNAL_ACCESS_TOKEN
        },
        json: data.metaInformation
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
  * @returns {Promise} returns a promise.
*/

const createEntity = function (entityType, data ) {

    const createEntityUrl = `${urlPrefix}${constants.endpoints.ENTITY_CREATE}?type=${entityType}`;

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

module.exports = {
    updateEntity : updateEntity,
    createEntity : createEntity
};