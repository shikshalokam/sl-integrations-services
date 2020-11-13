/**
 * name : request-tracker.js
 * author : Deepa
 * created-date : 12-11-2020
 * Description : All request-tracker functionality. 
 */

 // Dependencies
 const requestTrackerHelper = require(MODULES_BASE_PATH + "/request-tracker/helper");

  /**
     * RequestTracker
     * @class
 */
 module.exports = class RequestTracker extends Abstract {
   
    
  constructor() {
    super(schemas["request-tracker"]);
  }

   static get name() {
     return "requestTracker";
   }

     /**
     * @api {get} /integrations/api/v1/request-tracker/status/{{id}}
     * Get status of request
     * @apiVersion 1.0.0
     * @apiGroup Request-Tracker
     * @apiSampleRequest /integrations/api/v1/punjab-mis/request-tracker/status/5bfe53ea1d0c350d61b78d0a
     * @apiParamExample {json} Response :
     * {
     *   "message": "Status fetched successfully",
     *   "status": 200,
     *   "result": {
     *        "status": "completed"
     *   }
     * }
     * @apiUse successBody
     * @apiUse errorBody
     */

    /**
      * Get status of request.
      * @method
      * @name status
      * @param  {Request} id -  request tracker id
      * @returns {JSON} Response consists of message and status.
    */

   async status(req) {
    return new Promise(async (resolve, reject) => {

      try {
        
        let result = await requestTrackerHelper.status
        ( 
          req.params._id
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

}