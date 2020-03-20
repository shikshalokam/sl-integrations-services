/**
 * name : punjab-mis.js
 * author : Aman
 * created-date : 20-03-2020
 * Description : All punjab mis functionality. 
 */

 // Dependencies
 let punjabMISHelper = require(MODULES_BASE_PATH+"/punjab-mis/helper");

  /**
     * PunjabMIS
     * @class
 */
 module.exports = class PunjabMIS extends Abstract {
   constructor() {
     super(schemas["request-tracker"])
   }
 
   static get name() {
     return "punjabMis";
   }

   /**
     * @api {post} /integration-service/api/v1/punjab-mis/entityUpdate 
     * Update entity data
     * @apiVersion 1.0.0
     * @apiGroup Punjab-MIS
     * @apiSampleRequest /integration-service/api/v1/punjab-mis/entityUpdate    
     * @apiUse successBody
     * @apiUse errorBody
     * @apiParamExample {json} Request:
     * {
     * "entityId" : "",
     * "metaInformation" : {
     * "name" : ""
     * }
     * }
     * @apiParamExample {json} Response :
     * {
     * "message": "Updated entity data",
     * "status": 200,
     * "result": {
     * "method": "",
     * "headers": {
     * "appname": ""
     * },
     * "url": "",
     * "body": {
     * "entityId": "",
     * "metaInformation": {
     * "name": ""
     * }
     * }
     * }
     * }
     */

    /**
      * Update entity.
      * @method
      * @name entityUpdate
      * @param  {Request} req request body.
      * @returns {JSON} Response consists of message and status code.
    */

   async entityUpdate(req) {
    return new Promise(async (resolve, reject) => {

        try {

          let entityUpdateDocument = await punjabMISHelper.entityUpdate(
            req
          );

          return resolve(entityUpdateDocument);

        } catch (error) {
          reject({
            status: 
            error.status || 
            httpStatusCode["internal_server_error"].status,
            
            message: 
            error.message || 
            httpStatusCode["internal_server_error"].message
          })
        }
      })
   }

   /**
     * @api {post} /integration-service/api/v1/punjab-mis/userUpdate 
     * Update user data
     * @apiVersion 1.0.0
     * @apiGroup Punjab-MIS
     * @apiSampleRequest /integration-service/api/v1/punjab-mis/userUpdate    
     * @apiUse successBody
     * @apiUse errorBody
     * @apiParamExample {json} Request:
     * {
     * "roles":{
     * "code":""
     * }
     * }
     * @apiParamExample {json} Response :
     * {
     * "message": "Updated entity data",
     * "status": 200,
     * "result": {
     * "method": "",
     * "headers": {
     * "appname": ""
     * },
     * "url": "",
     * "body": {
     * "roles": {
     * "code": ""
     * }
     * }
     * }
     * }
     */

    /**
      * User update 
      * @method
      * @name userUpdate
      * @param  {Request} req request body.
      * @returns {JSON} Response consists of message and status code.
    */

   async userUpdate(req) {
    return new Promise(async (resolve, reject) => {

        try {

          let userUpdateDocument = await punjabMISHelper.userUpdate(
            req
          );

          return resolve(userUpdateDocument);

        } catch (error) {
          reject({
            status: 
            error.status || 
            httpStatusCode["internal_server_error"].status,
            
            message: 
            error.message || 
            httpStatusCode["internal_server_error"].message
          })
        }
      })
   }


 };
 