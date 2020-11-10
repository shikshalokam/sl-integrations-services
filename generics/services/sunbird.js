/**
 * name : sunbird.js
 * author : Deepa
 * Date : 05-Nov-2020
 * Description : All sunbird service related api calls.
 */

//dependencies
const request = require("request");
let sunbirdServiceBaseURL = process.env.SUNBIRD_APPLICATION_ENDPOINT; 


/**
  * Get keycloak token
  * @function
  * @name getKeycloakToken
  * @returns {Promise} returns a promise.
*/

const getKeycloakToken = function (username, password ) {

    const getKeycloakTokenUrl = `${sunbirdServiceBaseURL}${constants.endpoints.GET_KEYCLOAK_TOKEN}`;

    let options = {
        headers: {
          "content-type": "application/json",
          "internal-access-token": process.env.INTERNAL_ACCESS_TOKEN
        },
        json: {
                "username": username,
                "password": password
            }
    };
    
    return new Promise(async (resolve, reject) => {
        try {
            
            request.post(getKeycloakTokenUrl,options,callback);

            function callback(err,data){
                if( err ) {
                    return resolve({
                        status : httpStatusCode.bad_request.status,
                        message : constants.apiResponses.SUNBIRD_SERVICE_SERVER_DOWN
                    });
                } else {
                    let keycloakToken = data.body;
                    console.log(keycloakToken);
                    return resolve(keycloakToken);
                }
            }

        } catch (error) {
            return reject(error);
        }
    })
}


/**
  * search user
  * @function
  * @name searchUser
  * @returns {JSON} returns response.
*/

const searchUser = function ( token, staffId) {

    const searchUserUrl = `${sunbirdServiceBaseURL}${constants.endpoints.USER_SEARCH}`;

    let options = {
        headers: {
          "content-type": "application/json",
          "X-authenticated-user-token": token,
          "internal-access-token": process.env.INTERNAL_ACCESS_TOKEN
        },
        json: {
               "userName": staffId
              }
    };
    
    return new Promise(async (resolve, reject) => {
        try {
            
            request.post(searchUserUrl,options,callback);

            function callback(err,data){
                if( err ) {
                    return resolve({
                        status : httpStatusCode.bad_request.status,
                        message : constants.apiResponses.SUNBIRD_SERVICE_SERVER_DOWN
                    });
                } else {
                    let userDetails = data.body;
                    return resolve(userDetails);
                }
            }

        } catch (error) {
            return reject(error);
        }
    })
}

module.exports = {
    getKeycloakToken : getKeycloakToken,
    searchUser : searchUser
};