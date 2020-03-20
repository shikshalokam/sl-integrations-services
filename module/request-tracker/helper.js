/**
 * name : request-tracker/helper.js
 * author : Aman
 * created-date : 20-03-2020
 * Description : Request tracker helper functions.
 */

/**
    * RequestTrackerHelper
    * @class
*/

module.exports = class RequestTrackerHelper {

      /**
      * create request tracker document.
      * @method
      * @name create
      * @param {Object} data - All requested data.
      * @returns {Promise} returns a promise.
     */

    static create(data) {
        return new Promise(async (resolve, reject) => {
            try {
                
                let requestTrackerCreation = 
                await database.models.requestTracker.create(data);

                return resolve(requestTrackerCreation.metaInformation);

            } catch (error) {
                return reject(error);
            }
        })


    }

}
