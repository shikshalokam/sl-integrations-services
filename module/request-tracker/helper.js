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
      * List of request tracker document.
      * @method
      * @name list
      * @param {Object} [ findQuery = "all" ] - request tracker find query
      * @param {Array} [ fields = "all" ] - request tracker projection data.
      * @returns {Array} returns an array of list of request tracker data.
     */

    static list( findQuery = "all", fields = "all" ) {
        return new Promise(async (resolve, reject) => {
            try {
                
                let queryObject = {};
                
                if (findQuery != "all") {
                    queryObject = findQuery;
                }
                
                let projectionObject = {};
                
                if (fields != "all") {
                    
                    fields.forEach(element => {
                        projectionObject[element] = 1;
                    });
                }

                let requestTrackerDocuments = 
                await database.models.requestTracker.find(
                    queryObject,
                    projectionObject
                ).lean();

                return resolve(requestTrackerDocuments);
                
                } catch (error) {
                    return reject(error);
                }
            });
        }

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

                return resolve(
                    requestTrackerCreation
                );

            } catch (error) {
                return reject(error);
            }
        })


    }

    /**
      * update request tracker document.
      * @method
      * @name update
      * @param {String} id - request tracker id.
      * @param {String} updateObj - request tracker updated data.
      * @returns {Promise} returns a promise.
     */

    static update(id,updateObj) {
        return new Promise(async (resolve, reject) => {
            try {
                
                let updateRequestTrackerData = 
                await database.models.requestTracker.findOneAndUpdate(
                    {
                        _id : id 
                    },{
                        $set : updateObj
                    },{
                        new : true
                    }
                );

                return resolve(updateRequestTrackerData);

            } catch (error) {
                return reject(error);
            }
        })


    }

    /**
      * List of pending requests data.
      * @method
      * @name pending
      * @returns {Array} returns a list of request tracker that are pending.
     */

    static pending() {
        return new Promise(async (resolve, reject) => {
            try {
                
                let updateRequestTrackerData = await this.list({
                    status : constants.common.PENDING
                },["metaInformation","userId"]
                );

                return resolve(updateRequestTrackerData);

            } catch (error) {
                return reject(error);
            }
        })


    }

}
