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
let samikshaService = require(ROOT_PATH+"/generics/services/samiksha");

module.exports = class PunjabMISHelper {

      /**
      * Update entity data.
      * @method
      * @name entity
      * @param {Object} requestedData - All requested data.
      * @returns {Promise} returns a promise.
     */

    static entity( requestedData , id = false ) {
        return new Promise(async (resolve, reject) => {
            try {

                let entityTrackerDocument;

                if( !id ) {
                    
                    entityTrackerDocument = 
                    await _createRequestData(requestedData);

                    id = entityTrackerDocument._id;
                }

                let entityUpdated = await samikshaService.updateEntity(
                    requestedData.body
                );

                if ( entityUpdated.status === httpStatusCode.ok.status ) {

                    entityTrackerDocument = 
                    await _updateRequestTrackerData(
                        id
                    );

                }

                return resolve({
                    message : constants.apiResponses.UPDATED_ENTITY,
                    result : {
                        entityUpdateStatus : 
                        entityTrackerDocument && entityTrackerDocument.status ? 
                        entityTrackerDocument.status : "",
                        entityUpdateRemarks : 
                        entityTrackerDocument && entityTrackerDocument.remarks ?
                        entityTrackerDocument.remarks : "",
                    }
                });

            } catch (error) {
                return reject(error);
            }
        })


    }

     /**
      * Update user data.
      * @method
      * @name user
      * @param {Object} requestedData - All requested data.
      * @returns {Promise} returns a promise.
     */

    static user( requestedData, userId = false, id = false ) {
        return new Promise(async (resolve, reject) => {
            try {

                let userTrackerDocument;

                if( !id ) {
                    
                    userTrackerDocument = 
                    await _createRequestData(requestedData);

                    id = userTrackerDocument._id;

                }

                let userUpdate = await samikshaService.userUpdate(
                    userId ? userId : requestedData.userDetails.userId,
                    requestedData.body
                );

                if ( userUpdate.status === httpStatusCode.ok.status ) {

                    userTrackerDocument = 
                    await _updateRequestTrackerData(
                        id
                    );

                }

                return resolve({
                    message : constants.apiResponses.UPDATED_USER,
                    result : {
                        userUpdateStatus : 
                        userTrackerDocument && userTrackerDocument.status ? 
                        userTrackerDocument.status : "",
                        entityUpdateRemarks : 
                        userTrackerDocument && userTrackerDocument.remarks ?
                        userTrackerDocument.remarks : "",
                    }
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
 * @name _createRequestData
 * @param {Object} data - Logged in user data.
 * @returns {Object} request tracker data.
*/

function _createRequestData(data) {
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

/**
 * Update request tracker data.
 * @method
 * @name _updateRequestTrackerData
 * @param {Object} id - Request tracker id.
 * @returns {Object} - updated request tracker data.
*/

function _updateRequestTrackerData( id ) {
    return new Promise(async (resolve,reject)=>{
        try {

            let updateObj = {
                status : constants.common.COMPLETED,
                remarks : constants.common.SUCCESS
            };

            let updateRequestTrackerData = 
            await requestTrackerHelper.update(
                id,
                updateObj
            );

            return resolve(updateRequestTrackerData);

        } catch(error){
            return reject(error);
        }
    })

}
