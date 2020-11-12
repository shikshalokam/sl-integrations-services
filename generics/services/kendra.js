/**
 * name : kendra.js
 * author : Deepa
 * Date : 05-Nov-2020
 * Description : All kendra service related api calls.
 */

//dependencies
const request = require("request");
let kendraServiceBaseURL = process.env.KENDRA_APPLICATION_ENDPOINT; 


/**
  * Update user data
  * @function
  * @name updateUser
  * @returns {Promise} returns a promise.
*/

const updateUser = function (userId, data ) {

    const updateUserUrl = `${kendraServiceBaseURL}${constants.endpoints.USER_UPDATE}/${userId}`;

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
                        constants.apiResponses.KENDRA_SERVICE_SERVER_DOWN
                    });
                } else {
                    let userUpdate = data.body;
                    return resolve(userUpdate);
                }
            }

        } catch (error) {
            return reject(error);
        }
    })
}


module.exports = {
    updateUser : updateUser
};