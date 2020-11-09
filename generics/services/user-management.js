/**
 * name : user-management.js
 * author : Deepa
 * Date : 05-Nov-2020
 * Description : All user management service related api calls.
 */

//dependencies
let userManagementServiceBaseURL = process.env.USER_MANAGEMENT_APPLICATION_ENDPOINT; 
const request = require("request");


/**
  * Create user
  * @function
  * @name createUser
  * @returns {Promise} returns a promise.
*/

const createUser = function (data) {

    const createUserUrl = `${userManagementServiceBaseURL}${constants.endpoints.USER_CREATE}`;

    let options = {
        headers: {
          "content-type": "application/json",
          "internal-access-token": process.env.INTERNAL_ACCESS_TOKEN
        },
        json: data
    };
    
    return new Promise(async (resolve, reject) => {
        try {
            
            request.post(createUserUrl,options,callback);

            function callback(err,data){
                if( err ) {
                    return resolve({
                        status : httpStatusCode.bad_request.status,
                        message : 
                        constants.apiResponses.SAMIKSHA_SERVICE_SERVER_DOWN
                    });
                } else {
                    let  userCreate = data.body;
                    return resolve(userCreate);
                }
            }

        } catch (error) {
            return reject(error);
        }
    })
}


module.exports = {
    createUser : createUser
};