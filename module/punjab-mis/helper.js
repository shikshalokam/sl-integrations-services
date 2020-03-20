/**
 * name : punjab-mis/helper.js
 * author : Aman
 * created-date : 20-03-2020
 * Description : Punjab mis helper functions.
 */

/**
    * PunjabMISHelper
    * @class
*/

let requestTrackerHelper = require(MODULES_BASE_PATH+"/request-tracker/helper");

module.exports = class PunjabMISHelper {

      /**
      * Update entity data.
      * @method
      * @name entityUpdate
      * @param {Object} requestedData - All requested data.
      * @returns {Promise} returns a promise.
     */

    static entityUpdate(requestedData) {
        return new Promise(async (resolve, reject) => {
            try {

                let entityTrackerDocument = 
                await requestTrackerCreation(requestedData);

                return resolve({
                    message : constants.common.UPDATED_ENTITY,
                    result : entityTrackerDocument
                });

            } catch (error) {
                return reject(error);
            }
        })


    }

     /**
      * Update user data.
      * @method
      * @name userUpdate
      * @param {Object} requestedData - All requested data.
      * @returns {Promise} returns a promise.
     */

    static userUpdate(requestedData) {
        return new Promise(async (resolve, reject) => {
            try {

                let userTrackerDocument = 
                await requestTrackerCreation(requestedData);

                return resolve({
                    message : constants.common.UPDATED_USER,
                    result : userTrackerDocument
                });

            } catch (error) {
                return reject(error);
            }
        })


    }

}

/**
 * Create request tracker data.
 * @method
 * @name requestTrackerCreation
 * @param {Object} data - Logged in user data.
 * @returns {Object} request tracker data.
*/

function requestTrackerCreation(data) {
    return new Promise(async (resolve,reject)=>{
        try{
            
            let entityTracker = {
                method : data.method,
                headers : {
                    appname : data.headers.appname,
                    appType : data.headers.appType,
                },
                url : data.url,
                body : data.body
            }

            let requestTrackerDocument = 
            await requestTrackerHelper.create(
                {
                    userId : data.userDetails.userId,
                    metaInformation : entityTracker
                }
            );

            return resolve(requestTrackerDocument);

        } catch(error){
            return reject(error);
        }
    })

}
