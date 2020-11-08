/**
 * name : request-tracker-update.js
 * author : Aman
 * Date : 24-03-2020
 * Description : Update entity
 */

// dependencies
const requestTrackerHelper = require(ROOT_PATH + "/module/request-tracker/helper");
const punjabMISHelper = require(ROOT_PATH + "/module/punjab-mis/helper");

/**
  * Cron job for pending request tracker. 
  * @function
  * @name pendingRequestTracker
  * @returns {Promise}
*/

let pendingRequestTracker = function () {
  scheduler.scheduleJob(process.env.SCHEDULE_FOR_PENDING_REQUEST_TRACKER, () => {

    log.info("<---- Pending request tracker cron started ---->", new Date());

    return new Promise(async (resolve, reject) => {
      try{
        
        let pendingRequests = await requestTrackerHelper.pending();

        if ( pendingRequests && pendingRequests.length > 0 ) {
          for( 
            let pendingRequest = 0 ; 
            pendingRequest < pendingRequests.length;
            pendingRequest ++
          ) {

            let url = pendingRequests[pendingRequest].metaInformation.url.split("/");

            let methodName = url[url.length -1];
            let metaInformation = pendingRequests[pendingRequest].metaInformation;
            let requestTrackerId = pendingRequests[pendingRequest]._id;

            /**
             * <- TODO: Dirty fix. 
             * Can be used inside punjabmis helper instead of using in scheduler. 
            */
           
            if( methodName === constants.common.ENTITY_UPDATE ) {

              await punjabMISHelper.entityUpdate(
                metaInformation,
                requestTrackerId
              );

            } else if( methodName === constants.common.USER_UPDATE ) {

              await punjabMISHelper.userUpdate(
                metaInformation,
                pendingRequests[pendingRequest].userId,
                requestTrackerId
              );

            }
            
          }
        }
  
        log.info("<--- Pending request tracker cron stopped ---->", new Date());
        resolve();
      } catch(error){
        return reject(error);
      }

    })

  });
}

module.exports = pendingRequestTracker;