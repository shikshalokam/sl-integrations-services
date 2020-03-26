/**
 * name : request-tracker.js
 * author : Aman
 * Date : 20-03-2020
 * Description : Schema for request tracker collection.
 */

module.exports = {
    name: "requestTracker",
    schema: {
        userId : String,
        metaInformation : Object,
        status : {
            type : String,
            default : "pending"
        },
        remarks : {
            type : String,
            default : ""
        }
    }
  };