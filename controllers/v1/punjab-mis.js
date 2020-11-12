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
    super(schemas["request-tracker"]);
  }
 
   static get name() {
     return "punjabMis";
   }

    /**
     * @apiDefine errorBody
     * @apiError {String} status 4XX,5XX
     * @apiError {String} message Error
     */

    /**
     * @apiDefine successBody
     *  @apiSuccess {String} status 200
     * @apiSuccess {String} result Data
     */


     /**
     * @api {post} /integrations/api/v1/punjab-mis/createEntity?entityType=:entityType
     * Create entity  
     * @apiVersion 1.0.0
     * @apiGroup Punjab-MIS
     * @apiSampleRequest /integrations/api/v1/punjab-mis/createEntity?entityType=school
     * @apiParamExample {json}  Request-Body:
     * {
     * "School_Code": "",
     * "School_Name": "",
     * "UDISE_Code": "",
     * "District_Code": "",
     * "Tehsil_Code": "",
     * "Edu_Block_Code": "",
     * "Cluster_Code": "",
     * "Village_Code": "",
     * "Pin_Code": "",	            
     * "Office_PhoneNo": "",
     * "School_Email": "",
     * "SchoolType_Code": "",
     * "SchoolCategory_Code": "",
     * "School_Status": "",
     * "SchoolManagement_Code": "",
     * "Lowest_Class_Range": "",
     * "Highest_Class_Range": "",
     * "Instrn_Medium": "",
     * "Area_Type": "",
     * "Longitude": "",
     * "Latitude": "",
     * "IsSchool_Sft": "",
     * "School_Status_Int": "",
     * "Area": "",
     * "IsVocational_School": "",
     * "MDM_SchoolCategory_Code": "",
     * "MDM_VILLAGE_CODE": "",
     * "MDM_Source": "",
     * }
     * @apiParamExample {json} Response :
     * {
     *   "message": "",
     *   "status": 200,
     *   "result": {
     *       "id": "5bfe53ea1d0c350d61b78d0a"
     *   }
     * }
     * @apiUse successBody
     * @apiUse errorBody
     */

    /**
      * Create entity.
      * @method
      * @name createEntity
      * @param  {Request} req request body.
      * @returns {JSON} Response consists of message and status code.
    */

   async createEntity(req) {
    return new Promise(async (resolve, reject) => {

      try {
        
        let entityCreateDocument = await punjabMISHelper.createEntity
        ( 
          req
        );

        return resolve({
            message: entityCreateDocument.message,
            result: entityCreateDocument.data
        });

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
     * @api {post} /integrations/api/v1/punjab-mis/updateEntity/{{entityId}}
     * Update entity data
     * @apiVersion 1.0.0
     * @apiGroup Punjab-MIS
     * @apiSampleRequest /integrations/api/v1/punjab-mis/updateEntity/345675   
     * @apiParamExample {json}  Request-Body:
     * {
     *   "School_Code": "",
     *   "School_Name" : "",
     *   "UDISE_Code": "",
     *   "District_Code": "",
     *   "Tehsil_Code": "",
     *   "Edu_Block_Code": "",
     *   "Cluster_Code": "",
     *   "Village_Code": "",
     *   "Pin_Code": "",	            
     *   "Office_PhoneNo": "",
     *   "School_Email": "",
     *   "SchoolType_Code": "",
     *   "SchoolCategory_Code": "",
     *   "School_Status": "",
     *   "SchoolManagement_Code": "",
     *   "Lowest_Class_Range": "",
     *   "Highest_Class_Range": "",
     *   "Instrn_Medium": "",
     *   "Area_Type": "",
     *   "Longitude": "",
     *   "Latitude": "",
     *   "IsSchool_Sft": "",
     *   "School_Status_Int": "",
     *   "Area": "",
     *   "IsVocational_School": "",
     *   "MDM_SchoolCategory_Code": "",
     *   "MDM_VILLAGE_CODE": "",
     *   "MDM_Source": ""
     * }
     * @apiParamExample {json} Response :
     * {
     *   "message": "",
     *   "status": 200,
     *   "result": {
     *       "id": "5bfe53ea1d0c350d61b78d0a"
     *   }
     * }
     * @apiUse successBody
     * @apiUse errorBody
     */

    /**
      * Update entity.
      * @method
      * @name updateEntity
      * @param  {Request} req request body.
      * @returns {JSON} Response consists of message and status code.
    */

   async updateEntity(req) {
    return new Promise(async (resolve, reject) => {

        try {

          let entityUpdateDocument = await punjabMISHelper.updateEntity
          (
            req 
          );

          return resolve({
            message: entityUpdateDocument.message
          });

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
     * @api {post} /integrations/api/v1/punjab-mis/createUser 
     * Create user 
     * @apiVersion 1.0.0
     * @apiGroup Punjab-MIS
     * @apiSampleRequest /integrations/api/v1/punjab-mis/createUser    
     * @apiParamExample {json}  Request-Body:
     * {
     * "FacultyInfo_Code": "",
     * "School_Code": "",
     * "Faculty_Name": "",
     * "Email_Id": "",
     * "Mobile_No": "",
     * "School_Code_Current": ""    
     * }
     * @apiParamExample {json} Response :
     * {
     * "message": "Created the user successfully",
     * "status": 200,
     * "result": {
     *    "id": "5bfe53ea1d0c350d61b78d0a"
     * }
     * }
     * @apiUse successBody
     * @apiUse errorBody
     */

    /**
      * Create user
      * @method
      * @name createUser
      * @param  {Request} req request body.
      * @returns {JSON} Response consists of message and status code.
    */

  async createUser(req) {
    return new Promise(async (resolve, reject) => {

        try {

          let userDocument = await punjabMISHelper.createUser
          (
            req 
          );

          return resolve({
             message: userDocument.message
          });

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
     * @api {post} /integrations/api/v1/punjab-mis/updateUser/{{userId}}
     * Update user data
     * @apiVersion 1.0.0
     * @apiGroup Punjab-MIS
     * @apiSampleRequest /integrations/api/v1/punjab-mis/updateUser    
     * @apiParamExample {json}  Request-Body:
     * {
     * "FacultyInfo_Code": "",
     * "School_Code": "",
     * "Faculty_Name": "",
     * "Email_Id": "",
     * "Mobile_No": "",
     * "School_Code_Current": ""    
     * }
     * @apiParamExample {json} Response :
     * {
     * "message": "",
     * "status": 200,
     * "result": {
     *    "id": "5bfe53ea1d0c350d61b78d0a"
     * }
     * }
     * @apiUse successBody
     * @apiUse errorBody
     */

    /**
      * User update 
      * @method
      * @name updateUser
      * @param  {Request} req request body.
      * @returns {JSON} Response consists of message and status code.
    */

   async updateUser(req) {
    return new Promise(async (resolve, reject) => {

        try {

          let userUpdateDocument = await punjabMISHelper.updateUser
          (
            req 
          );

          return resolve({
            message: userUpdateDocument.message
          });

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
     * @api {post} /integrations/api/v1/punjab-mis/getObservationStatus
     * Get observation status  
     * @apiVersion 1.0.0
     * @apiGroup Punjab-MIS
     * @apiSampleRequest /integrations/api/v1/punjab-mis/getObservationStatus 
     * @apiParamExample {json}  Request-Body:
     * {
     * "solutionExternalId": "",
     * "staffId": "",
     * "entityId": "", 
     * }   
     * @apiParamExample {json} Response :
     * {
     * "message": "Observation status fetched for the given entity",
     * "status": 200,
     * "result": {
     *     "status" : "completed",
     *     "createdAt": "2020-09-23T09:04:06.316Z"
     * }
     * }
     * @apiUse successBody
     * @apiUse errorBody
     */

    /**
      * Get observation status  
      * @method
      * @name getObservationStatus
      * @param  {Request} req request body.
      * @returns {JSON} Response consists of message and status.
    */

   async getObservationStatus(req) {
    return new Promise(async (resolve, reject) => {

        try {

          let result = await punjabMISHelper.getObservationStatus
          ( 
            req 
          );

          return resolve({
              message: result.message,
              result: result.data
          });

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
 