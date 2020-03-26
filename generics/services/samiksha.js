/**
 * name : samiksha.js
 * author : Aman
 * Date : 24-Mar-2020
 * Description : All samiksha service related api call.
 */

//dependencies

let urlPrefix = 
process.env.APPLICATION_BASE_HOST + 
process.env.SAMIKSHA_BASE_URL +
process.env.URL_PREFIX; 

const request = require("request");

/**
  * Get platform user roles
  * @function
  * @name updateEntity
  * @returns {Promise} returns a promise.
*/

var updateEntity = function ( data ) {

    const updateEntityUrl = 
    `${urlPrefix}${constants.endpoints.ENTITY_UPDATE}/${data.entityId}?type=${data.entityType}`;

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
  * Get platform user roles
  * @function
  * @name userUpdate
  * @returns {Promise} returns a promise.
*/

var userUpdate = function ( userId,data ) {

    const updateUserUrl = 
    `${urlPrefix}${constants.endpoints.USER_UPDATE}/${userId}`;

    let options = {
        headers: {
          "content-type": "application/json",
          "internal-access-token": process.env.INTERNAL_ACCESS_TOKEN
        },
        json: data
    };
    
    return new Promise(async (resolve, reject) => {
        try {
            
            request.post(updateUserUrl,options,callback);

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

module.exports = {
    updateEntity : updateEntity,
    userUpdate : userUpdate
};