/**
 * name : index.js
 * author : Aman
 * Date : 24-03-2020
 * Description : Node scheduler root file.
 */

// Make scheduler global
global.scheduler = require("node-schedule");

require("./pending-request-tracker")();





