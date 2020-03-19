/**
 * name : sessions.js
 * author : Aman
 * created-date : 04-03-2020
 * Description : Session set , get and remove functionality.
 */

 /**
  * Get app version.
  * @method
  * @name get - Get specific session data
  * @params sessionPath - Path of the session.
  * @returns {Object} - return specific session data.
*/

function get(sessionPath){
    return global.sessions[sessionPath]
}

 /**
  * Set new session data
  * @method
  * @name set
  * @params sessionPath - Path of the session.
  * @params data - session data to set.  
  * @returns {Object} - session updated data.
*/

function set(sessionPath,data) {
    return global.sessions[sessionPath] = data;
}

/**
  * delete session data
  * @method
  * @name remove
  * @params sessionPath - Path of the session. 
  * @returns 
*/

function remove(sessionPath) {
    delete global.sessions[sessionPath];
    return;
}

module.exports = {
    get : get,
    set : set,
    remove : remove
}