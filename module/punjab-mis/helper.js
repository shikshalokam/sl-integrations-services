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

const requestTrackerHelper = require(MODULES_BASE_PATH + "/request-tracker/helper");
const samikshaService = require(ROOT_PATH + "/generics/services/samiksha");
const kendraService = require(ROOT_PATH  + "/generics/services/kendra");
const userManagementService = require(ROOT_PATH + "/generics/services/user-management");


module.exports = class PunjabMISHelper {

    /**
      * Update entity data.
      * @method
      * @name entity
      * @param {Object} requestedData - All requested data.
      * @returns {Promise} returns a promise.
    */

    static updateEntity( requestedData , id = false ) {
        return new Promise(async (resolve, reject) => {
            try {
                
                let entityTrackerDocument;

                if( !id ) {
                    entityTrackerDocument = 
                    await _createRequestData(requestedData);

                    id = entityTrackerDocument._id;
                }
                
                requestedData.body.metaInformation = await gen.utils.convertToCamelCase(requestedData.body.metaInformation);
                
                let entityUpdat = await samikshaService.updateEntity(
                    requestedData.body
                );

                if ( entityUpdat.status === httpStatusCode.ok.status ) {

                    entityTrackerDocument = 
                    await _updateRequestTrackerData(
                        id
                    );

                }

                return resolve({
                    success: true,
                    message : constants.apiResponses.UPDATED_ENTITY,
                    data : {
                        entityUpdateStatus : 
                        entityTrackerDocument && entityTrackerDocument.status ? 
                        entityTrackerDocument.status : "",
                        entityUpdateRemarks : 
                        entityTrackerDocument && entityTrackerDocument.remarks ?
                        entityTrackerDocument.remarks : "",
                    }
                });

            } catch (error) {
                return resolve({
                    success: false,
                    message: error.message,
                    data: false
                })
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

    static updateUser( requestedData, userId = false, id = false ) {
        return new Promise(async (resolve, reject) => {
            try {

                let userTrackerDocument;

                if( !id ) {
                    
                    userTrackerDocument = 
                    await _createRequestData(requestedData);

                    id = userTrackerDocument._id;

                }
                
                requestedData.body = await gen.utils.convertToCamelCase(requestedData.body);

                let userUpdate = await kendraService.updateUser(
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
                    success: true,
                    message : constants.apiResponses.UPDATED_USER,
                    data : {
                        userUpdateStatus : 
                        userTrackerDocument && userTrackerDocument.status ? 
                        userTrackerDocument.status : "",
                        entityUpdateRemarks : 
                        userTrackerDocument && userTrackerDocument.remarks ?
                        userTrackerDocument.remarks : "",
                    }
                });

            } catch (error) {
                return resolve({
                    success: false,
                    message: error.message,
                    data: false
                });
            }
        })
    }


    /**
      * Create entity.
      * @method
      * @name createEntity
      * @param {Object} requestedData - All requested data.
      * @returns {Promise} returns a promise.
     */

     static createEntity( requestedData, id = false ) {
        return new Promise(async (resolve, reject) => {
            try {

                let entityTrackerDocument;

                if( !id ) {
                    entityTrackerDocument = 
                    await _createRequestData(requestedData);

                    id = entityTrackerDocument._id;
                }
                
                requestedData.body = await gen.utils.convertToCamelCase(requestedData.body);

                console.log(requestedData.body);
                
                let entityCreate = await samikshaService.createEntity(
                    requestedData.body
                );

                if ( entityCreate.status === httpStatusCode.ok.status ) {

                    entityTrackerDocument = 
                    await _updateRequestTrackerData(
                        id
                    );
                }

                return resolve({
                    success: true,
                    message : constants.apiResponses.CREATED_ENTITY,
                    data : entityCreate
                });

            } catch (error) {
                return resolve({
                    success: false,
                    message: error.message,
                    data: false
                });
            }
        })
    }


    /**
      * Create user.
      * @method
      * @name createUser
      * @param {Object} requestedData - All requested data.
      * @returns {Promise} returns a promise.
    */

    static createUser( requestedData, id = false ) {
        return new Promise(async (resolve, reject) => {
            try {

                let userTrackerDocument;

                if( !id ) {
                    
                    userTrackerDocument = 
                    await _createRequestData(requestedData);

                    id = userTrackerDocument._id;

                }

                let userCreate = await userManagementService.createUser(
                    requestedData.body
                );

                if ( userCreate.status === httpStatusCode.ok.status ) {

                    userTrackerDocument = 
                    await _updateRequestTrackerData(
                        id
                    );

                }

                return resolve({
                    success: true,
                    message : constants.apiResponses.CREATED_USER,
                    data : {
                        userUpdateStatus : 
                        userTrackerDocument && userTrackerDocument.status ? 
                        userTrackerDocument.status : "",
                        entityUpdateRemarks : 
                        userTrackerDocument && userTrackerDocument.remarks ?
                        userTrackerDocument.remarks : "",
                    }
                });

            } catch (error) {
                return resolve({
                    success: false,
                    message: error.message,
                    data: false
                });
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
