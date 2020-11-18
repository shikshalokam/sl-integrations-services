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
const sunbirdService = require(ROOT_PATH  + "/generics/services/sunbird");


module.exports = class PunjabMISHelper {

    /**
      * Update entity data.
      * @method
      * @name updateEntity
      * @param {Object} requestedData - All requested data.
      * @returns {Promise} returns a request tracker id.
    */

    static updateEntity( requestedData , id = "" ) {
        return new Promise(async (resolve, reject) => {
            try {
                
                let entityTrackerDocument;

                if( id == "") {
                    entityTrackerDocument = 
                    await _createRequestData(requestedData);

                    id = entityTrackerDocument._id;
                }

                resolve({
                    success: true,
                    data: {
                        id: id
                    }
                })
                
                let entityData = await _entityKeyMapping(requestedData.body);

                if (!entityData.externalId) {
                    entityData.externalId =  requestedData.params._id;
                }

                entityData = await gen.utils.convertToCamelCase
                ( 
                    entityData
                );
                
                let entityUpdate = await samikshaService.updateEntity(
                    requestedData.params._id,
                    entityData
                );

                if ( entityUpdate.status === httpStatusCode.ok.status && entityUpdate.result) {
                    await _updateRequestTrackerData(
                        id
                    );
                }

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
      * @returns {Promise} returns a request tracker id.
     */

    static updateUser( requestedData, id = "" ) {
        return new Promise(async (resolve, reject) => {
            try {

                let userTrackerDocument;

                if (id == "") {
                    userTrackerDocument = 
                    await _createRequestData(requestedData);

                    id = userTrackerDocument._id;
                }

                resolve({
                    success: true,
                    data: {
                        id: id
                    }
                })

                let getKeycloakAccessToken = await sunbirdService.getKeycloakToken
                (
                    process.env.PUNJAB_SERVICE_DEFAULT_USERNAME,
                    process.env.PUNJAB_SERVICE_DEFAULT_PASSWORD
                );

                if (getKeycloakAccessToken.status == httpStatusCode.ok.status) {

                    let getUserIdByFacultyId = await sunbirdService.searchUser
                    (
                        getKeycloakAccessToken.result.access_token,
                        requestedData.params._id
                    )

                    if (getUserIdByFacultyId.status == httpStatusCode.ok.status &&
                        getUserIdByFacultyId.result &&
                        getUserIdByFacultyId.result.content.length > 0) {

                        let userId = getUserIdByFacultyId.result.content[0].id;

                        let userData = await _userKeyMapping(requestedData.body);

                        let userUpdate = await kendraService.updateUser(
                            userId,
                            userData
                        );

                        if (userUpdate.status === httpStatusCode.ok.status) {
                            await _updateRequestTrackerData
                            (
                                id
                            );
                        }
                    }
                }
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
      * @returns {Promise} returns a request tracker id.
     */

     static createEntity( requestedData, id = "" ) {
        return new Promise(async (resolve, reject) => {
            try {

                let entityTrackerDocument;

                if(id == "" ) {
                    entityTrackerDocument = 
                    await _createRequestData(requestedData);

                    id = entityTrackerDocument._id;
                }

                resolve({
                    success: true,
                    data: {
                        id: id
                    }
                })
              
                let entityData = await _entityKeyMapping(requestedData.body);

                entityData = await gen.utils.convertToCamelCase
                ( 
                    entityData
                );
               
                let entityCreate = await samikshaService.createEntity(
                    requestedData.query.entityType,
                    entityData
                );

                if ( entityCreate.status === httpStatusCode.ok.status && entityCreate.result ) {
                    await _updateRequestTrackerData(
                        id
                    );
                }

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
      * @returns {Promise} returns a request tracker id.
    */

    static createUser( requestedData, id = "" ) {
        return new Promise(async (resolve, reject) => {
            try {

                let userTrackerDocument;

                if(id == "") {
                    
                    userTrackerDocument = 
                    await _createRequestData(requestedData);

                    id = userTrackerDocument._id;
                }

                resolve({
                    success: true,
                    data: {
                        id: id
                    }
                })

                let getKeycloakAccessToken = await sunbirdService.getKeycloakToken
                (
                    process.env.PUNJAB_SERVICE_DEFAULT_USERNAME,
                    process.env.PUNJAB_SERVICE_DEFAULT_PASSWORD
                );

                if(getKeycloakAccessToken.status == httpStatusCode.ok.status ) {

                    let userData = await _userKeyMapping(requestedData.body);
                    userData.lastName = "",
                    userData.organisation = {
                            label: process.env.DEFAULT_ORGRANISATION_NAME,
                            value: process.env.SUNBIRD_ORGANISATION_ID
                    };
                    userData.roles = {
                            label: "",
                            value: ""
                    };
                    userData.password = process.env.PUNJAB_SERVICE_DEFAULT_PASSWORD;
                    
                    let userCreate = await userManagementService.createUser(
                        getKeycloakAccessToken.result.access_token,
                        userData
                    );
    
                    if ( userCreate.status === httpStatusCode.ok.status && userCreate.result ) {
                        await _updateRequestTrackerData(
                            id
                        );
                    }    
                }

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
      * Get observation status.
      * @method
      * @name getObservationStatus
      * @param {Object} requestedData - All requested data.
      * @returns {Promise} returns a message and status.
    */

    static getObservationStatus(requestedData) {
        return new Promise(async (resolve, reject) => {
            try {

                let userId;

                let getKeycloakAccessToken = await sunbirdService.getKeycloakToken
                (
                    process.env.PUNJAB_SERVICE_DEFAULT_USERNAME,
                    process.env.PUNJAB_SERVICE_DEFAULT_PASSWORD
                );

                if(getKeycloakAccessToken.status !== httpStatusCode.ok.status) {
                   throw new Error(constants.apiResponses.INTERNAL_ERROR)
                }

                let getUserIdByStaffId = await sunbirdService.searchUser
                   (
                      getKeycloakAccessToken.result.access_token,
                      requestedData.body.staffId
                   )

                   if (getUserIdByStaffId.status ==  httpStatusCode.ok.status && 
                       getUserIdByStaffId.result &&
                       getUserIdByStaffId.result.content.length > 0) {
                      
                        userId = getUserIdByStaffId.result.content[0].id;
                }

                if (userId !== "") {

                    let getObservationStatus = await samikshaService.getObservationStatus
                    (
                        userId,
                        requestedData.body.solutionExternalId,
                        requestedData.body.entityId
                    )

                    return resolve(getObservationStatus);
                }
                else {
                   throw new Error(constants.apiResponses.USER_NOT_FOUND)
                }

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


/**
 * Punjab-mis to samiksha entity key mapping
 * @method
 * @name _entityKeyMapping
 * @param {Object} inputObject - input data.
 * @returns {Object} - Mapped object keys.
*/

function _entityKeyMapping( inputObject ) {
    return new Promise(async (resolve,reject)=>{
        try {
           
            if (inputObject.UDISE_Code) {
                inputObject.externalId = inputObject.UDISE_Code;
                delete inputObject.UDISE_Code;
            }
            
            return resolve(inputObject);
         
        } catch(error){
            return reject(error);
        }
    })
}


/**
 * Punjab-mis to samiksha user data key mapping
 * @method
 * @name _userKeyMapping
 * @param {Object} inputObject - input data.
 * @returns {Object} - Mapped object keys.
*/

function _userKeyMapping(inputObject) {
    return new Promise(async (resolve, reject) => {
        try {

            let userKeyMapping = {
                Faculty_Name: "firstName",
                FacultyInfo_Code: "userName",
                Email_Id: "email",
                Mobile_No: "phoneNumber",
                School_Code: "schoolCode",
                School_Code_Current: "schoolCodeCurrent"
            }
            
            let userData = {};

            Object.keys(inputObject).forEach( key => {
                 userData[userKeyMapping[key]] = inputObject[key];
            })          

            return resolve(userData);

        } catch (error) {
            return reject(error);
        }
    })
}